const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { cwd } = require('node:process');

fs.readdir(cwd(), (error, files) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  files.forEach(file => {
    if(/codehub-*/.test(file)) {
      exec(`git subtree pull --prefix=${file} ${file} main --squash`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
    }
  })
})

// exec("git subtree push --prefix=codehub-commons codehub-commons main", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

// exec("git subtree push --prefix=codehub-config codehub-config main", (error, stdout, stderr) => {
//   if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//   }
//   if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//   }
//   console.log(`stdout: ${stdout}`);
// });
