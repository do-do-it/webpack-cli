const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const utils = require('./toolkit/utils')

const entries = utils.getEntry(path.join(__dirname, '../src/pages/'))
const pages = utils.getPage(path.join(__dirname, '../src/pages/'))

const envConfig = process.env.NODE_ENV === 'dev' ? require('./dev.js') : require('./prod.js')
const coms = {
    'common/base': path.join(__dirname, '../src/common/js/base.js'),
}
for (const key in coms) {
    if (coms.hasOwnProperty(key)) {
        entries[key] = coms[key];
    }
}

const config = {
    entry: entries,
    mode: process.env.NODE_ENV,
    plugins: [new CleanWebpackPlugin(path.join(__dirname, '../dist/'), {
        root: path.join(__dirname, '../'),
        verbose: false,
        dry: false
    })].concat(pages)
}

//console.log(pages)
module.exports = config