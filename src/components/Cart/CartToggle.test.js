import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { CartToggle } from "./";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<CartToggle />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
