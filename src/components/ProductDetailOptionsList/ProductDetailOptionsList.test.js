import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "custom/reactionTheme";
import options from "./__mocks__/options.mock";
import ProductDetailOptionsList from "./ProductDetailOptionsList";

const uiStore = {
  pdpSelectedOptionId: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkpobjJ0YzVaRkFzYVdiaXZR"
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider uiStore={uiStore}>
        <ProductDetailOptionsList
          options={options}
        />
      </Provider>
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
