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

# Want to use literal ${HOME} in the help message
home_var='${HOME}'
suffix=".cache/yarn-offline-mirror"
dir="${HOME}/${suffix}"
test_file="${dir}/.check-fs-perms"
how_to_fix="Error: Filesystem permissions are wrong on ${home_var}/.cache/yarn-offline-mirror
Fix with the following commands run from your host OS shell:

sudo chgrp -R $(id -g) \"${home_var}/${suffix}\"
sudo chmod -R g+rwx \"${home_var}/${suffix}\"
"
echo -n "Checking filesystem permissions…"
# We expect some commands to fail so allow that
set +o errexit
ec=0
ls "${dir}" &>/dev/null
ec=$(($? + ec))
if [[ $ec -eq 0 ]]; then
  echo -n "✓ read(r) and list(x)"
else
  echo -n "🚫 read(r) and list(x)"
fi
touch "${test_file}" &>/dev/null
ec=$(($? + ec))
if [[ -e "${test_file}" ]]; then
  rm "${test_file}"
fi
if [[ $ec -eq 0 ]]; then
  echo " ✓ write(w)"
else
  echo " 🚫 write(w)"
  echo "${how_to_fix}" 1>&2
  exit 10
fi
