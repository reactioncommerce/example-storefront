# MOBX

`reaction-next-starterkit` uses [mobx](https://github.com/mobxjs/mobx) as our state management datastore.

## Data stores

### AuthStore
`AuthStore` data store provides data related to authorization of users. The values are set inside of `src/pages/_document.js`.

- `token`: The login token of the current user

### RoutingStore
The mobx `RoutingStore` data store provides data related to the current route. The values are set inside of the `withData` HOC, as this is where `nextjs` provides routing context.

- `pathname`: The pathname of the current page (i.e. `/tags/shop`)
- `query`: The query string of the current page (i.e. `shop`)


### UIStore
[WIP]
