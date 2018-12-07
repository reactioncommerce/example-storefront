# Tags

## Tag Listing Page (TLP)

A Tag Listing Page (TLP) lists all the products with a specific tag in a grid layout.

A Tag Listing Page can have its own display title, metadata for the page header, slug and URL.

### Add custom metadata to TLP

The tag listing page uses a Tag's `metafields` field to store an array of data, including metadata to be rendered on the Tag Listing Pages (TLP). The TLP uses [`react-helmet`](https://github.com/nfl/react-helmet) to inject plain HTML tags into the head, including `meta` tags.

#### How to store Tag metafields

A Tag `metafields` can take several keys and values, including: `key`, `scope`, `value`, `valueType`:
- `scope`: Keyword and description metatags take `name`, while Open Graph takes `property`
- `key`: The type of metatag, like `description`, `og:image`, `keywords`, `og:url`
- `value`: Values of the keys, like `keywords go here` or `product description goes here`.
- `valueType`: `header` to distinguish metafields for the `header`, from other unrelated metafields.

#### How to display Tag metafields

The Tag Listing Page formats Tag `metafields` into the proper format for `react-helmet` with the  `renderHeaderMetadata()` function.

Take the following Tag `metafields` object example, with the proper `key`, `scope`, `value` and `valueType` fields:

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
          "valueType": "header"
        }]
    }
```

This `keywords` metafield on the `Shirts` tag would produce this header metadata on the Tag Listing Page:

```html
<meta data-react-helmet="true" name="keywords" content="t-shirts, shirts, tees, tops, tee-shirts">
```



