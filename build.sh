#!/usr/bin/env sh

set -e

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
