   // const fs = require('node:fs/promises');
   const fs = require('fs');
   const generatePage = require('./src/page-template')

   const profileDataArgs = process.argv.slice(2);
   const [profileName, github] = profileDataArgs; //* destructuring

   fs.writeFile('index.html', generatePage(profileName, github), (err) => {
      if (err) throw new Error(err);
      console.log('Portfolio complete! Check out index.html to see the output!');
   });