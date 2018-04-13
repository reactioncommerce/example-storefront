import express from "express";
import nextApp from "next";
import { useStaticRendering } from "mobx-react";

import logger from "lib/logger";
import { appPath, dev } from "./config";

const app = nextApp({ dir: appPath, dev });
const handle = app.getRequestHandler();

useStaticRendering(true);

app.prepare()
  .then(() => {
    const server = express();

    /* BEGIN EXPRESS ROUTES */
    // This is how to render a masked route with NextJS
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get("/tag/:slug", (req, res) => {
      const actualPage = "/";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => handle(req, res));

    /* END EXPRESS ROUTES */


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
