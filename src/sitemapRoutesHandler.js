const fetch = require("isomorphic-fetch");
const config = require("./config");

/**
 * @summary processes requests for sitemaps
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Object} next - the next middleware function
 * @returns {undefined}
 */
async function sitemapRoutesHandler(req, res, next) {
  const shopUrl = `${req.protocol}://${req.get("host")}`;
  const handle = req.originalUrl.replace("/", "");

  const query = `
    { sitemap(handle: "${handle}", shopUrl: "${shopUrl}") {
      shopId
      xml
    } }
  `;

  const response = await fetch(config.INTERNAL_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (response.status < 200 || response.status > 302) {
    res.statusCode = response.status;
    return next(new Error(`GraphQL query error in 'sitemapRoutesHandler': ${response.statusText}`));
  }

  const json = await response.json();

  if (!json.data || !json.data.sitemap || !json.data.sitemap.xml) {
    res.statusCode = 404;
    return next(new Error("Sitemap not found"));
  }

  res.statusCode = 200;
  res.set({
    "Content-Type": "text/xml",
    "Cache-Control": `public, max-age=${config.SITEMAP_MAX_AGE}`
  });
  return res.end(json.data.sitemap.xml);
}

module.exports = { sitemapRoutesHandler };
