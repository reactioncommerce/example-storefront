module.exports = {
  appPath: process.env.NODE_ENV === "production" ? "./build/app" : "./src",
  dev: process.env.NODE_ENV !== "production",
  serverPort: process.env.PORT
};

