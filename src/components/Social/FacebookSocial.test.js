import React, { Component } from "react";
import renderer from "react-test-renderer";
import FacebookSocial from "./FacebookSocial";

const meta = {
  "description": "Shop Description",
  "siteName": "Shop Name",
  "title": "Shop Title"
};


test("basic snapshot", () => {
  const component = renderer.create((
    <FacebookSocial meta={meta} />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
