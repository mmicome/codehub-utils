const { exec, fork, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { cwd } = require('node:process');

const root = cwd()

fs.readdir(root, (error, files) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  files.forEach(file => {
    if(/codehub-*/.test(file)) {
      const ls = spawn(`cd ${root}/${file} && yarn && yarn watch`, {
        // detached: true,
        shell: true
      });
      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      
      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  })
})