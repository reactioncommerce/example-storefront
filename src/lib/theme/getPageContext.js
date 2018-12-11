import { SheetsRegistry } from "jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import theme from "../../custom/reactionTheme";

/**
 * @summary Creates and returns a page context object
 * @returns {Object} Page context object
 */
function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

/**
 * Either creates a new or returns an existing page context object. If called from Node, creates
 * a new object every time. Otherwise creates and caches an object in the browser and
 * subsequent calls will return that.
 *
 * @summary Gets a page context object
 * @returns {Object} Page context object
 */
export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
