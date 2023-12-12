// const inquirer = require('inquirer');  //* dos NOT work anymore
// import inquirer from 'inquirer'; //* requires app.js be renamed to app.mjs

import inquirer from 'inquirer'; //* requires to add "type": "module" in the package.json file

// const fs = require('node:fs/promises');
// const fs = require('fs');
// const generatePage = require('./src/page-template')

// const profileDataArgs = process.argv.slice(2);
// const [profileName, github] = profileDataArgs; //* destructuring

// fs.writeFile('index.html', generatePage(profileName, github), (err) => {
//    if (err) throw new Error(err);
//    console.log('Portfolio complete! Check out index.html to see the output!');
// });

// const promptUser = () => {
//    return inquirer.prompt([
//       {
//          type: 'input',
//          name: 'name',
//          message: "What's your name?",
//       },
//       {
//          type: 'number',
//          name: 'birthYear',
//          message: 'What year you were born?',
//       },
//       {
//          type: 'confirm',
//          name: 'areSure',
//          message: 'Are you sure? ',
//       },
//       {
//          type: 'list',
//          name: 'friendsList',
//          message: 'Select your best friend: ',
//          choices: ['Sam', 'Jairo', 'Oswald', 'Rodrigo'],
//       },
//       {
//          type: 'rawlist',
//          name: 'rawFriendsList',
//          message: 'Select your best friend: ',
//          choices: ['Sam', 'Jairo', 'Oswald', 'Rodrigo'],
//       },
//       {
//          type: 'expand',
//          name: 'expanded',
//          message: "I don' know what to ask: ",
//          choices: [
//             {
//                key: 'o',
//                name: 'Overwrite',
//                value: 'overwrite',
//             },
//             {
//                key: 'b',
//                name: 'Bad',
//                value: 'badbad',
//             },
//          ],
//       },
//       {
//          type: 'checkbox',
//          name: 'myCheck',
//          message:'What\'s your favorite book of scriptures? ',
//          choices: ['The Bible', 'The Book of Mormon', 'D&C', 'The Pearl of Great Price'],
//       },
//       {
//          type: 'password',
//          name: 'myPassword',
//          message: 'Enter password: ',
//          mask: '*',
//       },
// {
//    type: 'editor',
//    name: 'myEditorText',
//    message: 'Describe the situation: ',
// },
// ])}

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
         type: 'input',
         name: 'about',
         message: 'Provide some information about yourself',
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

// promptUser()
//    .then((userAnswers) => console.log(userAnswers))
//    .then(promptProject)
//    .then((projectAnswers) => console.log('projectAnswers:', projectAnswers));
promptUser()
   .then(promptProject)
   .then((portfolioData) => {
      console.log('portfolioData:', portfolioData);
   });
