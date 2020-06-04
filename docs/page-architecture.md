# Page Architecture

## Dependency Injection
Common dependencies are injected in the root level component, `_app.js`, and will be available to all pages. Common dependencies are provided by the following decorator: 
* @withApolloClient - Decorates each page with the `ApolloProvider` giving each page the capability to make `GraphQL` requests. 
* @withShop - Decorates each page with current shop's id, description, currency and other relevant fields. A `shop` prop with this information will be available to each page.
* @withTheme - Makes the Material UI theme available to all pages and subsequent components. To access the theme use the `@withStyles(styles, {withTheme: true })` decorator in a page or component.
* @track - Makes tracking facilities available to each page. 

## Adding A New Page
To add a new page, create a new page in the `src/pages` directory, to use a custom route add it to the `routes` file in the projects root.

## Head Tags: Title, Meta, Link, etc...
### Static Tags
Within the Storefront the `_document.js` component handles creating the initial HTML markup, this is where we define static/general `<head />` tags to include on every page. These meta, link and script tags are nested directly inside the nextjs `<Head />` component since they will never change.

### Dynamic Tags
Titles, descriptions and other page specific `<head />` tags may need to be updated as routes change. Add all page specific `<head />` tags to the react-helmet `<Helmet />` component within the individual page component.

**Example**

```jsx
// src/pages/index.js
// Index render
<Fragment>
  <Helmet
    title={`${shop && shop.name} | ${shop && shop.description}`}
    meta={[{ name: "description", content: shop && shop.description }]}
  />
  <ProductGrid catalogItems={catalog} />
</Fragment>


// src/pages/product.js
// Product render
<Fragment>
  <Helmet
    title={`${product && product.title} | ${shop && shop.name}`}
    meta={[{ name: "description", content: product && product.description }]}
    script={[{ type: "application/ld+json", innerHTML: buildProductJSONLd(product) }]}
  />
  <ProductDetail product={product} />
</Fragment>
```

## Executing GraphQL Queries
ApolloClient's [Query](https://www.apollographql.com/docs/react/essentials/queries.html#basic) component is used within a HOC to manage GraqhQL queries. The HOC is used to decorate the target component that will receive a query's respone data as props. Reference `src/containers/catalog/withCatalogItems` for a concrete example.
