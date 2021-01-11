var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

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
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname, './src'),
        path.join(__dirname, './node_modules')
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer],
          },
        },
      ]
    }]
  },
}
