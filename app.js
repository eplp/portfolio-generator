// const inquirer = require('inquirer');  //* does NOT work anymore
import inquirer from 'inquirer'; //* requires to add "type": "module" in the package.json file or to rename app.js to app.mjs (preferred to add "type": "module")
// const profileDataArgs = process.argv.slice(2);
// const [profileName, github] = profileDataArgs; //* destructuring

//* const generatePage = require('./src/page-template') - not working anymore
import { generatePage } from './src/page-template.js'; 
import { writeFile, copyFile } from './utils/generate-site.js'

const promptUser = () => {
   return inquirer.prompt([
      {
         type: 'input',
         name: 'name',
         message: "What's your name? (Required)",
         validate: (nameData) => {
            if (nameData) {
               return true;
            } else {
               console.log('Please enter your name!');
               return false;
            }
         },
      },
      {
         type: 'input',
         name: 'github',
         message: 'Enter your GitHub Username?',
         validate: (nameData) => {
            if (nameData) {
               return true;
            } else {
               console.log('Please enter your name!');
               return false;
            }
         },
      },
      {
         type: 'confirm',
         name: 'confirmAbout',
         message: 'Would you like to enter some information about yourself for an "About" section?',
         default: true,
      },
      {
         //* this prompt will execute when the "when" condition is true ONLY
         type: 'input',
         name: 'about',
         message: 'Provide some information about yourself',
         when: ({ confirmAbout }) => {
            if (confirmAbout) {
               return true;
            } else {
               return false;
            }
         },
      },
   ]);
};

const promptProject = (portfolioData) => {
   if (!portfolioData.projects) {
      portfolioData.projects = [];
   }
   console.log(`
*********************
  Add a new project
*********************`);
   return inquirer
      .prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: (nameData) => {
               if (nameData) {
                  return true;
               } else {
                  console.log('Please enter your name!');
                  return false;
               }
            },
         },
         {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: (nameData) => {
               if (nameData) {
                  return true;
               } else {
                  console.log('Please enter your name!');
                  return false;
               }
            },
         },
         {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
         },
         {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
         },
         {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false,
         },
         {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false,
         },
      ])
      .then((projectData) => {
         portfolioData.projects.push(projectData);
         if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
         } else {
            return portfolioData;
         }
      });
};

// const mockData = {
//    name: 'Lernantino',
//    github: 'lernantino',
//    confirmAbout: true,
//    about: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//    projects: [
//       {
//          name: 'Run Buddy',
//          description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//          languages: ['HTML', 'CSS'],
//          link: 'https://github.com/lernantino/run-buddy',
//          feature: true,
//          confirmAddProject: true,
//       },
//       {
//          name: 'Taskinator',
//          description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//          languages: ['JavaScript', 'HTML', 'CSS'],
//          link: 'https://github.com/lernantino/taskinator',
//          feature: true,
//          confirmAddProject: true,
//       },
//       {
//          name: 'Taskmaster Pro',
//          description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//          languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//          link: 'https://github.com/lernantino/taskmaster-pro',
//          feature: false,
//          confirmAddProject: true,
//       },
//       {
//          name: 'Robot Gladiators',
//          description: 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//          languages: ['JavaScript'],
//          link: 'https://github.com/lernantino/robot-gladiators',
//          feature: false,
//          confirmAddProject: false,
//       },
//    ],
// };

promptUser()
   .then(promptProject)
   .then((portfolioData) => {
      return generatePage(portfolioData);
   })
   .then((pageHTML) => {
      return writeFile(pageHTML);
   })
   .then((writeFileResponse) => {
      console.log(writeFileResponse);
      return copyFile();
   })
   .then((copyFileResponse) => {
      console.log(copyFileResponse);
   })
   .catch((err) => {
      console.log(err);
   });

//! promptUser()
//* Ask user for their information; return data as an object in a Promise.
//! .then(promptProject)
//* Capture returning data from promptUser().Inside, it recursively calls promptProject() for as many projects as the user wants to add. Each project will be pushed into a projects array in the collection of portfolio information, and when we're done, the finished portfolio data object is returned as portfolioData and sent into the generatePage() function, which will return the finished HTML template code into pageHTML.
//! .then((pageHTML) => {
//!    return writeFile(pageHTML);
//! })
//* We pass pageHTML into the newly created writeFile() function, which returns a Promise. This is why we use return here, so the Promise is returned into the next .then() method.
//! .then((writeFileResponse) => {
//!    console.log(writeFileResponse);
//!    return copyFile();
//! })
//* Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it, and then we return copyFile().
//! .then((copyFileResponse) => {
//!    console.log(copyFileResponse);
//! })
//* The Promise returned by copyFile() then lets us know if the CSS file was copied correctly, and if so, we're all done!
