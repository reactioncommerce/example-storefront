import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";

import catalogProduct from "components/ProductDetail/__mocks__/productData.mock";
import theme from "custom/reactionTheme";
import VariantList from "./VariantList";

const uiStore = {
  pdpSelectedOptionId: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkpobjJ0YzVaRkFzYVdiaXZR"
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider uiStore={uiStore}>
        <VariantList
          currencyCode="USD"
          product={catalogProduct}
          selectedOptionId="cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlNNcjRyaERGbll2Rk10RFRY"
          selectedVariantId="cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH"
          variants={catalogProduct.variants}
        />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
