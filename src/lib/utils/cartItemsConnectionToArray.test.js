import cartItemsConnectionToArray from "./cartItemsConnectionToArray";

const cart = {
  _id: "cmVhY3Rpb24vY2FydDpzSFlwWGdKRFRrb25yUXNUbw==",
  items: {
    edges: [
      {
        node: {
          imageURLs: {
            large: "/assets/files/Media/2oDhWDyk4qFsCZiAW/large/belle-HERO.jpg",
            medium: "/assets/files/Media/2oDhWDyk4qFsCZiAW/medium/belle-HERO.jpg",
            original: "/assets/files/Media/2oDhWDyk4qFsCZiAW/image/belle-HERO.jpg",
            small: "/assets/files/Media/2oDhWDyk4qFsCZiAW/small/belle-HERO.png",
            thumbnail: "/assets/files/Media/2oDhWDyk4qFsCZiAW/thumbnail/belle-HERO.png"
          },
          currentQuantity: null,
          optionTitle: "Red",
          productSlug: "basic-reaction-product",
          productType: "product-simple",
          productVendor: "Example Manufacturer",
          variantTitle: "Option 1 - Red Dwarf"
        }
      },
      {
        node: {
          imageURLs: {
            large: "/assets/files/Media/mBSj5Fe8QgCKMCN4K/large/belle-HERO.jpg",
            medium: "/assets/files/Media/mBSj5Fe8QgCKMCN4K/medium/belle-HERO.jpg",
            original: "/assets/files/Media/mBSj5Fe8QgCKMCN4K/image/belle-HERO.jpg",
            small: "/assets/files/Media/mBSj5Fe8QgCKMCN4K/small/belle-HERO.png",
            thumbnail: "/assets/files/Media/mBSj5Fe8QgCKMCN4K/thumbnail/belle-HERO.png"
          },
          currentQuantity: null,
          optionTitle: "Green",
          productSlug: "basic-reaction-product",
          productType: "product-simple",
          productVendor: "Example Manufacturer",
          variantTitle: "Option 2 - Green Tomato"
        }
      }
    ]
  }
};

test("cartItemsConnectionToArray should convert a Relay style connection into a simple array of objects", () => {
  const result = cartItemsConnectionToArray(cart.items, {
    externalAssetsUrl: "https://my.cdn.com"
  });

  const expected = [
    {
      imageURLs: {
        large: "https://my.cdn.com/assets/files/Media/2oDhWDyk4qFsCZiAW/large/belle-HERO.jpg",
        medium: "https://my.cdn.com/assets/files/Media/2oDhWDyk4qFsCZiAW/medium/belle-HERO.jpg",
        original: "https://my.cdn.com/assets/files/Media/2oDhWDyk4qFsCZiAW/image/belle-HERO.jpg",
        small: "https://my.cdn.com/assets/files/Media/2oDhWDyk4qFsCZiAW/small/belle-HERO.png",
        thumbnail: "https://my.cdn.com/assets/files/Media/2oDhWDyk4qFsCZiAW/thumbnail/belle-HERO.png"
      },
      currentQuantity: null,
      optionTitle: "Red",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 1 - Red Dwarf"
    },
    {
      imageURLs: {
        large: "https://my.cdn.com/assets/files/Media/mBSj5Fe8QgCKMCN4K/large/belle-HERO.jpg",
        medium: "https://my.cdn.com/assets/files/Media/mBSj5Fe8QgCKMCN4K/medium/belle-HERO.jpg",
        original: "https://my.cdn.com/assets/files/Media/mBSj5Fe8QgCKMCN4K/image/belle-HERO.jpg",
        small: "https://my.cdn.com/assets/files/Media/mBSj5Fe8QgCKMCN4K/small/belle-HERO.png",
        thumbnail: "https://my.cdn.com/assets/files/Media/mBSj5Fe8QgCKMCN4K/thumbnail/belle-HERO.png"
      },
      currentQuantity: null,
      optionTitle: "Green",
      productSlug: "basic-reaction-product",
      productType: "product-simple",
      productVendor: "Example Manufacturer",
      variantTitle: "Option 2 - Green Tomato"
    }
  ];

  expect(result).toEqual(expected);
});
