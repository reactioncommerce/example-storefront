import React from "react";
import renderer from "react-test-renderer";
import TwitterSocial from "./TwitterSocial";

const meta = {
  "description": "Shop Description",
  "siteName": "Shop Name",
  "title": "Shop Title"
};


test("basic snapshot", () => {
  const component = renderer.create((
    <TwitterSocial meta={meta} />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
