import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Profile from "./Profile";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<Profile />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
