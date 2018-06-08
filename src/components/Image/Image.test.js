import React from "react";
import renderer from "react-test-renderer";
import Image from "./Image";

test("Image snapshot", () => {
  const component = renderer.create(<Image />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
