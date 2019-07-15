# Theming

## Styling StarterKit and Material UI components

Most of the components in the example storefront are based on the [Material UI](https://material-ui.com) components. As such, they can usually be customized using the same methods as the base Material UI components.

### Changing theme variables

Variables for customizing the theme are located in the `[src/lib/theme/reactionTheme.js](https://github.com/reactioncommerce/reaction-next-starterkit/blob/master/src/lib/theme/reactionTheme.js)  file. The [Material UI theme guide](https://material-ui.com/customization/themes/) has additional details on how to customize the theme.

For example, you can change the various colors used for the primary color, fonts used, layout dimensions and more. All of the [default theme variables from Material UI](https://material-ui.com/customization/default-theme/) are available to override as well as any additional variables added for the example storefront itself.

```js
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  layout: {
    mainContentMaxWidth: "1440px",
    mainLoginMaxWidth: "1024px"
  },
  palette: {
    primary: {
      light: "#26B0F9",
      main: "#1999DD",
      dark: "#172F3C",
      contrastText: "#FFFFFF"
    },
  ...
```

### Applying global overrides

Styles for components can be overridden globally from the [src/lib/theme/reactionTheme.js](https://github.com/reactioncommerce/example-storefront/blob/master/src/lib/theme/reactionTheme.js) file. **Before applying an override, consider updating the theme variables as it may provide you with better results.**

When using overrides you cannot add additional class names that aren't already present in the original component. You can add override existing CSS properties or add new CSS properties that may not exist in the original component's style.

Consult source code for that component you which to override for, both the style name used for overrides, as well as the class names that are available for customization.


For more information on how to override styles please consult the [Material UI guide on overrides](https://material-ui.com/customization/overrides/).

#### Theme overrides example

To add custom overrides, simply add an `overrides` object to the theme. The `overrides` object contains a key which matches the component name with a prefix, and the value being an object with your overrides to apply to that component.

- Example Storefront components are prefixed with `Sk` in the theme. e.g. `SkHeader`.
- Material UI components are prefixed with `Mui` in the theme. e.g. `MuiAppBar`.

**src/lib/theme/reactionTheme.js**

```js
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    // Override styles for the Starter kit header
    SkHeader: { // Name of the component
      appBar: { // Class name to override
        backgroundColor: "green" // Property to add or override
      }
    }
  },
 ...
```
