FROM node:10-alpine
# hadolint ignore=DL3018
RUN apk --no-cache add bash curl less tini vim
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]
WORKDIR /usr/local/src/reaction-app
ENV PATH=$PATH:/usr/local/src/reaction-app/node_modules/.bin
# allow yarn to create ./node_modules
RUN chown node:node .
USER node
COPY --chown=node:node package.json yarn.lock ./
# NOTE: make sure NODE_ENV is NOT "production" for this. We need devDependencies.
RUN yarn install --frozen-lockfile --ignore-scripts --non-interactive --no-cache
COPY --chown=node:node . ./
# TODO next seems to do extra compiling/building at startup, which requires
# dev dependencies. Is there a way to get a true production build?

ENV BUILD_ENV=production NODE_ENV=production
RUN IS_BUILDING_NEXTJS=1 "$(npm bin)/next" build src
CMD ["tini", "--", "node", "."]
LABEL com.reactioncommerce.name="example-storefront"
