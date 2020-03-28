import { useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";
import { LocaleContext } from "translations/LocaleContext";

export default function useTranslation(namespace) {
  const { localeData } = useContext(LocaleContext) || {};
  const { translations, lang } = localeData;
  const { isFallback } = useRouter();

  const stringsForNamespace = useMemo(() => translations && Array.isArray(translations) && translations.find((translation) => translation.namespace === namespace), [translations, namespace]);

  const t = useCallback((key) => {
    if (isFallback) {
      return <Skeleton variant="text" width={key ? key.length * 10 : 30} />;
    }

    if (!stringsForNamespace) {
      console.warn(`Namespace '${namespace}' for locale '${lang}' not found.`);
      return key;
    }

    if (!stringsForNamespace.translatedStrings || !stringsForNamespace.translatedStrings[key]) {
      console.warn(`Translation '${key}' for locale '${lang}' not found.`);
      return key;
    }

    return stringsForNamespace.translatedStrings[key];
  }, [stringsForNamespace]);

  return {
    t,
    locale: lang || "de"
  };
}