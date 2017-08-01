'use strict'

const webpack = require('webpack')
const common = require('./common')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: common.entry,

  output: common.output,

  plugins: [
    new CleanPlugin(['dist'], {
      root: common.paths.root
    }),

    new ExtractTextPlugin({
      filename: 'style.css'
    }),

    new webpack.DefinePlugin({
      'proccess.env': {
        'NODE_ENV': '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress:
      { warnings: false }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  module: {
    rules: [
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      Object.assign({}, common.cssLoader, {
        use: ExtractTextPlugin.extract({
          fallback: common.cssLoader.use[0],
          use: common.cssLoader.use.slice(1)
        })
      }),
      common.cssLoaderUseable
    ]
  },

  resolve: common.resolve

}
