import React from "react";
import renderer from "react-test-renderer";
import Anchor from "./Anchor";

test("basic snapshot", () => {
  const component = renderer.create(<Anchor href="/next">Next</Anchor>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
