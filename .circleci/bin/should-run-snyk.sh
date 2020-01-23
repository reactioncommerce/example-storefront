#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit  # always exit on error
set -o errtrace # trap errors in functions as well
set -o pipefail # don't ignore exit codes when piping output
set -o posix    # more strict failures in subshells
# set -x          # enable debugging

IFS=$'\n\t'
# ---- End unofficial bash strict mode boilerplate

validate_env() {
  declare -a missing
  for var in "$@"; do
    if [[ -z "${!var}" ]]; then
      echo "⚠️ ERROR: Missing required environment variable: ${var}" 1>&2
      missing+=("${var}")
    fi
  done
  if [[ -n "${missing[*]}" ]]; then
    exit 1
  fi
}

main() {
  validate_env CIRCLE_COMPARE_URL DOCKER_REPOSITORY
  if [[ -z "${CIRCLE_PULL_REQUEST}" ]]; then
    echo "NO: Not a PR. Skipping Snyk."
    exit
  fi
  # Determine PR number from pull request link
  CIRCLE_PR_NUMBER="${CIRCLE_PR_NUMBER:-${CIRCLE_PULL_REQUEST##*/}}"
  PATH="${PATH}:${CIRCLE_WORKING_DIRECTORY}/node_modules/.bin"
  if [[ -v CIRCLE_PR_NUMBER ]] && [ -n ${CIRCLE_PR_NUMBER} ]; then
    # Get PR from github API
    url="https://api.github.com/repos/${DOCKER_REPOSITORY}/pulls/${CIRCLE_PR_NUMBER}"
    # Determine target/base branch from API response
    TARGET_BRANCH=$(curl --silent --location --fail --show-error "${url}" |
      jq -r '.base.ref')
  fi
  if [[ -z "${TARGET_BRANCH}" || ${TARGET_BRANCH} == "null" ]]; then
    echo "NO: Not a PR. Skipping Snyk."
    exit
  fi
  # If target branch does not exist or is trunk, run snyk tests
  if [[ ${TARGET_BRANCH} == "trunk" ]] || [[ -z "${TARGET_BRANCH/[ ]*\n/}" ]]; then
    echo "YES: always run when targeting trunk"
    exit
  fi
  # If package.json is different from the base branch, run snyk
  if git diff "$(basename "${CIRCLE_COMPARE_URL}")" package.json | grep -q diff; then
    echo "YES: package.json different. Running Snyk."
    exit
  fi
  echo "NO: package.json identical to target branch. Skipping Snyk."
  exit
}

main "$@"
