import Vue from 'vue'
import axios from 'axios'  // 如nuxt已经集成了axios 此处可以去掉
import wx from 'weixin-js-sdk'

Vue.prototype.$axios = axios // 如nuxt已经集成了axios 此处可以去掉
Vue.prototype.$wechat = wx

const wechatShare = {
  install(Vue) {
    Vue.prototype.wxShare = function(shareData, url) {
      this.$axios
        .post('http://www.91tula.top/api/wechat/getJsSdkConfig', 
          // 请求配置
           {
            url: 'http://www.91tula.com/m/mobile-register'  // 根据后台配置填写
          }
        )
        .then(res => {
        console.log(res.data.data)
          const Data = res.data.data
          this.$wechat.config({
            debug: false,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
          })
        })
      this.$wechat.ready(() => {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        //分享到朋友圈
        this.$wechat.onMenuShareTimeline({
            title: '这是标题',   // 分享时的标题
            link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
            imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
            success: function () {
              console.log("分享成功");
            },
            cancel: function () {
              console.log("取消分享");
            }
          });
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
         //分享给朋友
         this.$wechat.onMenuShareAppMessage({
            title: '这是标题',
            desc: '这件商品终于优惠了，每件只需100元', 
            link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
            imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
            type: '',
            dataUrl: '', 
            success: function () {
              console.log("分享成功");
            },
            cancel: function () {
              console.log("取消分享");
            }
          });
      })
    }
  }
}

Vue.use(wechatShare)