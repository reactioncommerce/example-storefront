# Tools and Utilities

## GraphiQL App

1. Follow the instructions to install the [GraphiQL app](https://github.com/skevy/graphiql-app).
1. Launch the app
1. Click the button labeled `Edit HTTP Headers`
1. Click `+ Add Header`
1. For `Header name` enter `meteor-login-token`
1. For `Header value` you'll need your `Meteor.loginToken` from the [Getting Started](https://github.com/reactioncommerce/reaction-next-starterkit#getting-started) guide.
1. TL;DR: With a Reaction App running using docker-compose, open the local storage panel in your browsers dev tools, and copy the value of the `Meteor.loginToken` into the `Header value` field.
