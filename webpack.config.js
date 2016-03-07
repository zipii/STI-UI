// var StaticWebpackPlugin = require('static-webpack-plugin');
var AddCSSToHeadPlugin  = require('add-css-to-head-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  entry: {
    static: __dirname + '/static.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    libraryTarget: 'umd',
    filename: 'static.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      { test: /\.yml$/,  loader: 'json!yaml' },
      { test: /\.css$/,  loader: 'raw' },
      { test: /\.scss$/, loader: 'style!css!sass!' },
      { test: /\.md$/,   loader: 'markdown-with-front-matter' }
    ]
  },
  devServer: { contentBase: './build' },
  plugins: [
    // new StaticWebpackPlugin('static'),
    new StaticSiteGeneratorPlugin('static'),
    new AddCSSToHeadPlugin({ amp: true })
  ]
};
