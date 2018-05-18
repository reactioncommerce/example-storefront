import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import ProductDetail from "./ProductDetail";
import sampleData from "./__mocks__/productData.mock";

const pdpStore = {
  selectedOption: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50Okp2aW5XNThpWFN4N3p0UEFQ"
};

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: ""
    }
  }
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider pdpStore={pdpStore} uiStore={uiStore}>
        <ProductDetail product={sampleData} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
