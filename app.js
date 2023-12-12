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
inquirer
   .prompt([
      // {
      //    type: 'input',
      //    name: 'name',
      //    message: "What's your name?",
      // },
      // {
      //    type: 'number',
      //    name: 'birthYear',
      //    message: 'What year you were born?',
      // },
      // {
      //    type: 'confirm',
      //    name: 'areSure',
      //    message: 'Are you sure? ',
      // },
      // {
      //    type: 'list',
      //    name: 'friendsList',
      //    message: 'Select your best friend: ',
      //    choices: ['Sam', 'Jairo', 'Oswald', 'Rodrigo'],
      // },
      // {
      //    type: 'rawlist',
      //    name: 'friendsList',
      //    message: 'Select your best friend: ',
      //    choices: ['Sam', 'Jairo', 'Oswald', 'Rodrigo'],
      // },
      // {
      //    type: 'expand',
      //    name: 'expanded',
      //    message: "I don' know what to ask: ",
      //    choices: [
      //       {
      //          key: 'o',
      //          name: 'Overwrite',
      //          value: 'overwrite',
      //       },
      //       {
      //          key: 'b',
      //          name: 'Bad',
      //          value: 'badbad',
      //       },
      //    ],
      // },
      // {
      //    type: 'checkbox',
      //    name: 'myCheck',
      //    choices: ['The Bible', 'The Book of Mormon', 'D&C', 'The Pearl of Great Price'],
      // },
      // {
      //    type: 'password',
      //    name: 'myPassword',
      //    message: 'Enter password: ',
      //    mask: '.',
      // },
      {
         type: 'editor',
         name: 'myEditorText',
         message: 'Describe the situation: ',
      },
   ])
   .then((ans) => console.log(ans));
