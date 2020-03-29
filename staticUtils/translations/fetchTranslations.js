import translationStrings from "translations/locales";

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