import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import VariantList from "./";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<VariantList />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
