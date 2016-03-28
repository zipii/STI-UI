#!/usr/bin/env sh

set -e -x

LANGUAGE=$(echo ${1} | tr '[:upper:]' '[:lower:]')
BASE_URL=beta.savetheinternet.eu

create_config_file() {
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
  mkdir layouts/${LANGUAGE} && \
  cp -a themes/sti/layouts/* layouts/${LANGUAGE}
}

copy_content_pages() {
  mkdir content/${LANGUAGE} && \
  cp -a content/en/* content/${LANGUAGE}
}

create_config_file
copy_layouts
copy_content_pages
