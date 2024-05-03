import cron from 'node-cron';
import { exec } from 'child_process';

cron.schedule('*/5 * * * * *', () => {
  exec('node task.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing task.js: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error in task.js: ${stderr}`);
      return;
    }
    console.log(`Task.js output: ${stdout}`);
  });
});
