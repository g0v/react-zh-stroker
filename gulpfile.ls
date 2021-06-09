require! {
  'path'
  'nib'
  'webpack'
  'webpack-dev-server': WebpackDevServer
  'gulp'
  'gulp-util': gutil
  'gulp-livescript': livescript
  'gulp-stylus': stylus
  'gulp-pug': pug
}

# http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
#Error.stackTraceLimit = Infinity

options =
  src:   path.resolve './examples/main'
  dist:  path.resolve '.'
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
    mode: 'development'
    devtool: 'source-map'
    entry:
      * 'react-hot-loader/patch'
      * "webpack-dev-server/client?http://#host:#port"
      * 'webpack/hot/dev-server'
      * './main.js'
    output:
      path: __dirname # required for webpack-dev-server
      filename: 'bundle.js'
      publicPath: '/'
    resolve:
      fallback:
        stream: require.resolve('stream-browserify')
        buffer: require.resolve('buffer')
    plugins:
      * new webpack.HotModuleReplacementPlugin
      ...
    module:
      rules:
        * test: /\.css$/ use: \style-loader!css
        ...
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
    .pipe pug!
    .pipe gulp.dest options.build

gulp.task \watch <[html webpack]> ->
  gulp
    ..watch "#{options.src}/**/*.ls"    <[compile]>
    ..watch "#{options.src}/**/*.styl"  <[compile]>
    ..watch "#{options.src}/*.pug"      <[html]>

gulp.task \default <[watch]>
