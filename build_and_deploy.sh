#!/usr/bin/env sh
set -e

SITE_ENV="$1"
USER_AT_REMOTE_DIRECTORY="$2"

if [ -z "$USER_AT_REMOTE_DIRECTORY" ] && [ "$SITE_ENV" != "local" ] && [ "$SITE_ENV" != "production" ] && [ "$SITE_ENV" != "staging" ]
then
  echo "./build_and_deploy.sh [production|staging|local] [user@hostname:/example_directory]"
  exit 1
fi

build() {
  echo "building client side assets..."
  cd themes/sti || exit
  npm run build

  echo "building markup..."
  cd - || exit
  for CONFIG in ./config_??.yaml
  do
    hugo --config "$CONFIG"
  done

  echo "copying assets to root of ./public directory... (hugo i18n workaround)"
  find themes/sti/static/* -type d -maxdepth 0 -exec cp -av {} public \;

  if [ "$SITE_ENV" = "production" ]
  then
    echo "deleting static questionnaire examples..."
    find public/ -type d -name "public/step-*" -exec rm -rf {} \;
  fi
}

deploy() {
  # deploy but exclude deletion of counter
  echo "deploying... ($USER_AT_REMOTE_DIRECTORY)"
  rsync -av public/ "$USER_AT_REMOTE_DIRECTORY" --delete --exclude=counter
}

clean() {
  echo "cleaning... (deleting ./public)"
  rm -rf public/
}

# just build locally (./public)
if [ "$SITE_ENV" == "local" ]
then
  build
  exit 0
fi

# default build and deploy
build && deploy && clean
