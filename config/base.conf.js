/**
 * webpack基础配置
 */
const path = require('path');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const dir = require('./base/dir');


const entries = utils.getEntry(path.join(__dirname, '../src/pages/'))
const pages = utils.getPage(path.join(__dirname, '../src/pages/'))

const coms = {
  'common/base': path.join(__dirname, '../src/common/js/base.js'),
}
for (const key in coms) {
  if (coms.hasOwnProperty(key)) {
    entries[key] = coms[key];
  }
}

module.exports = {
  entry: entries,
  output: {
    path: dir.dist,
    filename: conf.filename,
    publicPath: conf.publicPath,
  },
  resolve: {
    alias: {
      '@src': path.join(__dirname, '../src')
    }
  },
  stats: "errors-only",
  mode: conf.mode,
  plugins: pages,
  module: require('./base/module.conf')[ENV]
};