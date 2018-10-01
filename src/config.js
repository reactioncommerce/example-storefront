module.exports = {
  dev: process.env.NODE_ENV !== "production",
  appPath : process.env.NODE_ENV === "production" ? "./build/app" : "./src"
};

