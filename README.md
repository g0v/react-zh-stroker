# seed -- the seed for Jade, Stylus, LiveScript and React apps

This project is an application skeleton for anyone who loves Jade, Stylus, LiveScript and React.

## Usage

```bash
npm install
npm start
```

## Layout

```
# all of the sources
src/
  app/
    *.ls
    *.styl
  index.ls
  index.jade

# all of the files which are created and watched by gulp
# so you can host them with gh-pages
dist/
  **/*.css
  **/*.js
  index.js
bundle.js
index.html
```
