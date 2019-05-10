const mongoCollections = require("./collection");
const application= mongoCollections.application;
const { ObjectId } = require('mongodb');

module.exports ={
    
    async createApplication(userId,jobId)
    {
        console.log("hi")
        console.log(userId)
        //console.log(jobId)
        if(!userId){
            throw "Error: no user id was provided";
        }
        if(!jobId){
            throw "Error: no job id was provided";
        }
        const newApplication = await application();
        let applicationObject = {
            userId,
            jobId

        };
        const insert = await newApplication.insertOne(applicationObject);
        if(insert.insertedCount === 0){
            throw "Could not add person";
        }
        const newId = insert.insertedId;
        return await this.get(newId);

    },
    async get(targetUserId){
        //given id, return the animal from the database
        //come, this is not animal. ok?
        if(!targetUserId){
            throw "Error: no id was provided";
        }
        const newApplication = await application();


        // //From here, I will convert the incoming string ID to the object; discard
        // var targetUserId = ObjectId.createFromHexString(id);



        const findApplication = await newApplication.find({userId: targetUserId}).toArray();
        // if(findPerson === null){
        //     throw "No person with that id";
        // }
        return findApplication;
    }

}