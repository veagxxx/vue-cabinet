var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    // 设置代理
    proxy: { 
      '/': {
        target: 'http://localhost:8090', // 请求目标服务器接口
        changeOrigin: true, // 请求头的 host 为 target
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  // vue-cli 为项目设置别名 
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
  },
}