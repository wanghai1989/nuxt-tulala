<template>
<div class="m-container">
   <activeInvite></activeInvite>
</div>
</template>
<script>
import activeInvite from '~/components/mobile/active-invite.vue'
import { mapActions} from 'vuex'
export default {
components: {activeInvite},
 mounted(){
      this.wxShareCheck()
  },
methods:{
    ...mapActions({
          'shareSdk':'shareSdk'
      }),

    //检查是否是微信端，是微信端则调用微信分享功能
    wxShareCheck:function(){
        let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.getWxShare()
        }        
    },
     //微信分享功能调用
    getWxShare:function(){
         let params={
          'url':'http://www.91tula.com/m/mobile-register'
        }
       this.shareSdk(params).then(res=>{
                let wxInfo=res.data
                alert(wxInfo.appId)
                wx.config({
                    debug: false, // 是否开启调试模式
                    appId: wxInfo.appId, //appid:需与公众号一致
                    timestamp: wxInfo.timestamp, // 时间戳
                    nonceStr: wxInfo.nonceStr, // 随机字符串
                    signature: wxInfo.signature, // 签名
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                    ] // 需要使用的JS接口列表
                })
                wx.ready(()=>{  
                    wx.onMenuShareAppMessage({ 
                        title: '这是标题',   // 分享时的标题
                        desc:'小标签',
                        link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
                        imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
                        success: function () {
                            console.log("成功")
                        },
                        cancel:function(){
                            console.log("取消")
                        }
                    })
                    wx.onMenuShareTimeline({ 
                        title: '这是标题',   // 分享时的标题
                        link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
                        imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
                        success: function () {
                            console.log("成功")
                        },
                        cancel:function(){
                            console.log("取消")
                        }
                    })
                })
                wx.error(function(res){
                    console.log(res.errMsg)
                })
           
        }).catch()
    },
}
  
}
</script>
<style lang="less" scoped>

</style>
