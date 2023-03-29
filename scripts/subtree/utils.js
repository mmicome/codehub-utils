const { exec, execSync } = require('child_process');

exports.isChange = () => {
  let isChange = false;
  try {
    let status = execSync(`git status -s`);
    isChange = !!status.toString('utf8');
    return isChange;
  } catch (e) {
    return isChange;
  }
};

exports.isConflict = () => {
  let isConflict = false;
  try {
    let conflict = execSync(`git diff --check`);
    isConflict = !!conflict.toString('utf8');
    return isConflict;
  } catch (e) {
    return isConflict;
  }
};
