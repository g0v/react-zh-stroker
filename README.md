# jsl-seed -- the seed for Jade, Stylus, LiveScript apps

This project is an application skeleton for anyone who loves Jade, Stylus and LiveScript.

## Usage

```bash
npm install
npm start
```

## Layout

```
# all of the sources
src/
  stylus/
    *.styl
  ls/
    *.ls
  *.jade

# all of the files which are created and watched by gulp
# you can host them with gh-pages
dest/
  **/*.css
  **/*.js
  main.js
build.js
*.html    # from src/index.jade
```
