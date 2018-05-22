import React from "react";
import renderer from "react-test-renderer";
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
    <Select
      value={20}
      options={PAGE_SIZES}
      inputProps={{
        name: "pageSize",
        id: "page-size"
      }}
      onChange={ () => true }
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
