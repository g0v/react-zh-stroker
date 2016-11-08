var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, './src/main'),
  output: {
    path: __dirname,
    filename: 'react-zh-stroker.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        warnings: false
      }
    })
  ],
  resolve: {
    alias: {
      'react-zh-stroker': path.join(__dirname, '../../')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: [
        path.join(__dirname, './src'),
        path.join(__dirname, './node_modules')
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  }
}
