import fs from 'fs';

const writeFile = (fileContent) => {
   //* create Promise object
   return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, (err) => {
         if (err) {
            reject(err);
            return;
         }
         resolve({
            ok: true,
            message: 'File created',
         });
         console.log('Portfolio complete! Check out index.html to see the output!');
      });
   });
};

const copyFile = () => {
   //* create Promise object
   return new Promise((resolve, reject) => {
      fs.copyFile('./src/style.css', './dist/style.css', (err) => {
         if (err) {
            reject(err);
            return;
         }
         resolve({
            ok: true,
            message: 'File copied',
         });
         console.log('Style sheet copied successfully!');
      });
   });
};

export { writeFile, copyFile }