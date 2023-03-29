const { exec } = require("child_process");

const modules = [
  "codehub-commons",
  "codehub-config",
  "codehub-data",
  "codehub-gateway",
  "codehub-monitor",
  "codehub-resource",
  "codehub-search",
  "codehub-sms",
  "codehub-spider",
  "codehub-test",
  "codehub-utils"
]

modules.forEach(module => {
  exec(`git submodule add git@github.com:mmicome/${module}.git ${module}`, (error, stdout, stderr) => {
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
})

