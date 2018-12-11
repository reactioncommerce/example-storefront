/* eslint-disable no-console */
const chalk = require("chalk");

/**
 * Logger. Customize the way you log errors and messages here.
 */
const logger = {
  error(message) {
    console.error(chalk.red(message));
  },

  info(message) {
    console.info(chalk.cyan(message));
  },

  warn(message) {
    console.warn(chalk.yellow(message));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (host, port) => {
    console.info(`Server started ! ${chalk.green("✓")}`);

    console.info(`
      ${chalk.magenta(`http://${host}:${port}`)}
      ${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
  }
};

module.exports = logger;
