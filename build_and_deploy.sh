#!/usr/bin/env sh
set -e

SITE_ENV="$1"
USER_AT_REMOTE_DIRECTORY="$2"

if [ -z "$USER_AT_REMOTE_DIRECTORY" ] && [ "$SITE_ENV" != "local" ] && [ "$SITE_ENV" != "production" ] && [ "$SITE_ENV" != "staging" ]
then
  echo "./build_and_deploy.sh [production|staging|local] [user@hostname:/example_directory]"
  exit 1
fi

log() {
  echo ""
  echo "# $1"
  echo "================================================================================"
}

build() {
  log "building client side assets..."
  cd themes/sti || exit
  npm run build >/dev/null 2>&1

  log "building markup..."
  cd - || exit >/dev/null 2>&1
  for LANGUAGE in $(cat ./active_languages.conf)
  do
    log "language: ${LANGUAGE}"
    hugo --config "./config_${LANGUAGE}.yaml"
  done

  log "copying assets to root of ./public directory... (hugo i18n workaround)"
  find themes/sti/static/* -type d -maxdepth 0 -exec cp -av {} public \; >/dev/null 2>&1

  if [ "$SITE_ENV" = "production" ]
  then
    log "deleting static questionnaire examples..."
    find public/ -type d -name "public/step-*" -exec rm -rf {} \;
  fi
  ls -l ./public
}

deploy() {
  # deploy but exclude deletion of counter
  log "deploying... ($USER_AT_REMOTE_DIRECTORY)"
  rsync -av public/ "$USER_AT_REMOTE_DIRECTORY" --force --delete --exclude=counter
}

clean() {
  log "cleaning... (deleting ./public)"
  rm -rf public/
}

# just build locally (./public)
if [ "$SITE_ENV" = "local" ]
then
  build
  exit 0
fi

# default build and deploy
build && deploy && clean
