import headerLanguage from "./headerLanguage";
import redirect from "./redirect";

export default (req, res) => {
  const {
    query: { slug },
    _parsedUrl
  } = req;

  const fallback = "de";
  const allowedLocales = [
    { name: "de-DE", locale: "de" },
    { name: "de", locale: "de" },
    { name: "en-AU", locale: "en" },
    { name: "en-IN", locale: "en" },
    { name: "en-CA", locale: "en" },
    { name: "en-NZ", locale: "en" },
    { name: "en-US", locale: "en" },
    { name: "en-ZA", locale: "en" },
    { name: "en-GB", locale: "en" },
    { name: "en", locale: "en" }
  ];

  const detections = headerLanguage(req);

  let found;

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (found || typeof language !== "string") return;

      const lookedUpLocale = allowedLocales.find((allowedLocale) => allowedLocale.name === language);

      if (lookedUpLocale) {
        found = lookedUpLocale.locale;
      }
    });
  }

  if (!found) {
    found = fallback;
  }

  const queryPart = (_parsedUrl && _parsedUrl.query) ? `?${_parsedUrl.query}` : "";

  if (slug) {
    return redirect(res, 302, `/${found}${slug ? `/${slug.join("/")}` : ""}${queryPart}`);
  }

  return redirect(res, 302, `/${found}${queryPart}`);
};
