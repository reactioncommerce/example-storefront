import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const basePath = serverRuntimeConfig.faviconUrl;

const favicons = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: `/${basePath}apple-touch-icon.png`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: `${basePath}/favicon-32x32.png`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: `${basePath}/favicon-16x16.png`
  },
  {
    rel: "manifest",
    href: `${basePath}/manifest.json`
  },
  {
    rel: "mask-icon",
    color: "#5bbad5",
    href: `${basePath}/safari-pinned-tab.svg`
  },
  {
    rel: "shortcut icon",
    href: `${basePath}/favicon.ico`
  }
];

export default favicons;
