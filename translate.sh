#!/usr/bin/env sh

set -e

LANGUAGE=$(echo ${1} | tr '[:upper:]' '[:lower:]')
BASE_URL=https://savetheinternet.eu

if [ -z $LANGUAGE ]
then
  echo "./translate.sh [TWO_LETTER_CODE]"
  exit 1
fi

create_config_file() {
  NEW_CONFIG_FILE="config_${LANGUAGE}.yaml"
  echo "creating new config file... (to \"./${NEW_CONFIG_FILE}\")"
cat >"config_${LANGUAGE}.yaml" <<EOF
baseurl:    "${BASE_URL}"
title:      "SAVE THE INTERNET"
contentdir: "content/${LANGUAGE}"
publishdir: "public/${LANGUAGE}"
theme:      "sti"

params:
  language: "${LANGUAGE}"
EOF
}

copy_layouts() {
  echo "copying default layouts (en)... (to \"./layouts/${LANGUAGE}\")"
  mkdir -p layouts/${LANGUAGE} && \
  cp -a themes/sti/layouts/* layouts/${LANGUAGE}
}

copy_content_pages() {
  echo "copying default content (en)... (to \"./content/${LANGUAGE}\")"
  mkdir -p content/${LANGUAGE} && \
  cp -a content/en/* content/${LANGUAGE}
}

create_config_file && copy_layouts && copy_content_pages
