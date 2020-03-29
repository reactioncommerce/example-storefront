import { locales } from "./config";

export default function isLocale(tested) {
  return locales.some((locale) => locale === tested);
}
