import { locales } from "./config";

/**
 * Check if a path passed in string matches a supported locale
 *
 * @param {String} inputLocale - the string to check against supported locales
 * @returns {Boolean} Whether passed in string is a supported locale
 */
export default function isLocale(inputLocale) {
  return locales.some((locale) => locale === inputLocale);
}
