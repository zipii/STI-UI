# STI-UI

## Build process

### HTML

+ Download and install [hugo](https://github.com/spf13/hugo/releases).
+ Continuously build and watch for development (builds to development server
  cache):
```
cd /STI-UI
hugo server --config config_en.yaml --verbose
```
+ Build for production (builds to `/public/en`):
```
cd /STI-UI
hugo --config config_en.yaml
```

### Assets

We have adapted the pragmatic [Hugo Skeleton theme](https://github.com/saviomuc/hugo-skeleton) by [Savio van Hoi](https://github.com/saviomuc) which uses [Gulp](http://gulpjs.com) for cross-platform compatible asset building.

+ Change to STI Hugo theme `cd /themes/sti`.
+ Download and install [node.js v5.7.1](https://nodejs.org/download/release/v5.7.1/) via the official installer or via [nodenv](https://github.com/nodenv/nodenv) (we use 5.7.1 [locally](https://github.com/nodenv/nodenv#nodenv-local) in `themes/sti`).
+ Run `npm install`.
+ Continously build and watch for development (builds to the STI theme's
  `static` directory; Hugo picks this up for now and will use it within `/public`):
```
cd /STI-UI/themes/sti
npm start
```
+ Build for production:
```
cd /STI-UI/themes/sti
npm run build
```

### Internationalisation

Different languages have different root config files:
```
config_[two_letter-code].yaml
```

E.g. build German website to /public/de with:
```
hugo --config config_de.yml
```

### Deployment

Run full build for production (updates `/public`):

```
cd /STI-UI
./build.sh
```

*! This is an important last step before deploying as it provides all assets through the root url path until Hugo provides a better solution natively !*

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
