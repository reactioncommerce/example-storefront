import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ProductDetail from "./ProductDetail";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<ProductDetail />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
