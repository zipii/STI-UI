# STI-UI

## Build process

Hugo shall be executed in root and builds everything to ./public
Gulp shall be executed in themes/sti and build everything to themes/sti/static

### Install Hugo

+ Download [hugo](https://github.com/spf13/hugo/releases)
+ Cp to /usr/sbin/local, add to PATH or just don't
+ Run with `hugo server`

### Install gulp

+ Go to themes/sti
+ npm install
+ run with `npm run-script gulp`


## Questionnaire specifics

All questionnaire templates needed for inclusion in the backend can be found here:

```
public
├── step-1
├── step-2
├── step-3
├── step-4
```

All additional assets should plainly be copied in the corresponding public path
of the backend server:

```
public
├── fonts
├── images
├── javascripts
└── stylesheets
```
