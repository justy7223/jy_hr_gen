const Employee = require("./Employee.js");

class Manager extends Employee {
    // class properties
    // officeNumber;

    // constructor
    constructor(name, id, email, officeNumber = 0){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // class functions
    getOfficeNumber(){ return this.officeNumber; }
}

module.exports = Manager;