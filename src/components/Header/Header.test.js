
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Header from "./Header";

test("basic snapshot", () => {
  const component = renderer.create(<Header />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
