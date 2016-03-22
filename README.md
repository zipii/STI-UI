# STI-UI

## Build process

### HTML

+ Download and install [hugo](https://github.com/spf13/hugo/releases).
+ Continuously build and watch for development (builds to development server
  cache):
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
hugo --config config_de.yaml
```

### Deployment

Run full build for production (updates `/public`):

```
cd /STI-UI
./build.sh
```

*! This is an important last step before deploying as it provides all assets through the root url path until Hugo provides a better solution natively !*

## Translations

+ Copy the English config and rename it correspondingly (i.e. `config_it.yaml` for Italian):
```
cp config_en.yaml config_[TWO_LETTER_CODE].yaml
```

### Layouts / Homepage

The homepage itself is translatable in HTML form via layouts / layout partials only.

+ Change all locale/language related fields in the new config file.
+ Copy the English `layout` files as the base for your layout translation (layout files in the root `layouts` directory overrule any corresponding layout file from `themes/sti/layouts`):
```
mkdir layouts/[TWO_LETTER_CODE]
cp themes/sti/layouts/* layouts/[TWO_LETTER_CODE]
```

### Content / Content Subpages

We need a consistent `content` files structure in order for Hugo to generate the corresponding URL paths. *Most of the `content` files are stubs only* but an example for a pure content based page is [FAQ](https://github.com/Netzfreiheit/STI-UI/blob/master/content/en/faq/index.md).
All files in `content` should be written in [Markdown](https://en.wikipedia.org/wiki/MarkdownContent).
Files in the root `content` directory overrule any corresponding content file from `themes/sti/content`.
+ Copy the English `content` files as the base for your content translation:
```
mkdir content/[TWO_LETTER_CODE]
cp content/en/* content/[TWO_LETTER_CODE]
```

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
