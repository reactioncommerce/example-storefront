// Sample Catalog Product Data
export default {
  _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s=",
  title: "Reaction Sample Product",
  slug: "example-product",
  description: "Sign in as administrator to edit.\nYou can clone this product from the product grid.\n" +
    "You can upload images click or drag in image box on the left here.\nTag this product below, and then add tag" +
    " in navigation.\nClick the bookmark in the tag to set product url.\nOption variants, price, quantity," +
    " and child variants are created by clicking on the variant below, clone the variant to add more options.\n" +
    "Details can be added below the image for more specific product information.\n Login next to the cart," +
    " and then click the dashboard icon for more tools.",
  vendor: "Example Manufacturer",
  isLowQuantity: false,
  isSoldOut: false,
  isBackorder: false,
  primaryImage: null,
  price: {
    range: "$12.99 - $330",
    min: 12.99,
    max: 330
  },
  tags: [
    {
      node: {
        position: null,
        name: "Shoes",
        slug: "shoes"
      }
    },
    {
      node: {
        position: null,
        name: "Shop",
        slug: "shop"
      }
    }
  ],
  variants: [
    {
      _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH",
      ancestorIds: [
        "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s="
      ],
      title: "Sample Variant",
      price: 19.99,
      optionTitle: "Untitled Option",
      options: [
        {
          _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlNNcjRyaERGbll2Rk10RFRY",
          ancestorIds: [
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s=",
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH"
          ],
          title: "Option 1 - Red Dwarf",
          price: 19.99,
          optionTitle: "Red"
        },
        {
          _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkNKb1JCbTl2UnJvcmM5bXha",
          ancestorIds: [
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s=",
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH"
          ],
          title: "Option 2 - Green Tomato",
          price: 12.99,
          optionTitle: "Green"
        }

      ]
    },
    {
      _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlB6QXlqeW1ER3U2V0drRGpu",
      ancestorIds: [
        "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s="
      ],
      title: "Sample Variant 2",
      price: 10.99,
      optionTitle: "Untitled Option",
      options: [
        {
          _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkhaUHFmaVBIV0xabWZ1aHZp",
          ancestorIds: [
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s=",
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlB6QXlqeW1ER3U2V0drRGpu"
          ],
          title: "Sample Variant 2 - Blue Option",
          price: 200,
          optionTitle: "Blue"
        },
        {
          _id: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50Old5em43emZhQkFYS1hja3BT",
          ancestorIds: [
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6QkNUTVo2SFR4RlNwcEpFU2s=",
            "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OlB6QXlqeW1ER3U2V0drRGpu"
          ],
          title: "Sample Variant 2 - Red Option",
          price: 330,
          optionTitle: "Red"
        }

      ]
    }
  ],
  media: [
    {
      toGrid: 1,
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
      toGrid: 1,
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
      toGrid: 1,
      priority: 0,
      productId: "cmVhY3Rpb24vcHJvZHVjdDpCQ1RNWjZIVHhGU3BwSkVTaw==",
      variantId: "cmVhY3Rpb24vcHJvZHVjdDpTTXI0cmhERm5ZdkZNdERUWA==",
      URLs: {
        large: "/resources/placeholder.gif",
        medium: "/resources/placeholder.gif",
        original: "/resources/placeholder.gif",
        small: "/resources/placeholder.gif",
        thumbnail: "/resources/placeholder.gif"
      }
    },
    {
      toGrid: 1,
      priority: 0,
      productId: "cmVhY3Rpb24vcHJvZHVjdDpCQ1RNWjZIVHhGU3BwSkVTaw==",
      variantId: "cmVhY3Rpb24vcHJvZHVjdDpDSm9SQm05dlJyb3JjOW14Wg==",
      URLs: {
        large: "/resources/placeholder.gif",
        medium: "/resources/placeholder.gif",
        original: "/resources/placeholder.gif",
        small: "/resources/placeholder.gif",
        thumbnail: "/resources/placeholder.gif"
      }
    },
    {
      toGrid: 1,
      priority: 2,
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
      toGrid: 1,
      priority: 3,
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
      toGrid: 1,
      priority: 4,
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
      toGrid: 1,
      priority: 5,
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
  ]
};
