# STI-UI

Frontend code for [savetheinternet.eu](https://savetheinternet.eu)

## Translations

### Config File

Please have a quick look at the generated language specific config file here:

```
./config_[TWO_LETTER_CODE].yaml
```

### Layouts / Homepage

The homepage itself is translatable in HTML form via layouts / layout partials only.

The corresponding layout files needed for translation (based on the English originals) will have been created and put here:
```
./layouts/[TWO_LETTER_CODE]/
```

### Content / Content Subpages

We need a consistent `content` files structure in order for Hugo to generate the corresponding URL paths. *Most of the `content` files are stubs only* but an example for a pure content based page is [FAQ](https://github.com/Netzfreiheit/STI-UI/blob/master/content/en/faq/index.md).
All files in `content` should be written in [Markdown](https://en.wikipedia.org/wiki/MarkdownContent).
Files in the root `content` directory overrule any corresponding content file from `themes/sti/content`.

The corresponding content files needed for translation (based on the English originals) will have been created and put here:

```
./content/[TWO_LETTER_CODE]/
```

### Set language to be ready for building (and deployment)

To mark certain languages ready to be built (and deployed) add the
corresponding two-letter-codes as a new line in:

```
./active_languages.conf
```

## Build process

### HTML

+ Download and install [hugo](https://github.com/spf13/hugo/releases).
+ Continuously build and watch for development (builds to development server
  cache; ATTENTION: the path will be absolute in development mode i.e. /faq ):
```
cd /STI-UI
hugo server --config config_[TWO_LETTER_CODE].yaml --verbose
```
+ Build for production (builds to `/public/en`):
```
cd /STI-UI
hugo --config config_[TWO_LETTER_CODE].yaml
```

### Assets

We have adapted the pragmatic [Hugo Skeleton theme](https://github.com/saviomuc/hugo-skeleton) by [Savio van Hoi](https://github.com/saviomuc) which uses [Gulp](http://gulpjs.com) for cross-platform compatible asset building.

+ Change to STI Hugo theme `cd /themes/sti`.
+ Download and install [node.js v5.7.1](https://nodejs.org/download/release/v5.7.1/) via the official installer or via [nodenv](https://github.com/nodenv/nodenv) (we use 5.7.1 [locally](https://github.com/nodenv/nodenv#nodenv-local) in `themes/sti`).
+ Run `npm install`.
+ Continuously build and watch for development (builds to the STI theme's
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
config_[TWO_LETTER_CODE].yaml
```

E.g. build German website to /public/de with:
```
hugo --config config_de.yaml
```

### Deployment

Run without parameters to see usage of deploy script:

```
cd /STI-UI
./build_and_deploy.sh
```

*! This is an important last step before deploying as it provides all assets through the root url path until Hugo provides a better solution natively !*

## Questionnaire specifics

This is about the iFrame included consultation page ("Questionnaire") and the corresponding backend adaptations.

### Backend HTML templates

All questionnaire templates needed for inclusion and adaptation on the backend can either be built locally or viewed and downloaded from staging:

* [Questionnaire Template Step 1](https://beta.savetheinternet.eu/en/step-1)
* [Questionnaire Template Step 2](https://beta.savetheinternet.eu/en/step-2)
* [Questionnaire Template Step 3](https://beta.savetheinternet.eu/en/step-3)
* [Questionnaire Template Step 4](https://beta.savetheinternet.eu/en/step-4)

### Backend Assets

All asset files/directories should be copied verbatim (to the public path of the backend server).
E.g. "fonts" should simply be made accessible from "https://consultation.savetheinternet.eu/fonts" (without language path namespacing).

The asset files can be found in the repository:

```
themes
   └── sti
        └── static
             ├── fonts
             ├── images
             ├── javascripts
             └── stylesheets
```
