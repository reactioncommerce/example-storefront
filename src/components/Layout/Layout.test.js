import React from "react";
import renderer from "react-test-renderer";
import Layout from "./";

test("basic snapshot", () => {
  const component = renderer.create(<Layout />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
