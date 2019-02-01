# Reaction Storefront Next.js Starter Kit
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Freactioncommerce%2Freaction-next-starterkit.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Freactioncommerce%2Freaction-next-starterkit?ref=badge_shield)

_**Note:** This project is a work in progress and should not be used in production at this time._

Reference headless ecommerce storefront for [Reaction Commerce](https://reactioncommerce.com/) v 2.0.0.

## Features

- Headless ecommerce starter kit built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [MobX](https://mobx.js.org/getting-started.html), [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/docs/react/)
- [Reaction GraphQL API](https://github.com/reactioncommerce/reaction/tree/master/imports/plugins/core/graphql) integration
- Server-side rendering
- Payments with [Stripe](https://stripe.com/)
- Analytics with [Segment](https://segment.com/) or any other provider
- Reusable, customizable, themeable ecommerce React components from the new [Reaction Component Library](https://github.com/reactioncommerce/reaction-component-library/) with [Styled Components](https://www.styled-components.com/)
- Fully-configured test suite: Jest snapshot testing, Mocha integration testing
- Written in ES6, configured with ES6
- Containerized with Docker

## Getting Started

Follow the [Reaction Platform docs](https://docs.reactioncommerce.com/docs/installation-reaction-platform) to install and run all the services necessary to run the Starter Kit:

| Directory: Service                                                                         | URL                                                          |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API                    | [localhost:3000/graphql-alpha](localhost:3000/graphql-alpha) |
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API playground         | [localhost:3000/graphiql](localhost:3000/graphiql)           |
| [`reaction`](https://github.com/reactioncommerce/reaction): Classic UI                     | [localhost:3000](localhost:3000)                             |
| [`reaction`](https://github.com/reactioncommerce/reaction): MongoDB                        | [localhost:27017](localhost:27017)                           |
| [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra): oryd/hydra         | [localhost:4444](localhost:4444)                             |
| [`reaction-next-starterkit`](https://github.com/reactioncommerce/reaction-next-starterkit) | [localhost:4000](localhost:4000)                             |

## Configuration

### Set up Stripe

When running the storefront and Reaction for the first time, you will need to configure Stripe payment processing and shipping options to test a complete order checkout flow. After signing up for a Stripe API key, follow these steps:

1. Add public Stripe API key (`STRIPE_PUBLIC_API_KEY`) to `.env`.
2. Open the Reaction Classic app, at `http://localhost:3000`. Log in as an Admin user.
3. Open **Payments**: Enable Stripe by checking the box. Add a Stripe secret key and public key.
4. Open **Shipping**: Enable flat-rate shipping by checking the box. Enable at least one type of flat-rate shipping by clicking on the option in the table and checking the box.

### Set up Analytics event tracking

Read the docs for [setting up Segment or a custom analytics tracker](docs/tracking-events.md)

## Documentation
- [Starter Kit full documentation](./docs)
- [Reaction Component Library repository](https://github.com/reactioncommerce/reaction-component-library), [documentation](https://github.com/reactioncommerce/reaction-component-library/tree/master/docs), and [component documentation](http://designsystem.reactioncommerce.com/)
- [Reaction Docs: Using GraphQL](https://docs.reactioncommerce.com/docs/graphql-using)
- [Reaction Docs: Testing with Jest](https://docs.reactioncommerce.com/docs/testing-reaction)
- [Reaction Docs: Develping with Docker](https://docs.reactioncommerce.com/docs/installation-docker-development
)

## Development

The Reaction Platform runs the Starterkit with Docker, so you will have to use Docker commands to view logs, run commands inside the container and more. To run commands specifically for the Starterkit, make sure to change directories into the `reaction-next-starterkit` directory within the `reaction-platform` repository:

```sh
cd reaction-next-starterkit
```

### Build and run in development mode with logs
```sh
docker-compose up -d && docker-compose logs -f
```

### Running Commands inside the container
```sh
docker-compose run --rm web [command]
```
Run any command inside a Docker container and then remove the container. Use this to run any tooling operations. Remember your project directory will be mounted and things will usually just work.

### Running Tests in Container
Run tests locally
```sh
docker-compose run --rm web yarn test
````

Run tests locally without cache (this can be helpful if changes aren't showing up)
```sh
docker-compose run --rm web yarn test --no-cache
```

To update a failing snapshot (if you've made changes to a component)
```sh
docker-compose run --rm web yarn test -u
```

To run snyk security tests (this will run tests in the same way as CI)
```sh
docker-compose run --rm web sh -c "cp package.json ../ && cp .snyk ../ && cd .. && snyk auth && snyk test"
```

To run eslint
```sh
docker-compose run --rm web eslint src
```

### Debugging the server with chrome devtools

You can use the chrome devtools to debug the code running in the node.js application server while it's running inside docker.

- run `docker-compose run --rm --publish 9229:9229 --publish 4000:4000 -e NODE_ENV=development web babel-node --inspect=0.0.0.0:9229 ./src/server.js`
- Open chrome and browse to `chrome://inspect`. Find the process under **Remote Target** and click **inspect**.

### Yarn Commands

Yarn & NPM should run inside the Docker container. We've taken steps to ensure that the node_modules are placed into a cacheable location. If you run Yarn locally, the node_modules are written directly to the project directory and take precedence over those from the Docker build.
**Yarn Add**
```
docker-compose run --rm web yarn add --dev [package]
```

**Yarn Install**

⚠️ Always rebuild the image and start a new container after modifying yarn.lock or Dockerfile!
```
docker-compose run --rm web yarn install
docker-compose down --rmi local
docker-compose up -d --build
```

### Testing `reaction-component-library` components in the starterkit

Sometimes we need to test [`reaction-component-library`](https://github.com/reactioncommerce/reaction-component-library) components in the context of the starterkit. Unfortunately, there isn't an easy wasy to do this within our Docker containers, so we need to run the `starterkit` outside of docker.

1. `cd` to your local [`reaction-component-library`](https://github.com/reactioncommerce/reaction-component-library) repo.
1. Git checkout the proper branch that you want to link
1. `cd` into the `package` folder of this repo, and run the command `yarn install` followed by `yarn build`
1. After the build is done, `cd` into the new `dist` folder it just built and run `yarn link` to allow the library to be installed into the starterkit. This will link `@reactioncommerce/components`
1. Inside the `reaction-next-starterkit` repo, temporarily rename your `.yarnrc` file to anything else (i.e. `.yarnrc-temp`)
1. Run `yarn install` and then the command `yarn link "@reactioncommerce/components"` to set the local version as an override of the published npm version
1. Inside your `.env` file, change `INTERNAL_GRAPHQL_URL` to equal `http://localhost:3030/graphql-alpha`, the same as the `EXTERNAL_GRAPHQL_URL`
1. Start the starterkit locally by running the command `export $(cat .env | xargs) && yarn dev`
1. Your starterkit should now be running at `localhost:4000`
    - If you see errors about not being able to find peer dependency packages, that seems to be an issues with yarn linking. You can just temporarily `yarn add` each of those packages in the component library `package/dist` folder. (This folder is gitignored anyway.)
1. After your changes are tested, shut down the starterkit by running the command `CTRL+C`
1. Run `yarn unlink "@reactioncommerce/components"` in the starterkit repo folder
1. `cd` to the `package/dist` folder of the `reaction-component-library` repo. Run the command `yarn unlink` to unlink the local version of the component library
1. Undo the renaming of your `.yarnrc` file
1. Undo the URL change inside your `.env` file

## Cleanup Containers
Stop, and retain containers:
```sh
docker-compose stop
```

Stop, and remove containers:
```sh
docker-compose down
```

Stop, and remove containers, volumes and built images:
```sh
docker-compose down -v --rmi local
```

## Building and running the production app locally

Sometimes it is helpful during development to make a production build of the app and run that locally.

Run this command to build a Docker image with the production build of the app in it:

```sh
docker build -t reaction-storefront --build-arg BUILD_ENV=production .
```

Then, to start the app on your machine, make sure the Reaction API container is already running and enter:

```sh
docker run -d --name storefront -p 4000:4000 --env-file .env --network api.reaction.localhost reaction-storefront
```

_**NOTE:** You can replace the number before the colon in `4000:4000` with a different localhost port you'd like the application to run at._

_**NOTE:** This is not the way to run the app in actual production deployment. This is only for running the production build locally for development, demo or trial purposes._

To stop the Docker container after starting it with the above command, use:

```sh
docker stop storefront
```

## License
   Copyright 2018 Reaction Commerce

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Freactioncommerce%2Freaction-next-starterkit.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Freactioncommerce%2Freaction-next-starterkit?ref=badge_large)
