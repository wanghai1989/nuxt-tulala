var webpack = require('webpack');
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '图啦啦91tula.com_png元素背景图片模板素材摄影图免费下载,设计师在线接单，做设计不用愁！',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '图啦啦是专门针对设计师打造的一个素材分享、在线接单综合型平台，找素材就上图啦啦，在线接单就上图啦啦，百万精品图片等您下载！' },
      { hid:'keywords', name: 'keywords', content: '图啦啦,免抠图,png,png图片,png素材,png图标,banner,背景图片,背景素材,淘宝素材,海报背景,海报,素材网,图库素材,图片,办公文档,办公,摄影图,图库,背景,素材,图啦啦' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
    	{ src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{
    src:'~assets/less/public.less',
    lang:'less'
  }],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/layui.js', ssr: false},
    {src: '~plugins/common.js', ssr: false},
    {src: '~plugins/route.js',ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

   // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
    // 开启打包分析
    // analyze: true, 	
    // assetFilter: function(assetFilename) {	    		
    //   return assetFilename.endsWith('.js');	    	
    // },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'async', 
    //     name:'common',
    //     automaticNameDelimiter: '.',
    //     cacheGroups: {
    //       vendors: {  
    //         test: /[\\/]node_modules[\\/]/, //只筛选从node_modules文件夹下引入的模块，
    //         priority: 1  //如果有一个模块满足了多个缓存组的条件就会去按照权重划分，谁的权重高就优先按照谁的规则处理
    //       },
    //       default: {   //（注意default不是从node_modules里面引入的，是我下载到本地的）
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   },
    //   runtimeChunk: {  //解决浏览器长缓存问题
    //     name: entrypoint => `manifest.${entrypoint.name}`
    //   }
    // },
    
    extractCSS: true,
    // extractCSS: { allChunks: true },
    
  
    //  optimization: {
    //                 splitChunks: {
    //                  minSize: 10000,
    //                   maxSize: 250000
    //                 }
    //           }
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push()
    //   }
    //   config.resolve.alias['$json'] = path.resolve(__dirname, 'static/json')
    // }
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //         '$' : 'jquery' 
  //     })
  // ]
    // loaders:[
    //   {
    //     test:/\.(png|jpe?g|gif|svg)$/,
    //     loader:"url-loader",
    //     query:{
    //       limit:10000,
    //       name:'img/[name].[hash].[ext]'
    //     }
    //   }
    // ]
  },  
  dev: { // dev 环境
    cssSourceMap: true //开启    是否开启 cssSourceMap默认为false
  },

  loading:{  //加载异步页面的样式
    color:"#3ebb2b"
  }, 
  router:{
    middleware:'index'  //中间件js名字要对应
  }
}
