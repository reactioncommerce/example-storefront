import React from "react";
import { mount } from "enzyme";
import Helmet from "react-helmet";
import FacebookSocial from "./FacebookSocial";

const meta = {
  description: "Shop Description",
  siteName: "Shop Name",
  title: "Shop Title"
};

test("helmet metatags - open graph", () => {
  const metaTags = [
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: "Shop Name" },
    { property: "og:title", content: "Shop Title" },
    { property: "og:description", content: "Shop Description" }
  ];

  mount(<FacebookSocial meta={meta} />);
  const helmet = Helmet.peek();

  expect(helmet.metaTags).toEqual(metaTags);
});
