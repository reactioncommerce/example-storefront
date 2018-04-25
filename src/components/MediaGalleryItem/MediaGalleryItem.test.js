import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import MediaGalleryItem from "./MediaGalleryItem";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: ""
    }
  }
};

const media = {
  toGrid: 1,
  priority: 0,
  productId: "cmVhY3Rpb24vcHJvZHVjdDpCQ1RNWjZIVHhGU3BwSkVTaw==",
  variantId: "cmVhY3Rpb24vcHJvZHVjdDo2cWlxUHdCa2VKZHRkUWM0Rw==",
  URLs: {
    large: "/assets/files/Media/P3MkhDWadHoDNsFPE/large/I0DhYYC.jpg",
    medium: "/assets/files/Media/P3MkhDWadHoDNsFPE/medium/I0DhYYC.jpg",
    original: "/assets/files/Media/P3MkhDWadHoDNsFPE/image/I0DhYYC.jpg",
    small: "/assets/files/Media/P3MkhDWadHoDNsFPE/small/I0DhYYC.png",
    thumbnail: "/assets/files/Media/P3MkhDWadHoDNsFPE/thumbnail/I0DhYYC.png"
  }
};

test("basic snapshot", () => {
  const component = renderer.create(shallow(<MediaGalleryItem media={media} uiStore={uiStore} />).get(0));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
