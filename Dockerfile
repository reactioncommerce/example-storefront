FROM node:10.16.3-alpine

# hadolint ignore=DL3018
RUN apk --no-cache add bash curl less tini vim make
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

WORKDIR /usr/local/src/app
ENV PATH=$PATH:/usr/local/src/app/node_modules/.bin

# Allow yarn/npm to create ./node_modules
RUN chown node:node .

# Copy specific things so that we can keep the image as small as possible
# without relying on each repo to include a .dockerignore file.
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node ./src ./src
COPY --chown=node:node LICENSE ./

# Needed only for the build command
COPY --chown=node:node .babelrc ./

USER node

# Install ALL dependencies. We need devDependencies for the build command.
RUN yarn install --production=false --frozen-lockfile --ignore-scripts --non-interactive --no-cache

ENV BUILD_ENV=production NODE_ENV=production
RUN IS_BUILDING_NEXTJS=1 "$(npm bin)/next" build src

# Install only prod dependencies now that we've built, to make the image smaller
RUN rm -rf node_modules/*
RUN rm ./.babelrc
RUN yarn install --production=true --frozen-lockfile --ignore-scripts --non-interactive

# If any Node flags are needed, they can be set in the NODE_OPTIONS env variable.
CMD ["tini", "--", "node", "."]
LABEL com.reactioncommerce.name="example-storefront"
