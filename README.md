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

## Build & Deploy

__*Please refrain from building this for translation purposes, the only things needed for doing translations are the listed steps from above.*__

Run without parameters to see usage of build & deploy script:

```
cd /STI-UI
./build_and_deploy.sh
```
