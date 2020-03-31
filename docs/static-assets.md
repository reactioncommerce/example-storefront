# Static Assets
Your storefront will probably need to include static assets such as, logo images, timezone/internationalization data, favicons, etc..

## Handling static assets
The example storefront follows the approach outlined in the [Next.JS documentation](https://nextjs.org/docs/basic-features/static-file-serving) keeping all static assets in the `/src/public/` folder.

**Images**
Logos, placeholders and similar images are placed in the `/public/images/` directory.

**Favicons**
Favicons are placed in the `public/favicons/` directory.

**Static Data**
Locales, timezones, currency codes and similar data structures are placed in the `/public/data` directory.

**Fonts**
Out of the box the Example Storefront leverages [fonts.google.com](https://fonts.google.com/) for font delivery. You could however add custom fonts to a `/public/fonts/` directory if needed.

**Icons**
We feel icons are best handled as SVGs within React components and not as a static asset. 
See [MDI](https://github.com/TeamWertarbyte/mdi-material-ui) and [Reaction Design System's svg directory](https://github.com/reactioncommerce/reaction-component-library/tree/master/package/src/svg) for more info.
