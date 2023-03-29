const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { cwd } = require('node:process');
const { isChange, isConflict } = require('./utils');

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
      execSync(`git subtree pull --prefix=${file} ${file} main --squash`);
      console.log(`git subtree pull --prefix=${file} ${file} main success!!`);

      isChange() && !isConflict() && execSync(`git add . && git commit -m "sync:pull" && git push`);
    }
  });
});
