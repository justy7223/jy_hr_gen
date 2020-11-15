const Employee = require("./Employee.js");

class Engineer extends Employee{
    // class properties
    // github;

    // constructor
    constructor(name, id, email, github = "") {
        super(name, id, email);
        this.github = github;
    }

    // class functions
    getGithub(){ return this.github; }
}

module.exports = Engineer;