const Employee = require("./Employee.js");

class Intern extends Employee{
    // class properties
    // school;

    // constructor
    constructor(name, id, email, school = ""){
        super(name,id,email);
        this.school = school;
    }

    // class functions
    getSchool(){ return this.school; }
}

module.exports = Intern;