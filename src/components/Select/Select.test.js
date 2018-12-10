import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import Select from "./Select";


const PAGE_SIZES = [
  {
    name: "20 Products",
    value: 20
  },
  {
    name: "60 Products",
    value: 60
  },
  {
    name: "100 Products",
    value: 100
  }
];

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Select
        value={20}
        options={PAGE_SIZES}
        inputProps={{
          name: "pageSize",
          id: "page-size"
        }}
        onChange={() => true}
      />
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
