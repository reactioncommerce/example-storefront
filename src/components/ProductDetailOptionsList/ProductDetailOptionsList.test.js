import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import options from "./__mocks__/options.mock";
import ProductDetailOptionsList from "./ProductDetailOptionsList";

const pdpStore = {
  selectedOption: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50Okp2aW5XNThpWFN4N3p0UEFQ"
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider pdpStore={pdpStore}>
        <ProductDetailOptionsList
          options={options}
        />
      </Provider>
    </MuiThemeProvider>));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
