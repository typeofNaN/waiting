const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.main.config')

module.exports = webpackMerge.smart(baseConfig, {
  mode: 'production',
  devtool: false
})
