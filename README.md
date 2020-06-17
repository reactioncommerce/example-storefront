# Example Storefront

[Reaction Commerce](http://reactioncommerce.com) is an API-first, headless commerce platform built using Node.js, React, and GraphQL. It plays nicely with npm, Docker and Kubernetes.

This Example Storefront is to serve as a reference on how to implement a web based storefront using the Reaction Commerce GraphQL API. You can fork this project as a jumping off point or create your own custom experience using your prefered client-side technology. While we believe our example storefront is full featured enough to use in production, it may be missing features your shop requires at this time.

## Features
Reaction comes with a robust set of core commerce capabilities right out of the box. And since anything in our codebase can be extended, overwritten, or installed as a package, you may also customize anything on our platform.

Check out the full list of Reaction [features](https://www.reactioncommerce.com/features) and [release history](https://reactioncommerce.com/roadmap) for more info.

This example storefront is built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [GraphQL](https://graphql.org/), and [Apollo Client](https://www.apollographql.com/docs/react/)

- Headless ecommerce example storefront built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/docs/react/)
- [Reaction GraphQL API](https://github.com/reactioncommerce/reaction/tree/master/imports/plugins/core/graphql) integration
- Server-side rendering
- Payments with [Stripe](https://stripe.com/)
- Analytics with [Segment](https://segment.com/) or any other provider
- Reusable, customizable, themeable ecommerce React components from the [Example Storefront Component Library](https://github.com/reactioncommerce/reaction-component-library/) with [Styled Components](https://www.styled-components.com/)
- Written in ES6, configured with ES6
- Containerized with Docker

## Getting Started

Follow the [Reaction Platform docs](https://docs.reactioncommerce.com/docs/installation-reaction-platform) to install and run all the services necessary to run the storefront:

| Directory: Service                                                                            | URL                                              |
|-----------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API                       | [localhost:3000/graphql](localhost:3000/graphql) |
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL Playground developer tool | [localhost:3000/graphql](localhost:3000/graphql) |
| [`reaction`](https://github.com/reactioncommerce/reaction): Reaction Admin                    | [localhost:4080](localhost:4080)                 |
| [`reaction`](https://github.com/reactioncommerce/reaction): MongoDB                           | [localhost:27017](localhost:27017)               |
| [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra): Authentication        | [localhost:4444](localhost:4444)                 |
| [`example-storefront`](https://github.com/reactioncommerce/example-storefront): Storefront    | [localhost:4000](localhost:4000)                 |

**Note**: The storefront has redirects so that if you open [http://localhost:4000/graphql](http://localhost:4000/graphql), you'll be redirected to the GraphQL Playground.

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
- [Example Storefront full documentation](./docs)
- [Example Storefront Component Library repository](https://github.com/reactioncommerce/reaction-component-library), [documentation](https://github.com/reactioncommerce/reaction-component-library/tree/master/docs), and [component documentation](http://designsystem.reactioncommerce.com/)
- [Reaction Docs: Using GraphQL](https://docs.reactioncommerce.com/docs/graphql-using)
- [Reaction Docs: Testing with Jest](https://docs.reactioncommerce.com/docs/testing-reaction)
- [Reaction Docs: Developing with Docker](https://docs.reactioncommerce.com/docs/installation-docker-development
)

## Development

The Reaction Platform runs the storefront with Docker, so you will have to use Docker commands to view logs, run commands inside the container and more. To run commands specifically for the storefront, make sure to change directories into the `example-storefront` directory within the `reaction-platform` repository:
```sh
cd example-storefront
```

### Build and run in development mode with logs
Create a symbolic link to use the development Docker image:
```
ln -s docker-compose.dev.yml docker-compose.override.yml
```

If running for the first time or environment variables in `.env.example` have changed execute the command below to update environment variables.
```
./bin/setup
```

Start the storefront by executing:
```sh
docker-compose up -d && docker-compose logs -f
```

### Run in development against a production API

Change the `INTERNAL_GRAPHQL_URL` in `.env` to the production API URL. The URL should end in `/graphql`, like: `https://my-website.com/graphql`. Save the `.env` file and restart the application with:

```sh
docker-compose run --rm --service-ports web yarn start
```

### Run commands in container

```sh
docker-compose run --rm web [command]
```
Run any command inside a Docker container and then remove the container. Use this to run any tooling operations. Remember your project directory will be mounted and things will usually just work. See Yarn section below for more examples.

### Run tests in container

Run tests locally
```sh
docker-compose run --rm web yarn test
```

Run tests locally without cache (this can be helpful if changes aren't showing up)
```sh
docker-compose run --rm web yarn test --no-cache
```

To run Snyk security tests (this will run tests in the same way as CI)
```sh
docker-compose run --rm web sh -c "cp package.json ../ && cp .snyk ../ && cd .. && snyk auth && snyk test"
```

To run ESLint
```sh
docker-compose run --rm web eslint src
```

### Debugging the server with Chrome DevTools

You can use the Google Chrome DevTools to debug the code running in the Node.js application server while it's running inside Docker.

- run `docker-compose run --rm --publish 9229:9229 --publish 4000:4000 -e NODE_ENV=development web node --inspect=0.0.0.0:9229 ./src/server.js`
- Open Chrome and browse to `chrome://inspect`. Find the process under **Remote Target** and click **inspect**.

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

### Testing component library in the storefront

Sometimes we need to test the [Example Storefront Component Library](https://github.com/reactioncommerce/reaction-component-library) components in the context of the storefront. Unfortunately, there isn't an easy wasy to do this within our Docker containers, so we need to run the `storefront` outside of docker.

1. `cd` to your local [`reaction-component-library`](https://github.com/reactioncommerce/reaction-component-library) repo.
1. Git checkout the proper branch that you want to link
1. `cd` into the `package` folder of this repo, and run the command `yarn install` followed by `yarn build`
1. After the build is done, `cd` into the new `dist` folder it just built and run `yarn link` to allow the library to be installed into the storefront. This will link `@reactioncommerce/components`
1. Inside the `example-storefront` repo, temporarily rename your `.yarnrc` file to anything else (i.e. `.yarnrc-temp`)
1. Run `yarn install` and then the command `yarn link "@reactioncommerce/components"` to set the local version as an override of the published npm version
1. Inside your `.env` file, change `INTERNAL_GRAPHQL_URL` to equal `http://localhost:3000/graphql`, the same as the `EXTERNAL_GRAPHQL_URL`
1. Start the storefront locally by running the command `export $(cat .env | xargs) && yarn dev`
1. Your storefront should now be running at `localhost:4000`
    - If you see errors about not being able to find peer dependency packages, that seems to be an issues with yarn linking. You can just temporarily `yarn add` each of those packages in the component library `package/dist` folder. (This folder is gitignored anyway.)
1. After your changes are tested, shut down the storefront by running the command `CTRL+C`
1. Run `yarn unlink "@reactioncommerce/components"` in the storefront repo folder
1. `cd` to the `package/dist` folder of the `reaction-component-library` repo. Run the command `yarn unlink` to unlink the local version of the component library
1. Undo the renaming of your `.yarnrc` file
1. Undo the URL change inside your `.env` file

## Clean up containers
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

## Build and run the production app locally

Sometimes it is helpful during development to make a production build of the app and run that locally.

Run this command to build a Docker image with the production build of the app in it:

```sh
docker build --network=host -t  reactioncommerce/example-storefront:X.X.X .
```
Where X.X.X indicates the tag version you want to use, i.e. `3.1.0`

Then, to start the app on your machine, make sure the Reaction API container is already running and enter:

```sh
docker run -it --name storefront -p 4000:4000 --env-file .env.prod --network reaction.localhost reactioncommerce/example-storefront:X.X.X
```

_**NOTE:** You can replace the number before the colon in `4000:4000` with a different localhost port you'd like the application to run at._

_**NOTE:** This is not the way to run the app in actual production deployment. This is only for running the production build locally for development, demo or trial purposes._

To stop the Docker container after starting it with the above command, use:

```sh
docker stop reaction-storefront
```

## Contribute

Find a bug, a typo, or something that’s not documented well? We’d love for you to [open an issue](https://github.com/reactioncommerce/example-storefront/issues) telling us what we can improve!

Want to request a feature? Use our [Reaction Feature Requests repository](https://github.com/reactioncommerce/reaction-feature-requests) to file a request.

We love your pull requests! Check our our [`Good First Issue`](https://github.com/reactioncommerce/example-storefront/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and [`Help Wanted`](https://github.com/reactioncommerce/example-storefront/issues?q=label%3A%22help+wanted%22) tags for good issues to tackle.

### Pull Request guidelines
Pull requests should pass all automated tests, style, and security checks.

#### Automated Tests
Your code should pass all [acceptance tests and unit tests](https://docs.reactioncommerce.com/reaction-docs/trunk/testing-reaction). Run
```sh
docker-compose run --rm web yarn test
```
to run the test suites locally. If you're adding functionality to Reaction, you should add tests for the added functionality. You can run the tests locally without cache if necessary by passing the `--no-cache` flag. This can be helpful if changes aren't showing up.
```sh
docker-compose run --rm web yarn test --no-cache
```

To update a failing snapshot (if you've made changes to a component)
```sh
docker-compose run --rm web yarn test -u
```

#### Eslint
We require that all code contributed to Reaction follows [Reaction's ESLint rules](https://github.com/reactioncommerce/reaction-eslint-config). You can run
```
docker-compose run --rm web eslint src
```
to run ESLint against your code locally.

Please follow the [Reaction Code Style Guide](https://docs.reactioncommerce.com/docs/styleguide). Check out our guides to [JSDoc](https://docs.reactioncommerce.com/docs/jsdoc-style-guide), [Git](https://docs.reactioncommerce.com/docs/git-style-guide), [error handling](https://docs.reactioncommerce.com/docs/error-handling-guide), [logging](https://docs.reactioncommerce.com/docs/logging), and [React](https://docs.reactioncommerce.com/docs/react-best-practices).

We also request that you follow the our [pull request template](https://docs.reactioncommerce.com/docs/contributing-to-reaction#fill-out-the-pull-request-template)

Get more details in our [Contributing Guide](https://docs.reactioncommerce.com/docs/contributing-to-reaction).

### Developer Certificate of Origin
We use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) in lieu of a Contributor License Agreement for all contributions to Reaction Commerce open source projects. We request that contributors agree to the terms of the DCO and indicate that agreement by signing all commits made to Reaction Commerce projects by adding a line with your name and email address to every Git commit message contributed:
```
Signed-off-by: Jane Doe <jane.doe@example.com>
```

You can sign your commit automatically with Git by using `git commit -s` if you have your `user.name` and `user.email` set as part of your Git configuration.

We ask that you use your real name (please no anonymous contributions or pseudonyms). By signing your commit you are certifying that you have the right have the right to submit it under the open source license used by that particular Reaction Commerce project. You must use your real name (no pseudonyms or anonymous contributions are allowed.)

We use the [Probot DCO GitHub app](https://github.com/apps/dco) to check for DCO signoffs of every commit.

If you forget to sign your commits, the DCO bot will remind you and give you detailed instructions for how to amend your commits to add a signature.


## License
   Copyright 2019 Reaction Commerce

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Freactioncommerce%2Fexample-storefront.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Freactioncommerce%2Fexample-storefront?ref=badge_large)
