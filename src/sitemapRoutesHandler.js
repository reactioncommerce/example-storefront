const fetch = require("isomorphic-fetch");
const config = require("./config");
const logger = require("./lib/logger");

/**
 * @summary processes requests for sitemaps
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Object} next - the next middleware function
 * @returns {undefined}
 */
function sitemapRoutesHandler(req, res, next) {
  if (req.originalUrl.startsWith("/sitemap") === false) {
    return next();
  }

  res.setHeader("Content-Type", "text/xml");

  const shopUrl = `${req.protocol}://${req.get("host")}`;
  const handle = req.originalUrl.replace("/", "");

  const query = `
    { sitemap(handle: "${handle}", shopUrl: "${shopUrl}") {
      shopId
      xml
    } }
  `;

  return fetch(config.INTERNAL_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.sitemap && response.data.sitemap.xml) {
        res.statusCode = 200;
        return res.end(response.data.sitemap.xml);
      }

      res.statusCode = 404;
      return res.end();
    })
    .catch((error) => {
      logger.error(`GraphQL query error in 'sitemapRoutesHandler': ${error}`);
      res.statusCode = 500;
      return res.end();
    });
}

module.exports = { sitemapRoutesHandler };
