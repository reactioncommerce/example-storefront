import React from "react";
import { mount } from "enzyme";
import Helmet from "react-helmet";
import TwitterSocial from "./TwitterSocial";

const meta = {
  description: "Shop Description",
  siteName: "Shop Name",
  title: "Shop Title"
};

test("helmet metatags - twitter", () => {
  const metaTags = [
    { property: "twitter:card", content: "summary" },
    { property: "twitter:site", content: "Shop Name" },
    { property: "twitter:title", content: "Shop Title" },
    { property: "twitter:description", content: "Shop Description" }
  ];

  mount(<TwitterSocial meta={meta} />);
  const helmet = Helmet.peek();

  expect(helmet.metaTags).toEqual(metaTags);
});
