#!/usr/bin/env sh

# build assets

cd themes/sti || exit
npm run build

# build markup

cd - || exit
for CONFIG in ./config_??.yaml
do
  hugo --config "$CONFIG"
done

# i18n hugo workaround: copy assets to root and delete from countries

find themes/sti/static -type d -maxdepth 1 -exec cp -av {} public \;
