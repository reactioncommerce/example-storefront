import React from "react";
import renderer from "react-test-renderer";
import Link from "./";

test("basic snapshot", () => {
  const component = renderer.create(<Link route="/next">Linked</Link>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
