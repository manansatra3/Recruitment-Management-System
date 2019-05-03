const mongoCollections = require("./collection");
const ObjectId = require("mongodb").ObjectID;
const applicantInfo = mongoCollections.applicantInfo;
const signupData = require("./users");

module.exports = {
    /**
     *update the applicant applicantInfo when they sign up
     *
     */
    async applicantapplicantInfo(id, name, email, phoneNumber, education, work){
        const info = await aapplicantInfo();
        //objId should be coming from the signup database where that Id is stored
        const objId = ObjectId(id);
        let updatedInfo = {
            id: objId,
            name,
            email,
            phoneNumber,
            education,
            work,
        }
        const insert = await info.insertOne(updatedInfo);
        
        if(insert.insertedCount === 0){
            throw "Could not add title";
        }

        return await this.get(insert.insertedId);
    },
    async getApplicantById(id){
        if(!id){
            throw "Error: no id was provided";
        }
        const info = await applicantInfo();
        const applicant = info.findOne({_id: id});
        if(!applicant){
            throw `Error: no Applicant was found with this id: ${id}`
        }
        return applicant;
    },
    async updateApplicantInfo(id, updatedInfo){
        const info = await applicantInfo();
        const updated = {};
        if(updatedInfo.name){
            updated.name = updatedInfo.name;
        }
        if(updatedInfo.email){
            updated.email = updatedInfo.email;
        }
        if(updatedInfo.phoneNumber){
            updated.phoneNumber = updatedInfo.phoneNumber;
        }
        if(updatedInfo.education){
            updated.education = updatedInfo.education;
        }
        if(updatedInfo.work){
            updated.work = updatedInfo.work;
        }
        let updatedCommand = {
            $set: updated
        };
        const query = {
            _id: id
        };
        await info.updateOne(query, updatedCommand);
        return await this.getApplicantById(id);
    },
    async getAllUsers(){
        const info = await applicantInfo();
        return info.find({}).toArray();
    },

    async removeApplicant(id){
        if(!id){
            throw "Error: no id was provided";
        }
        const info = await applicantInfo();
        return await info.deleteOne({_id: id});
    }

}