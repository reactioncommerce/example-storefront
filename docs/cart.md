# Cart

## Cart types

### Anonymous

Anonymous carts are retrieved by `cartId` and `token`, where both the `cartId` and the `token` are returned from the `createCart` mutation and both the `cartId` and `token` are stored locally to the client/session.

### Account

Account carts are retrieved by `accountId` and `shopId`.

## Carts and authentication

When logging in or loading the app, it's possible that there will be both an anonymous cart and an account cart.
Specific things to do:

Check whether there is an anonymous `cartId` and `token` stored. It can be assumed these two strings will be in local storage or an SSR session, which is the same behavior as the login tokens.

If we have an anonymous `cartId` and `token`, and we're logged in, call the `reconcileCart` mutation and use the returned cart as the cart object. Assuming the reconciliation is successful, delete the `cartId` and `token` from local storage.

Otherwise, if we are logged in, get the account cart using `accountCartByAccountId` query with an `accountId` and `shopId`. The primary shop ID is used for now, though this should respect the marketplace shared cart setting in the future.

Otherwise, if we have an anonymous `cartId` and `token`, get the anonymous cart using `anonymousCartByCartId ` query.

## @withCart decorator

The `@withCart` decorator adds a `cart` prop to the component it wraps. The `cart` object will always exist and either be an anonymous cart or an account cart.

`Cart.items` is a connection with the default request being `20` items, sorted by newest to oldest `addedAt` date. To load additional cart items, call the `loadMoreCartItems` function provided as a prop to the wrapped component. This will trigger loading of the next 20 cart items if there are more.
