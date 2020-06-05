import { useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";
import { LocaleContext } from "context/LocaleContext";

/**
 * Gets translations for a given namespace
 *
 * @param {String} namespace - the translation namespace
 * @returns {Object} Translations
 */
export default function useTranslation(namespace) {
  const { localeData } = useContext(LocaleContext) || {};
  const { translations, lang } = localeData;
  const { isFallback } = useRouter();

  const stringsForNamespace = useMemo(() => translations &&
    Array.isArray(translations) && translations.find((translation) => translation.namespace === namespace), [translations, namespace]);

  const t = useCallback((key) => { // eslint-disable-line id-length
    if (isFallback) {
      return <Skeleton variant="text" width={key ? key.length * 10 : 30} />;
    }

    if (!stringsForNamespace) {
      // eslint-disable-next-line no-console
      console.warn(`Namespace '${namespace}' for locale '${lang}' not found.`);
      return key;
    }

    if (!stringsForNamespace.translatedStrings || !stringsForNamespace.translatedStrings[key]) {
      // eslint-disable-next-line no-console
      console.warn(`Translation '${key}' for locale '${lang}' not found.`);
      return key;
    }

    return stringsForNamespace.translatedStrings[key];
  }, [stringsForNamespace]);

  return {
    t, // eslint-disable-line id-length
    locale: lang || "de"
  };
}
