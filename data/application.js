const mongoCollections = require("./collection");
const application= mongoCollections.application;
const { ObjectId } = require('mongodb');

module.exports ={
    
    async createApplication(userId,jobId,jobName,fullName, docs, extraContent)
    {
        // console.log("hi")
        // console.log(userId)
        //console.log(jobId)
        if(!userId){
            throw "Error: no user id was provided";
        }
        if(!jobId){
            throw "Error: no job id was provided";
        }
        if(!jobName){
            throw "Error: no job name was provided";
        }
        if(!fullName){
            throw "Error: no full name was provided"
        }

        var applicationTime = new Date().toUTCString();
        var applicationStatus = "Pending"
        const newApplication = await application();
        let applicationObject = {
            userId,
            jobId,
            applicationTime,
            jobName,
            applicationStatus,
            fullName,
            docs,
            extraContent


        };
        const insert = await newApplication.insertOne(applicationObject);
        if(insert.insertedCount === 0){
            throw "Could not add person";
        }
        const newId = insert.insertedId;
        return newId;

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


        //change the findOne function to find.toArray, because we need all the application
        const findApplication = await newApplication.find({userId: targetUserId}).toArray();
        // if(findPerson === null){
        //     throw "No person with that id";
        // }
        return findApplication;
    },

    async getAll(){
        const allApplication = await newApplication.find({}).toArray();
        return allApplication;
    },


    //I have not tested this function; 
    async setApplicationStatus(applicationID, newStatus){

        const newApplication = await application();
        var targetObjectID = ObjectId.createFromHexString(applicationID);
        const updateResult = await newApplication.updateOne({_id: targetObjectID }, {$set: {applicationStatus:newStatus}});

        // if (updateResult.modifiedCount === 0) {
        //     let errorMessage = `Error: update application: (${targetObjectID}) with new status (${newStatus}) fail!`;
        //     throw errorMessage;
        // }

        const result = await newApplication.findOne({_id: targetObjectID});
        // if (result === null) {
        //     let errorMessage = `Error: there is not application with ID ${targetObjectID} in the collection, when we try to find updated information!`;
        //     throw errorMessage;
        // }

        return result;
    },
    
    async getApplicationByID(applicationID){

        if(!applicationID){
            throw "Error: no id was provided";
        }
        const newApplication = await application();


        // //From here, I will convert the incoming string ID to the object; discard
        // var targetUserId = ObjectId.createFromHexString(id);

        var targetObjectID = ObjectId.createFromHexString(applicationID);
        //change the findOne function to find.toArray, because we need all the application
        const findApplication = await newApplication.findOne({_id: targetObjectID})
        // if(findPerson === null){
        //     throw "No person with that id";
        // }
        return findApplication;

    },
    async allApplications(){
        const apply = await application();
        return await apply.find({}).toArray();
    },

    async getApplicationByJobId(jobId)
    {
        if(!jobId){
            throw "Error: no id was provided";
        }
        const newApplication = await application();
        var targetJobId = jobId.toString()
        //change the findOne function to find.toArray, because we need all the application
        var numberOfUniqueJobs = await newApplication.find({jobId: targetJobId}).toArray();
        //console.log(numberOfUniqueJobs)

        // if(findPerson === null){
        //     throw "No person with that id";
        // }
        return numberOfUniqueJobs;

    },

    async getFullName(jobId)
    {
        if(!jobId){
            throw "Error: no id was provided";
        }
        const newApplication = await application();
        var targetJobId = jobId.toString()
        //change the findOne function to find.toArray, because we need all the application
        var targetApplication = await newApplication.find({jobId: targetJobId}).toArray();

    
        //console.log(numberOfUniqueJobs)

        // if(findPerson === null){
        //     throw "No person with that id";
        // }
        return targetApplication;

    },
    // async groupJobIdWithUserCount(){
    //     console.log("inside function")
    //     const newApplication = await application()
    //     const result = await newApplication.aggregate([
    //         {"$group" : {_id:"$jobName", count:{$sum:1}}}
    //     ])
    //     console.log("inside function 2")
    //     console.log(result)
    //     return result
    // }

    async changeStatus(status, userId){
        const newApplication = await application();
        const updated = await newApplication.updateOne({
            userId     
        }, {$set: {
            applicationStatus: status
        }});
        return updated;
    },

    // async  setApplicationStatus(applicationId, status){


    //     const applicationData = await application();
    //     const updateResult = await applicationData.updateOne({_id: id }, {$set: {animalType:newType}});

    //     if (updateResult.modifiedCount === 0) {
    //         let errorMessage = `Error: update id(${id}) with new animalType (${newType}) fail!`;
    //         throw errorMessage;
    //     }

    //     const result = await animalsCollection.findOne({_id: id});
    //     if (result === null) {
    //         let errorMessage = `Error: there is not animal with ID ${id} in the collection, when we try to find updated information!`;
    //         throw errorMessage;
    //     }

    //     return result;

    // }

    async getDocsByID(applicationID){
        var targetId = ObjectId.createFromHexString(applicationID);
        const applicationCollection = await application();
        const applicationResult = await applicationCollection.findOne({_id: targetId});
        var docsResult = applicationResult.docs;
        return docsResult;
    },   

    async getextraContentByID(applicationID){
        var targetId = ObjectId.createFromHexString(applicationID);
        const applicationCollection = await application();
        const applicationResult = await applicationCollection.findOne({_id: targetId});
        var extraContentResult = applicationResult.extraContent;
        return extraContentResult;
    }  

}