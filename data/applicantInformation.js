const mongoCollections = require("./collection");
const ObjectId = require("mongodb").ObjectID;
const information = mongoCollections.information;
const signupData = require("./signup");

module.exports = {
    /**
     *update the applicant information when they sign up
     *
     */
    async updateApplicant(name, email, phoneNumber, education, work, documents, comments){
        const info = await information();
        //objId should be coming from the signup database where that Id is stored
        const objId = ObjectId(email);

        let updatedInfo = {
            id: objId,
            name : {
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1].trim()
            },
            email,
            phoneNumber,
            education : {
                currentEducation: {
                    universityName,
                    gpa,
                    degreee,
                    major,
                    graduationYear
                },
                previousEducation: {
                    universityName,
                    gpa,
                    degreee,
                    major,
                    graduationYear
                }
            },
            work: {
                currentWork: {
                    employerName,
                    employerCity,
                    currentPosition
                },
                previousWork: {
                    employerName,
                    employerCity,
                    currentPosition
                }
            },
            documents : {
                resume,
                transcript,
                coverLetter,
                extraUpload
            },
            comments
        }
        const insert = await info.insertOne(updatedInfo);
        
        if(insert.insertedCount === 0){
            throw "Could not add title";
        }
        
        return await this.get(insert.insertedId);
    }

}