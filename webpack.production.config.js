var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  devtool: 'source-map',
  entry:  './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders : [
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!stylus-loader"),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

module.exports = config;
