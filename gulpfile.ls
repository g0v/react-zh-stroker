require! <[gulp gulp-concat nib]>
connect    = require \gulp-connect
gutil      = require \gulp-util
webpack    = require \gulp-webpack
livescript = require \gulp-livescript
stylus     = require \gulp-stylus
jade       = require \gulp-jade

path =
  src:   './src'
  dest:  './dest'
  build: '.'

gulp.task \js ->
  gulp
    .src "#{path.src}/ls/**/*.ls"
    .pipe livescript!
    .pipe gulp.dest "#{path.dest}/"
    .pipe connect.reload!

gulp.task \css ->
  gulp
    .src "#{path.src}/stylus/**/*.styl"
    .pipe stylus use: [nib!]
    .pipe gulp.dest "#{path.dest}/"
    .pipe connect.reload!

gulp.task \compile <[js css]>

gulp.task \webpack <[compile]> ->
  gulp
    .src "#{path.dest}/main.js"
    .pipe webpack do
      context: "#{path.dest}/"
      output:
        filename: 'build.js'
      module:
        loaders:
          * test: /\.css$/ loader: \style!css
          ...
    .pipe gulp.dest "#{path.build}/"
    .pipe connect.reload!

gulp.task \html ->
  gulp
    .src "#{path.src}/*.jade"
    .pipe jade!
    .pipe gulp.dest "#{path.build}"
    .pipe connect.reload!

gulp.task \build <[webpack html]>

gulp.task \watch <[build]> ->
  gulp
    ..watch "#{path.src}/ls/**/*.ls"    <[webpack]>
    ..watch "#{path.src}/stylus/**/*.styl"  <[webpack]>
    ..watch "#{path.src}/*.jade"     <[html]>

gulp.task \server <[watch]> ->
  connect.server do
    root: path.build
    livereload: on

gulp.task \default <[server]>
