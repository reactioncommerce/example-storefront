# Tags

## Tag Listing Page (TLP)

A Tag Listing Page (TLP) lists products with a specific tag in a grid layout.

A TLP can be visible to the public, when `isVisible` is true, or hidden, when `isVisible` is false. When `isVisible` is false, the TLP will not render in a browser and will not be part of the Site Map.

Each TLP can have its own:
- name (required)
- slug (required)
- display title
- hero image
- metadata fields in the page's `<head>`
- list of featured products, by product ID

### How to store custom metadata for the TLP

Uses a Tag's `metafields` field to store an array of data, including metadata to be rendered in the `<head>` section.

1. In a Tag's `metafields` array, add an object with the key `namespace` with the value `metatag` in a Tag's `metafields` array to distinguish metatag data, from other unrelated metafields.

2. Add the following keys and values to this object:
- `scope`: The first part of a metatag element. For example, keyword and description metatags take `name`, while Open Graph takes `property`.
- `key`: The type of metatag, like `description`, `og:image`, `keywords`, `og:url`.
- `value`: Values of the keys, like `keywords go here` or `product description goes here`.

### How to display Tag metafields

1. Use the `renderHeaderMetadata()` function in `src/pages/tag.js` to format the Tag's metafield data into an array to be consumed by [`react-helmet`](https://github.com/nfl/react-helmet) module, the module used by this storefront impelementation to inject plain HTML tags into the head, including `meta` tags.

```jsx
<Helmet
  title={`${tag && tag.name} | ${shop && shop.name}`}
  meta={
    tag.metafields && tag.metafields.length && this.renderHeaderMetatags(tag.metafields)
  }
/>
```

2. Test that the metatag properly renders. Take the following Tag `metafields` object example, with the proper `key`, `scope`, `value` and `namespace` fields:

```js
    "tag": {
      "position": 2,
      "slug": "shirts",
      "heroMediaUrl": "http://localhost:3000/assets/files/Media/uEmGFBpaFpB8XKqh3/large/shirts.png",
      "metafields": [
        {
          "key": "keywords",
          "scope": "name",
          "value": "t-shirts, shirts, tees, tops, tee-shirts",
          "namespace": "metatag"
        }]
    }
```

This `keywords` metafield on the `Shirts` tag would produce this header metadata on the Tag Listing Page:

```html
<meta name="keywords" content="t-shirts, shirts, tees, tops, tee-shirts">
```


