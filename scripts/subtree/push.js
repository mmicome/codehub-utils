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
      exec(`git subtree push --prefix=${file} ${file} main`, (error, stdout, stderr) => {
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