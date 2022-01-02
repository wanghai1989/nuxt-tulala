/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
 import wx from 'weixin-js-sdk'
 import Axios from 'axios'
 const wxApi = {
     /**
      * [wxRegister 微信Api初始化]
      * @param  {Function} callback [ready回调函数]
      */
     wxRegister(data,option) { //data是微信配置信息，option是分享的配置内容
         wx.config({
             debug: false, // 开启调试模式
             appId: data.appId, // 必填，公众号的唯一标识
             timestamp: data.timestamp, // 必填，生成签名的时间戳
             nonceStr: data.nonceStr, // 必填，生成签名的随机串
             signature: data.signature, // 必填，签名，见附录1
             jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
             ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
         })
         wx.ready(function(){
                //分享到朋友圈
                wx.onMenuShareTimeline({
                  title: tit,   // 分享时的标题
                  link: fxUrl,     // 分享时的链接
                  imgUrl: _this.pic,    // 分享时的图标
                  success: function () {
                    console.log("分享成功");
                  },
                  cancel: function () {
                    console.log("取消分享");
                  }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                  title: tit,
                  desc: '这件商品终于优惠了，每件只需100元', 
                  link: fxUrl,
                  imgUrl: _this.pic,
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
 export default wxApi