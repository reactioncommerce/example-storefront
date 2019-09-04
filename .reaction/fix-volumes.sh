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

cd "$(dirname "${BASH_SOURCE[0]}")/.."
uid=$(echo "${REACTION_USER:-1000:1000}" | cut -d : -f 1)
volumes=(
  ../node_modules
  ./build
  /home/node/.cache/yarn-offline-mirror
  /home/node/.cache/yarn
)
for dir in ${volumes[*]}; do
  printf "Fixing volume ${dir} (uid ${uid})…"
  mkdir -p "${dir}"
  chown -R node "${dir}"
  chmod -R a+r,u+rw "${dir}"
  echo "✓"
done
