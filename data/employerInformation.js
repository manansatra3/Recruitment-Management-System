const mongoCollections = require("./collection");
const employerInfo = mongoCollections.employerInfo;

module.exports = {
    async createEmployerInfo(name, department, designation, jobsPosted){
        const info = await employerInfo();

        let EmployerI = {
            id,
            name,
            department,
            designation,
            jobsPosted: []
        }

        const insert = await info.insertOne(EmployerI);
        if(insert.insertedCount === 0){
            throw "Could not add employer";
        }

        return await this.get(insert.insertedId);
    },

    async getAllEmployers(){
        const info = await employerInfo();
        return info.find({}).toArray();
    },

    async getEmployerById(id){
        if(!id){
            throw "Error: no id was provided";
        }
        const info = await employerInfo();
        const employer = info.findOne({_id: id});
        if(!employer){
            throw `Error: no Applicant was found with this id: ${id}`
        }
        return employer;
    },

    async updateEmployer(id, updatedInfo){
        const info = await employerInfo();
        const updated = {};
        if(updatedInfo.name){
            updated.name = updatedInfo.name;
        }
        if(updatedInfo.department){
            updated.department = updatedInfo.department;
        }
        if(updatedInfo.designation){
            updated.designation = updatedInfo.designation;
        }
        if(updatedInfo.jobsPosted){
            updated.jobsPosted = updatedInfo.jobsPosted;
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

    async removeEmployer(id){
        if(!id){
            throw "Error: no id was provided";
        }
        const info = await employerInfo();
        return await info.deleteOne({_id: id});
    }

}