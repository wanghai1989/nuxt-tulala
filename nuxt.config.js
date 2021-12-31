var webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
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
    	{ src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js', ssr: false },
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
    // analyze: true, 	
    // assetFilter: function(assetFilename) {	    		
    //   return assetFilename.endsWith('.js');	    	
    // },
    cssSourceMap: true,
    plugins: [
                new CompressionPlugin({
                  test: /\.js$|\.html$|\.css/, // 匹配文件名
                  threshold: 10240, // 对超过10kb的数据进行压缩
                  deleteOriginalAssets: false // 是否删除原文件
                })
              ],
    // optimization: {
    //   splitChunks: {
    //     minSize: 10000,
    //     maxSize: 250000
    //   }
    // },
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
