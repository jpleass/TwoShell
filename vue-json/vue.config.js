const php = require('php-server')
const fs = require('fs-extra')
const kirby = require('../kirby.config')

if (process.env.NODE_ENV === 'development' && kirby.serve) kirby.start(php)
if (process.env.NODE_ENV === 'production' && kirby.inject) kirby.clean(fs)

fs.removeSync('dist')

module.exports = {
  ...(kirby.inject
    ? {
        outputDir: kirby.base,
        assetsDir: kirby.assetsDir,
        indexPath: kirby.indexPath
      }
    : {}),
  publicPath: process.env.VUE_APP_BASE_URL,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/*.json': {
        target: process.env.VUE_APP_KIRBY_URL,
        pathRewrite: { [process.env.VUE_APP_BASE_URL]: '/' }
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
