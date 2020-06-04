import fetch from "isomorphic-unfetch";
import appConfig from "../../config.js";

export default async function generateSitemap(req, res) {
  const shopUrl = `${req.protocol}://${req.headers.host}`;
  const handle = req.url.replace("/", "");

  const query = `
        { sitemap(handle: "${handle}", shopUrl: "${shopUrl}") {
        shopId
        xml
        } }
    `;

  const response = await fetch(appConfig.INTERNAL_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  if (response.status < 200 || response.status > 302) {
    res.statusCode = response.status;
    return res.send(`GraphQL query error in 'sitemapRoutesHandler': ${response.statusText}`);
  }

  const json = await response.json();

  if (!json.data || !json.data.sitemap || !json.data.sitemap.xml) {
    res.statusCode = 404;
    return res.send("Sitemap not found");
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", `public, max-age=${appConfig.SITEMAP_MAX_AGE}`);
  return res.end(json.data.sitemap.xml);
}
