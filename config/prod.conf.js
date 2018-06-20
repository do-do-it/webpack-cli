/**
 * 生产环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dir = require('./base/dir');
const webpackBaseConf = require('./base.conf');

const webpackConfig = merge(webpackBaseConf,{
  plugins: [
    new CleanWebpackPlugin(dir.dist, {
      root: dir.root,
      verbose: false,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin() // 用在生产模式
  ]
});
module.exports = webpackConfig;