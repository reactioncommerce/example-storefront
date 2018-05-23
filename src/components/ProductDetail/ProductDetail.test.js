import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import ProductDetail from "./ProductDetail";
import sampleData from "./__mocks__/productData.mock";

jest.mock("next/router");

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: ""
    }
  },
  setPDPSelectedVariantId: jest.fn().mockName("uiStore.setPDPSelectedVariantId")
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider uiStore={uiStore}>
        <ProductDetail product={sampleData} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
