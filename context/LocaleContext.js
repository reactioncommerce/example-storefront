import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import isLocale from "translations/isLocale";

export const LocaleContext = createContext();

export const LocaleProvider = ({ lang, translations, namespaces, children }) => {
  const [localeData, setLocaleData] = useState({ lang, translations, namespaces });
  const { query } = useRouter();

  useEffect(() => {
    if (localeData.lang !== localStorage.getItem("locale")) {
      localStorage.setItem("locale", localeData.lang);
    }
  }, [localeData.lang]);

  // If translations updated, add them to state
  useEffect(() => {
    if (translations !== localeData.translations) {
      setLocaleData({ ...localeData, translations });
    }
  }, [translations, localeData]);

  // If namespaces updated, add them to state
  useEffect(() => {
    if (namespaces !== localeData.namespaces) {
      setLocaleData({ ...localeData, namespaces });
    }
  }, [namespaces, localeData]);

  // If query lang updated, update lang
  useEffect(() => {
    if (typeof query.lang === "string" && isLocale(query.lang) && localeData.lang !== query.lang) {
      setLocaleData({ ...localeData, lang: query.lang });
    }
  }, [query.lang, localeData]);

  return (
    <LocaleContext.Provider value={{ localeData, setLocaleData }}>
      {children}
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string,
  namespaces: PropTypes.array,
  translations: PropTypes.array
};
