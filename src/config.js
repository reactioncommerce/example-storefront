export const dev = process.env.NODE_ENV !== "production";
export const appPath = process.env.NODE_ENV === "production" ? "./build/app" : "./src";
