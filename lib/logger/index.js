/* eslint-disable no-console */
const chalk = require("chalk");

/**
 * Logger. Customize the way you log errors and messages here.
 */
const logger = {
  error(message, ...rest) {
    console.error(chalk.red(message), ...rest);
  },

  info(message, ...rest) {
    console.info(chalk.cyan(message), ...rest);
  },

  warn(message, ...rest) {
    console.warn(chalk.yellow(message), ...rest);
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
