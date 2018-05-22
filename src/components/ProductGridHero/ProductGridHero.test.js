import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import { MuiThemeProvider } from "material-ui/styles";
import theme from "lib/theme/reactionTheme";
import ProductGridHero from "./ProductGridHero";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "http://localhost:3000"
    }
  }
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider uiStore={uiStore}>
        <ProductGridHero />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
