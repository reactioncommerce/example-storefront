import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Cart from "./Cart";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<Cart />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
