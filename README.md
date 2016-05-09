# STI-UI

Frontend code for [savetheinternet.eu](https://savetheinternet.eu)

## Translations

The content files for each language (based on the English originals) can be found here:

```
./content/site/[TWO_LETTER_CODE]/
```

Example - content files for English site:

```
content/site/en
├── config.yml
├── faq
│   └── index.md
└── index.md
```

### Set language to be ready for building (and deployment)

To mark certain languages ready to be built (and deployed) add the
corresponding two-letter-codes as a new line in:

```
./translations-ready.yml
```

## Build process

### HTML

+ Download and install ruby 2.3.0
+ Install ruby dependencies:
```
cd /STI-UI
bundle install
```
+ Build locally (or for production):
```
cd /STI-UI
./build_html.rb
```

### Assets

+ Download and install [node.js v5.7.1](https://nodejs.org/download/release/v5.7.1/) via the official installer or via [nodenv](https://github.com/nodenv/nodenv) (we use 5.7.1 [locally](https://github.com/nodenv/nodenv#nodenv-local) in `themes/sti`).
+ Install node.js dependencies:
```
cd /STI-UI
npm install
```
+ Continuously build and watch for development:
```
cd /STI-UI
npm start
```
+ Build for production:
```
cd /STI-UI
npm run build
```

### Deployment

Run without parameters to see usage of deploy script:

```
cd /STI-UI
./build_and_deploy.sh
```
