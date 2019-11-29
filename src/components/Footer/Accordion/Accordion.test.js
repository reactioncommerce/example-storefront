import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import theme from "../../../custom/unboxTheme";
import Accordion from "./Accordion";

const links = [{ title: "Sobre" }, { title: "Onde" }];
const title = "Teste";

describe("<Accordion />", () => {
  it("Should render the correct snapshot", () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Accordion theme={theme} id="0" title={title} links={links} />
      </ThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
