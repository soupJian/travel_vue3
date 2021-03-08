module.exports = {
  devServer: {
    proxy: {
      '/api': {
          target: 'http://www.soupjian.work:8888/api',   // 需要请求的地址
          ws: true,
          secure: false,
          changeOrigin: true,  // 是否跨域
          pathRewrite: {
              '^/api': ''
          }
      }
    }  // 配置多个代理
  }
}