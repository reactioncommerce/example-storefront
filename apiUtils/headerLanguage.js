/**
 * Look up the accepted languages in the HTTP headers
 *
 * @param {Object} req - the current request
 * @returns {Array} A list of accepted languages
 */
export default function headerLookup(req) {
  let found;

  if (typeof req !== "undefined") {
    const { headers } = req;
    if (!headers) return found;

    const locales = [];
    const acceptLanguage = headers["accept-language"];

    if (acceptLanguage) {
      const languages = []; let index; let match;
      const rgx = /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi;

      do {
        match = rgx.exec(acceptLanguage);
        if (match) {
          const lng = match[1]; const weight = match[5] || "1"; const priority = Number(weight);
          if (lng && !isNaN(priority)) {
            languages.push({ lng, priority });
          }
        }
      } while (match);

      languages.sort((langA, langB) => langB.priority - langA.priority);

      for (index = 0; index < languages.length; index += 1) {
        locales.push(languages[index].lng);
      }

      if (locales.length) found = locales;
    }
  }

  return found;
}
