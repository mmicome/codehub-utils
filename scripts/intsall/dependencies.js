/**
 * 根据端口杀进程
 * node ./killPort.js 3000 3001 3002 3003 3004 3005 3006 3007  3008 3009 3010
 */

const { exec } = require('child_process');
const process = require('node:process');

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

const params = process.argv.slice(2);
if (!params || params.length === 0) return;
modules.forEach((modules) => {
  exec(`cd ${modules} && pnpm add ${params.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
});
