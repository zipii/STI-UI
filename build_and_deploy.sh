#!/usr/bin/env bash
set -e

SITE_ENV="$1"
USER_AT_REMOTE_DIRECTORY="$2"

if [ -z "$USER_AT_REMOTE_DIRECTORY" ] && [ "$SITE_ENV" != "git" ] && [ "$SITE_ENV" != "production" ] && [ "$SITE_ENV" != "staging" ]
then
  echo "./build_and_deploy.sh [production|staging|git] [user@hostname:/example_directory]"
  exit 1
fi

build() {
  # build assets
  cd themes/sti || exit
  npm run build

  # build markup
  cd - || exit
  for CONFIG in ./config_??.yaml
  do
    hugo --config "$CONFIG"
  done

  # i18n hugo workaround: copy assets to root of /public
  find themes/sti/static/* -type d -maxdepth 0 -exec cp -av {} public \;

  if [ "$SITE_ENV" = "production" ]
  then
    # delete static questionnaire examples
    find -type d -name "public/step-?" -exec rm -rf {} \;
  fi
}

deploy() {
  # deploy but exclude deletion of counter
  rsync -av public/ "$USER_AT_REMOTE_DIRECTORY" --delete --exclude=counter
}

clean() {
  rm -rf public/
}

# build && deploy && clean

if [ "$SITE_ENV" == "git" ]
then
  build
  exit 0
fi

build && deploy && clean
