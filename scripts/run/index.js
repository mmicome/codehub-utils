const { spawn, exec } = require('child_process');
const fs = require('fs');
const { cwd } = require('node:process');
const process = require('node:process');

// const sign = new AbortController();
// sign.signal.onabort = () => console.log('aborted!');

const root = cwd();
const childrens = [];

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
process.on('SIGINT', function () {
  // sign.abort("stop server");
  for (let item of childrens) {
    item.kill();
  }
  console.log('SIGINT');
});

fs.readdir(root, (error, files) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  const asyncArray = files.map((file) => {
    if (/codehub-*/.test(file)) {
      return new Promise((resolve, reject) => {
        const child = exec(`cd ${root}/${file} && pnpm install`);
        child.on('exit', (code) => {
          if (code === 0) {
            resolve(code);
          } else {
            reject(new Error(`Command failed with exit code ${code}`));
          }
        });
      });
    }
  });
  Promise.all(asyncArray).then(() => {
    files.forEach((file) => {
      if (/codehub-*/.test(file)) {
        const ls = spawn(`cd ${root}/${file} && pnpm watch`, {
          detached: false,
          shell: true,
          // signal: sign.signal
        });
        childrens.push(ls);
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
    });
  });
});
