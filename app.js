//* slice - creates subarray
//* process - equivalent to DOM
//* process.argv - parametros in the command line
var profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log("process.argv:", process.argv);

//* arrow function
const printProfileData = (profileDataArr) => {
   // for (let i = 0; i < profileDataArr.length; i++) {
   //    console.log(profileDataArr[i]);
   // }
   //* note array.forEach() method syntax and arrow function to process each element
   profileDataArr.forEach((profileItem) => {
      console.log(profileItem);
   });
};
printProfileData(profileDataArgs);
