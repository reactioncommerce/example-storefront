import express from "express";
import nextApp from "next";
import { useStaticRendering } from "mobx-react";

import logger from "lib/logger";
import { appPath, dev } from "./config";
import router from "./routes";

const app = nextApp({ dir: appPath, dev });
const routeHandler = router.getRequestHandler(app);
const handle = app.getRequestHandler();

useStaticRendering(true);

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(routeHandler);
    server.get("*", (req, res) => handle(req, res));
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
