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
To create a new observable, add the `@observable` decorator before a `property = value` set. Then, add a setter and getter to allow data to be manipulated. If needed, add an `@action` function inside the store.

Using our [`cartOpen` @observable](https://github.com/reactioncommerce/reaction-next-starterkit/blob/master/src/lib/stores/UIStore.js) as an example:

- Set the observable default data:
```
@observable _cartOpen = false;
```

- Add a getter, using the `@computed` decorator:
```
@computed
get cartOpen() {
  return this._cartOpen;
}
```

- Add a setter, to be used to set a new value to the data store:
```
set cartOpen(value) {
  this._cartOpen = value;
}
```

- Add an action, using the `@action` decorator, to change the value of the `@observable`:
```
@action
toggleCartOpen = () => {
  this.cartOpen = !this.cartOpen;
};
```

Link: [Creating observables (MobX official documentation)](https://mobx.js.org/refguide/api.html#creating-observables)
