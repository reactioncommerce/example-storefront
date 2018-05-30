# Reaction Storefront Next.js Starter Kit

_**Note:** This project is a work in progress and should not be used in production at this time._

Reference Storefront application for [Reaction Commerce](https://reactioncommerce.com/).

## Getting Started
_Follow steps as necessary. If you already have Reaction installed, you may be able to skip some of these steps._

0. Prerequesites
- Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/). Docker Compose is included when installing Docker on Mac and Windows, but will need to be installed separately on Linux.

1. Clone the main [Reaction repo](https://github.com/reactioncommerce/reaction) and checkout the `release-1.12.0` branch
    ```sh
    git clone git@github.com:reactioncommerce/reaction.git
    cd reaction
    git checkout release-1.12.0

    # change directory to the parent of your reaction install
    cd ..
    ```

2. Clone this repo
    ```sh
    git clone git@github.com:reactioncommerce/reaction-next-starterkit.git
    ```

3. Create a local docker network

    You'll need to create a docker network for the GraphQL service and the Reaction Storefront to communicate
    ```
    docker network create reaction-api
    ```
    You can run `docker network ls` to verify the network has been created.

4. Start Reaction's GraphQL server
    From your `reaction` directory run
    ```
    docker-compose up -d --build
    ```
    You'll need to run the full app at least once in order for step 5 to work. After this initial run, if you don't want to start the Reaction Meteor app, you can just run `docker-compose up -d devserver`

5. Generate a Meteor login token

    _This process will be eliminated once we've built out the GraphQL API for authentication_
    - Visit the Reaction Meteor shop [localhost:3000](http://localhost:3000)
    - Open devtools and copy the Meteor.loginToken from `localStorage`.

6. Setup the Storefront environment

    Navigate to the `reaction-next-starterkit` directory and create a `.env` file.
    ```sh
    cp .env.example .env
    ```
7. Start the storefront application in development mode using Docker Compose
    ```
    docker-compose up -d --build
    ```

8. Visit the storefront on `localhost:4000`


## Development

### Build and run in development mode with logs
```
docker-compose up -d && docker-compose logs -f
```

### Running Commands inside the container
```
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

## Cleanup Containers
Stop, and retain containers:
```
docker-compose stop
```

Stop, and remove containers:
```
docker-compose down
```

Stop, and remove containers, volumes and built images:
```
docker-compose down -v --rmi local
```

## Production
Running the command below will build the starterkit for production.

```
docker build -t reaction-storefront --build-arg BUILD_ENV=production .
```

To start the app in production mode execute:

```
docker run -d --name storefront -p ${port}:4000 --env-file .env --network reaction-api reaction-storefront
```

To stop the docker container after starting it with the above command
```
docker stop storefront
```

_**NOTE:** Replace the `${port}` with the localhost port you'd like the application to run at. I'm partial to 4040_
_**NOTE:** The above command is assuming ether the `devserver` or `reaction` is also running._

## Documentation
See our [full documentation](./docs)

## Features
 - [Docker](https://docs.docker.com)
 - [React](https://reactjs.org/)
 - [Apollo](https://www.apollographql.com/docs/react/)
 - [MobX](https://mobx.js.org/getting-started.html)
 - [nextjs](https://github.com/zeit/next.js/)
 - [Material UI](https://material-ui.com/)

 ## Reference links for development
 ### CSS in JS
 - [Responsive Breakpoints](https://material-ui.com/layout/css-in-js/#responsive-breakpoints)
