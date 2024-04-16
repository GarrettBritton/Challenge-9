const inquirer = require("inquirer");
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = inquirer
.prompt([
  {
    type: "input",
    message: ("What is your Title?"),
    name: "Title",
  },
  {
      type: "input",
      message: ("Please rovide a short description explaining the what, why, and how of your project. Use the following questions as a guide:"),
      name: "Description",
  },
  {
      type: "input",
      message: ("Please enter your table of contents (Optional, If your README is long, add a table of contents to make it easy for users to find what they need.)"),
      name: "Contents",
  },
  {
      type: "input",
      message: ("Please provide the steps required to install your project? Provide a step-by-step description of how to get the development environment running."),
      name: "Installation",
  },
  {
      type: "input",
      message: ("Please provide instructions and examples for use. Include screenshots as needed."),
      name: "Usage",
  },
  {
    type: "list",
    message: ("Please select a License"),
    name: "License",
    choices: ["None", "Apache License 2.0", "GNU General Public License v3.0", "MIT License", "BSD 2-Clause 'Simplified' License", "BSD 3-Clause 'New' or 'Revised' License", "Boost Software License 1.0", "Creative Commons Zero v1.0 Universal", "Eclipse Public License v2.0", "GNU Affero General Public License v3.0", "GNU General Public License v2.0", "GNU Lesser General Public License v2.1", "Mozilla Public License 2.0", "The Unlicense"],
},
{
    type: "input",
    message: ("If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so."),
    name: "Contributors",
},
{
    type: "input",
    message: ("Please enter any tests you'd like to suggest for the users"),
    name: "Tests",
},
{
    type: "input",
    message: ("Please enter your GitHub ursername"),
    name: "Github",
},
{
    type: "input",
    message: ("Please enter your email address"),
    name: "Email",
},
])
// TODO: Create a function to write README file
.then((response) =>
fs.writeFile('README.md',(`# ${response.Title} \n## Description: \n${response.Description} \n## Table of Contents: \n${response.Contents}
## Installation: \n${response.Installation} \n## Usage: \n${response.Usage} \n## License: \n${response.License} \n## Contributing: \n${response.Contributing} \n## Tests: \n${response.Tests} \n## Questions: \nYou can access my github here: https://github.com/${response.Github} for any additional questions or email me at ${response.Email}`),(err) =>
err ? console.error(err) : console.log('Success!')
));

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();