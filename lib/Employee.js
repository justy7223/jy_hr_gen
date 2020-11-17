class Employee {
    // class properties
    // name;
    // id;
    // email;

    // constructor
    constructor(name = "", id = 0, email = "") {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // class functions
    getName() { return this.name; }
    getId() { return this.id; }
    getEmail() { return this.email; }
    getRole() { return this.constructor.name; }

    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data){
        Object.getOwnPropertyNames(this).forEach((property) => {
            this[property] = data[property];
        });
    }

    // This function returns an array of questions needed to configure this object.
    getQuestions() {
        let questions = [];
        Object.getOwnPropertyNames(this).forEach((property) => {
            let q = `What is the ${this.getRole()}'s ${this.camelToSpace(property)}:`;
            questions.push([property, q]);
        });
        return questions;
    }

    // This function will take a camelCase word and return Camel Case with space.
    camelToSpace(word) {
        return word
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase(); });
    }
}


module.exports = Employee;