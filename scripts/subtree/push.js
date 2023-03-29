const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { cwd } = require('node:process');
const { isChange, isConflict } = require('./utils');

execSync(`git pull`);
console.log(`git pull`);

require('./pull');

if (isConflict()) {
  console.log('has conflict');
  return;
}
try {
  isChange() && !isConflict() && execSync(`git add . && git commit -m "sync:pull" && git push`);
} catch (e) {
  console.log(e);
}

fs.readdir(cwd(), (error, files) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  files.forEach((file) => {
    if (/codehub-*/.test(file)) {
      try {
        execSync(`git subtree push --prefix=${file} ${file} main`);
        console.log(`git subtree push ${file} success!!`);
      } catch (error) {
        console.log(`git subtree push ${file} error!!`);
        // console.log(error)
      }
    }
  });
});
