import Vue from 'vue'
import axios from 'axios'  // 如nuxt已经集成了axios 此处可以去掉
import wx from 'weixin-js-sdk'

Vue.prototype.$axios = axios // 如nuxt已经集成了axios 此处可以去掉
Vue.prototype.$wechat = wx

const wechatShare = {
  install(Vue) {
    Vue.prototype.wxShare = function(shareData, url) {
      this.$axios
        .post('https://www.91tula.top/api/wechat/getJsSdkConfig', {
            url:url  // 根据后台配置填写
          })
        .then(res => {
          const Data = res.data.data
          console.log(res.data)
          wx.config({
            debug: true,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          })
        })
      this.$wechat.ready(() => {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        this.$wechat.updateAppMessageShareData({  
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.image,
          success: function() {
            // 设置成功
          },
          cancel: function() {
            console.log('分享取消')
          }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        this.$wechat.updateTimelineShareData({  
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.image,
          success: function() {
            // 设置成功
          },
          cancel: function() {
            console.log('分享取消')
          }
        })
      })
    }
  }
}

Vue.use(wechatShare)