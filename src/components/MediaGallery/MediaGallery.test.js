import React from "react";
import renderer from "react-test-renderer";
import MediaGallery from "./MediaGallery";

const mediaItems = [
  {
    priority: 0,
    productId: "cmVhY3Rpb24vcHJvZHVjdDpCQ1RNWjZIVHhGU3BwSkVTaw==",
    variantId: "cmVhY3Rpb24vcHJvZHVjdDo2cWlxUHdCa2VKZHRkUWM0Rw==",
    URLs: {
      large: "/resources/placeholder.gif",
      medium: "/resources/placeholder.gif",
      original: "/resources/placeholder.gif",
      small: "/resources/placeholder.gif",
      thumbnail: "/resources/placeholder.gif"
    }
  },
  {
    priority: 0,
    productId: "cmVhY3Rpb24vcHJvZHVjdDpCQ1RNWjZIVHhGU3BwSkVTaw==",
    variantId: "cmVhY3Rpb24vcHJvZHVjdDo2cWlxUHdCa2VKZHRkUWM0Rw==",
    URLs: {
      large: "/resources/placeholder.gif",
      medium: "/resources/placeholder.gif",
      original: "/resources/placeholder.gif",
      small: "/resources/placeholder.gif",
      thumbnail: "/resources/placeholder.gif"
    }
  }
];

test("basic snapshot", () => {
  const component = renderer.create(<MediaGallery mediaItems={mediaItems} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
