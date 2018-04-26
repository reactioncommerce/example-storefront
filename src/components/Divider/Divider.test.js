import React from "react";
import renderer from "react-test-renderer";

import Divider from "./Divider";

test("basic snapshot", () => {
  const component = renderer.create((
    <Divider />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
