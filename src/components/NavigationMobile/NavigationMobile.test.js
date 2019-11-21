import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { Provider } from "mobx-react";
import unboxTheme from "../../custom/unboxTheme";
import NavigationMobile from "./NavigationMobile";

const uiStore = {
  isMenuDrawerOpen: false
};

test("basic snapshot", () => {
  const component = renderer.create(
    <ThemeProvider theme={unboxTheme}>
      <Provider uiStore={uiStore}>
        <NavigationMobile />
      </Provider>
    </ThemeProvider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
