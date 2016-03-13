#!/usr/bin/env sh

if [ which bundle -a which middleman ]; then
  echo "Building templates pre-commit."
  bundle exec middleman build
elif
  echo "Not able to build templates pre-commit but committing anyway."
fi
