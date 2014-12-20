require! {
  'path'
  'nib'
  'webpack'
  'webpack-dev-server': WebpackDevServer
  'gulp'
  'gulp-util': gutil
  'gulp-livescript': livescript
  'gulp-stylus': stylus
  'gulp-jade': jade
}

# http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
#Error.stackTraceLimit = Infinity

options =
  src:   path.resolve './src'
  dist:  path.resolve './dist'
  build: path.resolve '.'

gulp.task \js ->
  gulp
    .src "#{options.src}/**/*.ls"
    .pipe livescript!
    .pipe gulp.dest options.dist

gulp.task \css ->
  gulp
    .src "#{options.src}/**/*.styl"
    .pipe stylus use: [nib!]
    .pipe gulp.dest options.dist

gulp.task \compile <[js css]>

gulp.task \webpack <[compile]> ->
  port = 8080
  host = 'localhost'
  config =
    entry:
      * "webpack-dev-server/client?http://#host:#port"
      * 'webpack/hot/dev-server'
      * './dist/main.js'
    output:
      path: __dirname # required for webpack-dev-server
      filename: 'bundle.js'
      publicPath: '/'
    plugins:
      * new webpack.HotModuleReplacementPlugin
      ...
    module:
      loaders:
        * test: /\.css$/ loader: \style!css
        * test: /\.js$/  loader: \react-hot
        ...
  webpack config
  server = new WebpackDevServer do
    webpack config
    publicPath: config.output.publicPath
    hot: true
  server.listen port, host, (err) ->
    throw gutil.PluginError '[webpack-dev-server]', err if err
    gutil.log "Listening at #host:#port"

gulp.task \html ->
  gulp
    .src "#{options.src}/*.jade"
    .pipe jade!
    .pipe gulp.dest options.build

gulp.task \watch <[html webpack]> ->
  gulp
    ..watch "#{options.src}/**/*.ls"    <[compile]>
    ..watch "#{options.src}/**/*.styl"  <[compile]>
    #..watch "#{options.src}/*.jade"     <[html]>

gulp.task \default <[watch]>
