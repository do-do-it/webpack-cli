/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConf = require('./base.conf');


Object.keys(webpackBaseConf.entry).forEach(function(name){
  webpackBaseConf.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(webpackBaseConf.entry[name]);
});
const webpackConfig = merge(webpackBaseConf,{
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 报错停止编译
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin() // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
  ]
});

module.exports = webpackConfig;