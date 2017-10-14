const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
const clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

const commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

module.exports = [
  {
    entry: './src/server/app.js',
    output: {
      path: path.resolve(__dirname,'.'),
      filename: 'server.js',
      publicPath: path.resolve(__dirname,'.')
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      fs: 'empty'
    },
    externals: [nodeExternals()],
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ].concat(commonLoaders)
    }
  },
  {
    entry: './src/client/index.js',
    output: {
      path: path.resolve(__dirname,'public'),
      publicPath: path.resolve(__dirname,'public'),
      filename: 'bundle.js'
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin('index.css', {
        allChunks: true
      })
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader')
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
];
