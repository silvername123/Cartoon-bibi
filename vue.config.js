module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'scr': '@/scr',
        'api': '@/api',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
      }
    }
  },
  publicPath: "/",
  lintOnSave: false // 关闭 eslint 检查
}