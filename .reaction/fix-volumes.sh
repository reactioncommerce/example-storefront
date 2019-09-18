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
owner=$(stat -c "%u:%g" .)
volumes=(
  ./node_modules
  ./build
  /home/node/.cache/yarn
  /home/node/.cache/yarn-offline-mirror
)
for dir in ${volumes[*]}; do
  mkdir -p "${dir}"
  old_owner=$(stat -c "%u:%g" "${dir}")
  if [[ "$1" != "--force" && "${old_owner}" == "${owner}" ]]; then
    continue
  fi
  printf "Fixing volume ${dir} (before=${old_owner} after=${owner})…"
  chown -R "${owner}" "${dir}"
  chmod -R a+r,u+rw "${dir}"
  echo "✓"
done
