const { execSync } = require('child_process');
const { isChange, isConflict } = require('./utils');

const modules = [
  'codehub-commons',
  'codehub-config',
  'codehub-data',
  'codehub-gateway',
  'codehub-monitor',
  'codehub-resource',
  'codehub-search',
  'codehub-sms',
  'codehub-spider',
  'codehub-test',
  'codehub-utils',
];


const remote = execSync(`git remote`).toString('utf8').split('\n');
if (isConflict()) {
  console.log('has conflict');
  return;
}
try {
  isChange() && !isConflict() && execSync(`git add . && git commit -m "initial" && git push`);
} catch (e) {
  console.log(e);
}

modules.forEach((module) => {
  try {
    !remote.includes(module) &&
      execSync(`git remote add ${module} git@github.com:mmicome/${module}.git`);
    execSync(`git subtree add --prefix=${module} ${module} main`);
    console.log(`git subtree add --prefix=${module} ${module} main success!!`);
  } catch (e) {
    // console.log(e);
  }
  try {

    isChange() && !isConflict() && execSync(`git add . && git commit -m "initial" && git push`);
  } catch (e) {
    // console.log(e);
  }
});
