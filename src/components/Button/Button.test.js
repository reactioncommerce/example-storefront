import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import theme from "../../custom/unboxTheme";
import Button from "./Button";

describe("<Button />", () => {
  it("Should match the snapshot", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Button theme={theme} primary href="/teste">
          Teste
        </Button>
      </ThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
