// Required packages & Libraries
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const render = require("./lib/htmlRenderer.js");

// Global Variables
const OUTPUT_DIR = path.resolve(__dirname, "output"); // Folder to store generated files in
const OUTPUT_PATH = path.join(OUTPUT_DIR, "team.html");
const employees = []; // Will hold the list of employees
let nextEmployee = "manager"; // Initially create a Manager

// This function manages the flow of the application
function init() {
    gatherInformation();
}

// This function retrieves the employee data
function gatherInformation() {
    let prompts = preparePrompts(nextEmployee);

    let p1 = inquirer.prompt(prompts).then((data) => {
        // Store results in employee object
        let lastEmployee = employees[employees.length - 1];
        lastEmployee.setProperties(data);

        // prepare for next round
        nextEmployee = data.nextRole.toLowerCase();
        if (nextEmployee !== "done") {
            gatherInformation();
        } else {
            console.log(`Writing ${employees.length-1} employees data to file ${OUTPUT_PATH}`);
            console.log(employees);
            writeHTML(render(employees));
        }
    }).catch((error) => {
        console.log(`Error:${error}`)
    });
}

// This function will prepare the array of prompt objects based on role given
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
        choices: ["Manager", "Engineer", "Intern", "Done"]
    });

    return prompts;
}

// This function will write the given data to the file location given
function writeHTML(data){
    // Check if path exists
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR, {recursive: true});
    }
    fs.writeFile(OUTPUT_PATH, data, (err) => {
        if (err) {
            console.log(`Error:${err}`);
        } else {
            console.log(`Successfully generated ${OUTPUT_PATH}!`);
        }
    });
}

init();