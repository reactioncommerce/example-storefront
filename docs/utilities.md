# Tools and Utilities

## GraphiQL App

> TL;DR: With a Reaction App running using `docker-compose`, open the Local Storage panel in your browser dev tools and copy the value of `Meteor.loginToken` into the `Header value` field.

1. Follow the instructions to install the [GraphiQL app](https://github.com/skevy/graphiql-app).
1. Launch the app
1. Click the button labeled `Edit HTTP Headers`
1. Click `+ Add Header`
1. For `Header name` enter `meteor-login-token`
1. For `Header value` you'll need your `Meteor.loginToken` from the [Getting Started](https://github.com/reactioncommerce/reaction-next-starterkit#getting-started) guide.
1. Make your first query by setting GraphQL Endpoint to http://localhost:3030/graphql-alpha and querying for the viewer's name:
```graphql
{
  viewer {
    name
  }
}
```

For more on your getting started with GraphQL and Reaction: https://docs.reactioncommerce.com/reaction-docs/master/graphql-intro
