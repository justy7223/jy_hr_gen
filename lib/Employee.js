class Employee {
    // class properties
    // name;
    // id;
    // email;

    // constructor
    constructor(name = "", id = 0, email= ""){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // class functions
    getName(){ return this.name; }
    getId(){ return this.id; }
    getEmail(){ return this.email; }
    getRole(){ return this.constructor.name; }
}


module.exports = Employee;