# STI-UI

## Build process

Hugo shall be executed in root and builds everything to ./public
Gulp shall be executed in themes/sti and build everything to themes/sti/static

### Install npm

We are using nodeenv to virtualize the node environment.

``` bash
sudo pip install nodeenv # for global install
nodeenv --node=5.7.1 <your env directory>
<your env directory>/bin/activate
cd themes/sti
npm install
```

### Install Hugo

+ Download [hugo](https://github.com/spf13/hugo/releases)
+ Cp to /usr/sbin/local, add to PATH or just don't
+ Run with `hugo server --verbose`

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
