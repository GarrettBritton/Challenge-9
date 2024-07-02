const inquirer = require("inquirer");
const fs = require('fs');


function getLicenseIcon(license) {
    switch (license) {
        case "None":
            return "";
        case "Apache License 2.0":
            return "icons/License-Apache-2.0-blue.png";
        case "GNU General Public License v3.0":
            return "icons/License-GPLv3-blue.png";
        case "MIT License":
            return "icons/License-MIT-yellow.png";
        case "BSD 2-Clause 'Simplified' License":
            return "icons/License-BSD-2--Clause-orange.png";
        case "BSD 3-Clause 'New' or 'Revised' License":
            return "icons/BSD-3.png";
        default:
            return "";
    }
}


function getLicenseDescription(license) {
    switch (license) {
        case "None":
            return "No license";
        case "Apache License 2.0":
            return `
The Apache 2.0 license is quite detailed. The basics of the license is that anyone who uses open source software licensed under Apache 2.0 must include the following in their copy of the code, whether they have modified it or not:
The original copyright notice
A copy of the license itself
If applicable, a statement of any significant changes made to the original code
A copy of the NOTICE file with attribution notes (if the original library has one)
The requirement to list any significant changes to the original code is a major difference between the other popular permissive licenses, such as the MIT and BSD licenses. Unlike with Copyleft licenses you don't have to release the code, just disclose the changes you made.`;
        case "GNU General Public License v3.0":
            return `
The GNU GPLv.3 full license terms are quite lengthy and detailed and you should consider reading them fully if you are using the GNU GPLv.3 license for any significant project or attempting to integrate code licensed under the GLPv.3 license into your existing projects.

The basic terms of the license permit users to run, study, share, and modify software. Any publicly released code requires that the source code also be made publicly available under the same or substantially similar terms as the original license.`;
        case "MIT License":
            return `
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
        case "BSD 2-Clause 'Simplified' License":
            return `
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;
        case "BSD 3-Clause 'New' or 'Revised' License":
            return `
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;
        default:
            return "";
    }
}

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is your Title?",
        name: "Title",
    },
    {
        type: "input",
        message: "Please provide a short description explaining the what, why, and how of your project.",
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
        message: "Please select a License",
        name: "License",
        choices: [
            { name: "None", value: "None" },
            { name: "Apache License 2.0", value: "Apache License 2.0" },
            { name: "GNU General Public License v3.0", value: "GNU General Public License v3.0" },
            { name: "MIT License", value: "MIT License" },
            { name: "BSD 2-Clause 'Simplified' License", value: "BSD 2-Clause 'Simplified' License" },
            { name: "BSD 3-Clause 'New' or 'Revised' License", value: "BSD 3-Clause 'New' or 'Revised' License" },
        ],
    },
    {
    type: "input",
    message: ("If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so."),
    name: "Contributing",
    },
    {
    type: "input",
    message: ("Please enter any tests you'd like to suggest for the users"),
    name: "Tests",
    },
    {
        type: "input",
        message: "Please enter your GitHub username",
        name: "Github",
    },
    {
        type: "input",
        message: "Please enter your email address",
        name: "Email",
    },
];

// TODO: Create a function to write README file
function writeREADME(response) {
    const licenseIcon = getLicenseIcon(response.License);
    const licenseDescription = getLicenseDescription(response.License);

    const readmeContent = `# ${response.Title} 

## Description: 
${response.Description} 

## License:
![License](./${licenseIcon})

## Table of Contents: 
${response.Contents}

## Installation: 
${response.Installation} 

## Usage: 
${response.Usage} 

## Contributing: 
${response.Contributing} 

## Tests: 
${response.Tests} 

## Questions: 
You can access my GitHub here: [https://github.com/${response.Github}](https://github.com/${response.Github})
for any additional questions or email me at ${response.Email}

${licenseDescription}`;



    fs.writeFile('README.md', readmeContent, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Success! README.md generated.');
        }
    });
}

// Function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            writeREADME(response);
        })
        .catch((error) => {
            console.error("Error occurred:", error);
        });
}

// Initialize app
init();