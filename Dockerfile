FROM node:8-alpine

ARG NAME=reaction-next-starterkit
ARG DESCRIPTION=""
ARG URL=https://github.com/reactioncommerce/reaction-next-starterkit
ARG DOC_URL=https://github.com/reactioncommerce/reaction-next-starterkit
ARG VCS_URL=https://github.com/reactioncommerce/reaction-next-starterkit
ARG VCS_REF
ARG VENDOR
ARG BUILD_DATE
ARG BUILD_COMPARE_URL
ARG BUILD_ENV=test
ARG BUILD_NUMBER
ARG BUILD_PLATFORM
ARG BUILD_PLATFORM_PROJECT_USERNAME
ARG BUILD_PLATFORM_PROJECT_REPONAME
ARG BUILD_PULL_REQUESTS
ARG BUILD_TRIGGERED_BY_TAG
ARG BUILD_URL
ARG CIRCLE_WORKSPACE_ID
ARG CIRCLE_WORKFLOW_ID
ARG CIRCLE_WORKFLOW_JOB_ID
ARG CIRCLE_WORKFLOW_UPSTREAM_JOB_IDS
ARG CIRCLE_WORKSPACE_ID
ARG GIT_REPOSITORY_URL
ARG GIT_SHA1
ARG LICENSE

ENV APP_SOURCE_DIR=/usr/local/src/reaction-app \
    PATH=$PATH:/usr/local/src/node_modules/.bin

LABEL maintainer="Reaction Commerce <engineering@reactioncommerce.com>" \
      com.reactioncommerce.build-date=$BUILD_DATE \
      com.reactioncommerce.name=$NAME \
      com.reactioncommerce.description=$DESCRIPTION \
      com.reactioncommerce.url=$URL \
      com.reactioncommerce.vcs-url=$VCS_URL \
      com.reactioncommerce.vcs-ref=$VCS_REF \
      com.reactioncommerce.vendor=$VENDOR \
      com.reactioncommerce.docker.build.compare-url=$BUILD_COMPARE_URL \
      com.reactioncommerce.docker.build.number=$BUILD_NUMBER \
      com.reactioncommerce.docker.build.platform=$BUILD_PLATFORM \
      com.reactioncommerce.docker.build.platform.project.username=$BUILD_PLATFORM_PROJECT_USERNAME \
      com.reactioncommerce.docker.build.platform.project.reponame=$BUILD_PLATFORM_PROJECT_REPONAME \
      com.reactioncommerce.docker.build.pull-requests=$BUILD_PULL_REQUESTS \
      com.reactioncommerce.docker.build.triggered-by-tag=$BUILD_TRIGGERED_BY_TAG \
      com.reactioncommerce.docker.build.url=$BUILD_URL \
      com.reactioncommerce.docker.build.circle.workflow.id=$CIRCLE_WORKFLOW_ID \
      com.reactioncommerce.docker.build.circle.workflow.job.id=$CIRCLE_WORKFLOW_JOB_ID \
      com.reactioncommerce.docker.build.circle.workflow.upstream.job.ids=$CIRCLE_WORKFLOW_UPSTREAM_JOB_IDS \
      com.reactioncommerce.docker.build.circle.workflow.url=https://circleci.com/workflow-run/$CIRCLE_WORKFLOW_ID \
      com.reactioncommerce.docker.build.circle.workspace.id=$CIRCLE_WORKSPACE_ID \
      com.reactioncommerce.docker.git.repository.url=$GIT_REPOSITORY_URL \
      com.reactioncommerce.docker.git.sha1=$GIT_SHA1 \
      com.reactioncommerce.docker.license=$LICENSE

WORKDIR $APP_SOURCE_DIR/..
COPY package.json yarn.lock $APP_SOURCE_DIR/../

# Build the dependencies into the Docker image in a cacheable way. Dependencies
# are only rebuilt when package.json or yarn.lock is modified.
#
# The project directory will be mounted during development. Therefore, we'll
# install dependencies into an external directory (one level up.) This works
# because Node traverses up the fs to find node_modules.
RUN set -ex; \
  if [ "$BUILD_ENV" = "production" ]; then \
    yarn install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache \
      --production; \
  elif [ "$BUILD_ENV" = "test" ]; then \
    yarn install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache; \
  elif [ "$BUILD_ENV" = "development" ]; then \
    yarn install \
      --cache-folder /home/node/.cache/yarn \
      --ignore-scripts; \
  fi; \
  rm package.json yarn.lock

WORKDIR $APP_SOURCE_DIR
COPY . $APP_SOURCE_DIR

# RUN yarn run build

CMD ["yarn start"]
