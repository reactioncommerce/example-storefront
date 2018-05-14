# [WIP] Reaction Next Storefront Starterkit

Example storefront application for [Reaction Commerce](https://reactioncommerce.com/).

## Setup

`git clone https://github.com/reactioncommerce/reaction-next-starterkit.git && cd reaction-next-starterkit`

### Prerequisites

**Creating a local docker network**

First you'll need to create a docker network for the GraphQL service and Storefront to communicate.

_**NOTE:** Currently we're using the network name of `reaction-api` but this may change in the future._

 1. Create a network by running `docker network create reaction-api`.
 2. Run `docker network ls` to verify your new network has been created

**Starting Reaction's GraphQL server**

_**NOTE:** Currently we're using the [release 1.11.0 branch](https://github.com/reactioncommerce/reaction/pull/4151) of Reaction Commerce to create the GraphQl service._

 1. Pull the latest code from Reaction Commerce
 2. Start the devserver by running `docker-compose up -d devserver` or start both the `devserver` and `reaction` by running `docker-compose up -d`

**Getting a Meteor login token**
 1. If not already running, start a Reaction Commerce shop within docker by running `docker-compose up -d reaction`
 2. Once the app has started view the shop at [localhost:3000](http://localhost:3000)
 3. Open the devtools and copy the Meteor.loginToken from the `localStorage`.

**Setting up the Storefront's environment**
 1. Create a new `.env` file in the root of this project or copy the example one by running `cp .env.example .env`
 2. Start the storefront application in development mode by running `docker-compose up -d --build`
 3. The Storefront will run on [localhost:4000](http://localhost:4000).
 4. Use the account dropdown (user icon), and enter Meteor.loginToken from the above steps and save
 5. Add `EXTERNAL_ASSETS_URL=http://localhost:3000` to your `env` file if you wish to see image assets from your classic Reaction Commerce shop

## Development
To run the application in development mode execute:

`docker-compose up -d`

## Production
Running the command below will build the starterkit for production.

`docker build -t reaction-storefront --build-arg BUILD_ENV=production .`

To start the app in production mode execute:

`docker run -p ${port}:4000 --env-file .env --network reaction-api reaction-storefront`

_**NOTE:** Replace the `${port}` with the localhost port you'd like the application to run at._

_**NOTE:** The above command is assuming ether the `devserver` or `reaction` is also running._

## Testing
To test locally, run `docker-compose run web yarn test`

## Features
 - [Docker](https://docs.docker.com)
 - [React](https://reactjs.org/)
 - [Apollo](https://www.apollographql.com/docs/react/)
 - [MobX](https://mobx.js.org/getting-started.html)
 - [nextjs](https://github.com/zeit/next.js/)
 - [Material UI](https://material-ui-next.com/)

 ## Reference links for development
 ### CSS in JS
 - [Responsive Breakbpoints](https://material-ui-next.com/layout/css-in-js/#responsive-breakpoints)
