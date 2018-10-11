/* eslint-disable no-console */
const chalk = require("chalk");

/**
 * Logger middleware
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (host, port) => {
    console.log(`Server started ! ${chalk.green("✓")}`);

    console.log(`
      ${chalk.magenta(`http://${host}:${port}`)}
      ${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
  }
};

module.exports = logger;
