# [WIP] Reaction Next Storefront Starterkit

Example storefront application for [Reaction Commerce](https://reactioncommerce.com/).

## Setup
### Prerequisites

**Creating a local docker network**
First you'll need to create a docker network for the GraphQL service and Storefront to communicate.
*NOTE: Currently we're using the network name of `reaction-api` but this may change in the future.*

 1. Create a network by running `docker network create reaction-api`.
 2. Run `docker network ls` to verify your new network has been created

**Starting Reaction's GraphQL server**
*NOTE: Currently we're using this [branch](https://github.com/reactioncommerce/reaction/tree/feat-aldeed-graphql-pure-queries) of Reaction Commerce to create the GraphQl service.*

 1. Pull the latest code from Reaction Commerce
 2. Start the devserver by running `docker-compose up -d devserver` or start both the devserver and reaction by running `docker-compose up -d`

**Getting a Meteor login token**
 1. If not already running start a Reaction Commerce shop within docker by running `docker-compose up -d reaction`
 2. Once the app has started view the shop at localhost:3000
 3. Open the devtools and copy the Meteor.loginToken from the localstorage.

**Setting up the Storefront's environment**
 1. Create a new `.env` file in the root of this project or copy the example one by running `cp .env.example .env`
 2. Replace the METEOR_TOKEN with the Meteor.loginToken from the above steps.
 3. Start the storefront application in development mode by running `docker-compose up -d`

## Features
 - [Docker](https://docs.docker.com)
 - [React](https://reactjs.org/)
 - [Apollo](https://www.apollographql.com/docs/react/)
 - [MobX](https://mobx.js.org/getting-started.html)
 - [nextjs](https://github.com/zeit/next.js/)
 - [Material UI](https://material-ui-next.com/)
