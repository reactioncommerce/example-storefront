import cookieParser from "cookie-parser";
import express from "express";
import nextApp from "next";
import { useStaticRendering } from "mobx-react";
import logger from "lib/logger";
import { appPath, dev } from "./config";
import router from "./routes";

const app = nextApp({ dir: appPath, dev });
const routeHandler = router.getRequestHandler(app);

useStaticRendering(true);

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(routeHandler);

    return server.listen(4000, (err) => {
      if (err) throw err;
      logger.appStarted("localhost", 4000);
    });
  })
  .catch((ex) => {
    logger.error(ex.stack);
    process.exit(1);
  });

export default app;
