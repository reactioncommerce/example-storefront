import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import theme from "../../custom/unboxTheme";
import UserComments from "./UserComments";

describe("<UserComments />", () => {
  it("Should match the snapshot", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <UserComments theme={theme}>Teste</UserComments>
      </ThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
