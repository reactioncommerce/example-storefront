# MOBX

`reaction-next-starterkit` uses [MobX](https://github.com/mobxjs/mobx) as our state management datastore.

MobX stores are to be defined in `/lib/stores`.

## Data stores

### [AuthStore](https://github.com/reactioncommerce/reaction-next-starterkit/blob/master/src/lib/stores/AuthStore.js)
`AuthStore` data store provides data related to authorization of users. The values are set inside of `src/pages/_document.js`.

### [RoutingStore](https://github.com/reactioncommerce/reaction-next-starterkit/blob/master/src/lib/stores/RoutingStore.js)
The mobx `RoutingStore` data store provides data related to the current route. The values are set inside of the `withData` HOC, as this is where `nextjs` provides routing context.

### [UIStore](https://github.com/reactioncommerce/reaction-next-starterkit/blob/master/src/lib/stores/UIStore.js)
`UIStore` data store provides data related to various UI elements of the app. The values are set at various places throughout the app.

## Adding a new observable prop to an existing store
[WIP]
