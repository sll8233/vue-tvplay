module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 'http://api.jiaodong.net/ytnews'
        // target: 'https://www.baidu.com/',
        // target: 'http://wx.jiaodong.net/hd/2020/315/ytgdzk/index.php',
        target: 'http://api.jiaodong.net/ytnews',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

