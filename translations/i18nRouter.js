import Router from "next/router";

const ignorePaths = ["/signin", "/signin", "/refresh"];

const replace = (href, as) => {
  if (!process.browser) {
    // eslint-disable-next-line
    console.warn("You should only use i18nRouter inside the client side of your app.");
    return null;
  }

  const locale = location.pathname.split("/")[1];

  if (href === "/") {
    return Router.replace("/[lang]", `/${locale}`);
  }

  if (ignorePaths.includes(href)) {
    return Router.replace(href);
  }

  if (!as) {
    return Router.replace(`/[lang]${href}`, `/${locale}${href}`);
  }

  Router.replace(`/[lang]${href}`, `/${locale}${as}`);

  return null;
};

const push = (href, as) => {
  if (!process.browser) {
    // eslint-disable-next-line no-console
    console.warn("You should only use i18nRouter inside the client side of your app.");
    return null;
  }

  const locale = location.pathname.split("/")[1];

  if (href === "/") {
    return Router.push("/[lang]", `/${locale}`);
  }

  if (ignorePaths.includes(href)) {
    return Router.push(href);
  }

  if (!as) {
    return Router.push(`/[lang]${href}`, `/${locale}${href}`);
  }

  Router.push(`/[lang]${href}`, `/${locale}${as}`);

  return null;
};

export default {
  replace,
  push,
  back: () => Router.back()
};
