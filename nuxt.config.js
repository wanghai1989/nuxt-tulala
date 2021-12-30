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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet',href:'https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/theme/default/layer.min.css'}, 
      {rel:'stylesheet',href:'https://cdn.bootcdn.net/ajax/libs/Swiper/4.5.0/css/swiper.min.css'} 
    ],
    script: [
    	{ src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js' },
      { src: 'https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/layer.min.js', ssr: false },
      { src: 'https://cdn.bootcdn.net/ajax/libs/Swiper/4.5.0/js/swiper.min.js',ssr:false}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{src:'~assets/less/public.less',lang:'less'}],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~plugins/layui.js', ssr: false},
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
    analyze: true, 	
    assetFilter: function(assetFilename) {	    		
      return assetFilename.endsWith('.js');	    	
    },
    postcss:{

    },
    optimization: {
      splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 6,
          maxInitialRequests: 4,
          automaticNameDelimiter: '~',
          cacheGroups: {
              vendors: {
                  name: `chunk-vendors`,
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  chunks: 'all'
              },
            //   element: {
            //     chunks: 'all',
            //     name: `vue-datepicker`,
            //     test: /[\\/]vue-datepicker[\\/]/,
            //     priority: 0,
            // },
              common: {
                  name: `chunk-common`,
                  minChunks: 2,
                  priority: -20,
                  chunks: 'initial',
                  reuseExistingChunk: true
              }
          }
      },
      // vendors:['axios']
  },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'async', //只提取异步加载的模块出来打包到一个文件中
    //     name:'common',
    //     minSize: 10000,
    //     maxSize: 100000, //把提取出来的模块打包生成的文件大小不能超过maxSize值
    //     minChunks:1,  //表示要被提取的模块最小被引用次数,超过或等于才能被引用
    //     automaticNameDelimiter: '.',
    //     cacheGroups: {  //核心，配置提取模块的方案
    //       vendors: {  
    //         test: /[\\/]node_modules[\\/]/, //只筛选从node_modules文件夹下引入的模块， 用来匹配要提取的模块的资源路径或名称。
    //         priority: -10,  //如果有一个模块满足了多个缓存组的条件就会去按照权重划分，谁的权重高就优先按照谁的规则处理
    //         chunks: 'initial' //提取同步加载和异步加载模块
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
    
    extractCSS: true
  },  
  dev: { // dev 环境
    cssSourceMap: true //开启    是否开启 cssSourceMap默认为false
  },
  loading:{  //加载异步页面的样式
    color:"#3ebb2b"
  }, 
  router:{
      // extendRoutes(routes, resolve) {
      //   routes.length = 0 ,
      //   routes.push({
      //     path: '/',
      //     name: 'index',
      //     component: resolve(__dirname, 'pages/index.vue')
      //   },{
      //     path: '/about/about-us',
      //     name: 'about',
      //     component: resolve(__dirname, 'pages/about/index.vue')
      //   })
      // },
    middleware:'index'  //中间件js名字要对应
  }
}
