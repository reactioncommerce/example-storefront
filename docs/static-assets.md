# Static Assets
Your storefront will probably need to include static assets such as, logo images, timezone/internationalization data, favicons, etc..

## Handling static assets
The starterkit follows the approach outlined in the [Next.JS documentation](https://github.com/zeit/next.js/#static-file-serving-eg-images) keeping all static assets in the `/src/static/` folder.

**Images**
Logos, placeholders and similar images are placed in the `/static/images/` directory.

**Favicons**
Favicons are placed in the `/static/favicons/` directory.

**Static Data**
Locales, timezones, currency codes and similar data stuctures are placed in the `/static/data` directory.

**Fonts**
Out of the box the starterkit leverages [fonts.google.com](https://fonts.google.com/) for font delivery. You could however add custom fonts to a `/static/fonts/` directory if needed.

**Icons**
We feel icons are best handled as SVGs within React components and not as a static asset. 
See [MDI](https://github.com/TeamWertarbyte/mdi-material-ui) and [Reaction Design System's svg directory](https://github.com/reactioncommerce/reaction-component-library/tree/master/package/src/svg) for more info.
