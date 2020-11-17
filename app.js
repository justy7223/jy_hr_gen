const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const employees = [];
let nextEmployee = "manager";

// This function manages the flow of the application
function init() {
    while(nextEmployee.toLowerCase() !== "done"){
        gatherInformation();
    }
    console.log(`Added ${employees.length}`);
    console.log(employees);
    // const html = render(employees);
    // writeToFile(FILENAME, genMD.generateMarkdown(data));
}

// This function retrieves the employee data
function gatherInformation() {
    let prompts = preparePrompts(nextEmployee);

    inquirer.prompt(prompts).then((data) => {
        // Store results in employee object
        let lastEmployee = employees[employees.length - 1];
        lastEmployee.setProperties(data);
        console.log(`Added Employee ${employees.length}:${JSON.stringify(lastEmployee)}`);
        // prepare for next round
        nextEmployee = data.nextRole.toLowerCase();
        if(nextEmployee !== "done"){
            prompts = preparePrompts(data.nextRole);
            console.log(`Getting Data for ${data.nextRole}`);
        }
    }).catch((error) => {
        console.log(`Error:${error}`)
    });
}

// This function will prepare the array of prompt objects
function preparePrompts(role) {
    let prompts = [];
    let questions = [];
    let employee;
    switch (role.toLowerCase()) {
        case "manager":
            employee = new Manager();
            break;
        case "intern":
            employee = new Intern();
            break;
        case "engineer":
            employee = new Engineer();
            break;
        case "employee":
            employee = new Employee();
            break;
        default:
            console.log(`Unrecognized role (${role})`);
            return;
    }
    // Store with all employees
    employees.push(employee);
    // Get role specific questions
    questions = employee.getQuestions();
    // Prepare prompts for role specific items
    questions.forEach((q) => {
        prompts.push({
            name: q[0],
            type: "input",
            message: q[1]
        });
    });
    // Add Universal prompt
    prompts.push({
        name: "nextRole",
        type: "list",
        message: "Which type of team member would you like to add:",
        choices: ["Manager", "Engineer", "Intern", "Employee", "Done"]
    });

    return prompts;
}

init();
// let testEmp = new Employee("GenEmp", 1, "Emp@email.com");
// let testEng = new Engineer("Engine", 2, "Eng@email.com", "EngGitHub");
// let testInt = new Intern("Intern", 3, "Int@email.com", "UofU");
// let testMan = new Manager("Manage", 4, "Man@email.com", 100);

// console.log(`Employee:${JSON.stringify(testEmp.getQuestions())}`);
// console.log(`Employee:${JSON.stringify(preparePrompts("Employee"))}`);

// console.log(`Engineer:${JSON.stringify(preparePrompts("Engineer"))}`);
// console.log(`Intern:${JSON.stringify(preparePrompts("Manager"))}`);
// console.log(`Manager:${JSON.stringify(preparePrompts("Intern"))}`);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
