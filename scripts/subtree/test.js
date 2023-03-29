const { execSync, exec } = require('child_process');

// const status = execSync(`git status -s`);
// const status = execSync(`git count-objects`)
// const status = execSync(`git rev-list -n 1 --all`);
const status = execSync(`git diff --check`);
console.log(!!status.toString('utf8'));
