import translationStrings from "translations/locales";

/**
 * Fetch translations for a given language and namespace
 *
 * @param {String} lang - the language code to fetch translations for
 * @param {Array} namespaces - An array of translation namespaces
 * @returns {Object} The translations for the given language and namespace
 */
export default async function fetchTranslations(lang, namespaces) {
  return {
    lang,
    namespaces,
    translations: namespaces.map((namespace) => ({
      namespace,
      translatedStrings:
        translationStrings[lang] && translationStrings[lang][namespace]
    }))
  };
}
