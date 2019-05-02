const mongoCollections = require("./collection");
const  users= mongoCollections.users;
const bcrypt = require("bcrypt");

module.exports ={
    /**
     * stores the signup information into a mongoDB
     * @param {*} type employer or applicant
     * @param {*} username username they set 
     * @param {*} email validated email
     * @param {*} password password they set, 
     */
    async signup(type, username, email, password){
        if ((!username) || (typeof username !== "string")){
            throw `Error: ${username} is invalid`;
        }
        if ((!password) || (typeof password !== "string")){
            throw `Error: ${password} is invalid`;
        }
        if ((!email) || (typeof email !== "string")){
            throw `Error: ${email}is invalid`;
        }
        const person = await users();
        let newPerson = {
            type,
            username,
            email,
            //this will bcrypt the password so it is harder to decrypt
            password: bcrypt.hashSync(password,1)

        };
        const insert = await person.insertOne(newPerson);
        if(insert.insertedCount === 0){
            throw "Could not add person";
        }
        const newId = insert.insertedId;
        return await this.get(newId);
    },

    /**
     *
     * @returns an array of all the people who signed up in the collection
     */
    async allPeople(){
        const people = await signup();
        return await people.find({}).toArray();
    },

    /**
     * get the person who signed up from the database
     * @param {string} id
     * @returns the person from the database
     */
    async get(id){
        //given id, return the animal from the database
        if(!id){
            throw "Error: no id was provided";
        }
        const person = await users();
        const findPerson = await person.findOne({_id: id});
        if(findPerson === null){
            throw "No person with that id";
        }
        return findPerson;
    }

}