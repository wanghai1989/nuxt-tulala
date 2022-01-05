<template>
<div class="invite-box">
	<div class="invite01">

	</div>
	<div class="invite02">

	</div>
	<div class="invite03"></div>
	<div class="invite04">
		<nuxt-link class="btn goinvite" to="/"></nuxt-link>
	</div>
  <div class="share">
      <a href="javascript:void(0)" @click="getPromote()">下载邀请海报</a>
      <a href="javascript:void(0)">微信分享</a>
  </div>
	<div class="logo">
		<img src="~/assets/images/logo02.png" />
	</div>
</div>
</template>
<script>
import QRCode from 'qrcode'; 
import processImg from '~/assets/js/processimg'
import {mapState, mapActions} from 'vuex'
export default {
	data () {
    return {
		categoryId:0
    }
  },

	computed:{
	  ...mapState(['personInfo','userToken','baseUrl'])
  },
  created(){
      // this.wxShareCheck()
  },
  mounted(){
      // this.wxShareCheck()
    // if(processImg.is_weixn()){
    //   alert(111)
    //   this.wechatShare()
    // }
    // this.getPromote()
  },
	methods:{
    // ...mapActions({
    //       'shareSdk':'shareSdk'
    //   }),

    //检查是否是微信端，是微信端则调用微信分享功能
    // wxShareCheck(){
    //   this.getWxShare()
    //     let ua = navigator.userAgent.toLowerCase();  
    //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //         this.getWxShare()
    //     }        
    // },
     //微信分享功能调用
//     getWxShare(){
//         // let url =encodeURIComponent(window.location.href.split('#')[0])
//         // console.log(url)
//          let params={
//           'url':'http://www.91tula.com/m/mobile-register'
//         }

//        this.shareSdk(params).then(res=>{
//                 let wxInfo=res.data
//                 wx.config({
//                     debug: false, // 是否开启调试模式
//                     appId: wxInfo.appId, //appid:需与公众号一致
//                     timestamp: wxInfo.timestamp, // 时间戳
//                     nonceStr: wxInfo.nonceStr, // 随机字符串
//                     signature: wxInfo.signature, // 签名
//                     jsApiList: [
//                         'onMenuShareAppMessage',
//                         'onMenuShareTimeline',
//                         'updateAppMessageShareData',
//                         'updateTimelineShareData',
//                     ] // 需要使用的JS接口列表
//                 })
//                 wx.ready(()=>{  
//                     wx.onMenuShareAppMessage({ 
//                         title: '这是标题',   // 分享时的标题
//                         desc:'小标签',
//                         link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
//                         imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
//                         success: function () {
//                             console.log("成功")
//                         },
//                         cancel:function(){
//                             console.log("取消")
//                         }
//                     })
//                     wx.onMenuShareTimeline({ 
//                         title: '这是标题',   // 分享时的标题
//                         link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
//                         imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
//                         success: function () {
//                             console.log("成功")
//                         },
//                         cancel:function(){
//                             console.log("取消")
//                         }
//                     })
//                 })
//                 wx.error(function(res){
//                     console.log(res.errMsg)
//                 })
           
//         }).catch()
//     },

      getPromote:function(){
        // With async/await
          let invitelink=this.baseUrl+'m/mobile-invite?invite_code='+ this.personInfo.invite_code 

          QRCode.toDataURL(invitelink, {
                    type: "image/png", //类型
                    quality: 0.8, //图片质量A Number between 0 and 1
                    width: 140, //高度
                    height: 140, //宽度
                    errorCorrectionLevel: "L", //容错率
                    margin: 1, //外边距
                    color: {
                      dark: "#000000", //前景色
                      light: "#ffffff" //背景色
                    }
                  }).then(imgData => {
                    processImg.drawAndShareImage('/img/personInvite.jpg',imgData) //合成海报
                  })
      },
      
	}
}
</script>

<style lang="less" scoped>

.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
    height: @height;
    line-height: calc(@height - 2px); 
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    width: @width;
    border: 1px solid @bordercolor;
    background: @background;
    color: @color;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
}

.invite-box{min-height: 100vh; background: #fe7845;}
.invite01{background: url(~/assets/images/mobile-invite01.png) no-repeat;width: 100%; height: 1.6rem; background-size: 100% 100%;}
.invite02{background: url(~/assets/images/mobile-invite02.png) no-repeat;width: 100%; height: 1.8rem; background-size: 100% 100%;}
.invite03{background: url(~/assets/images/mobile-invite03.png) no-repeat;width: 100%; height: 1.78rem; background-size: 100% 100%;}
.invite04{background: url(~/assets/images/mobile-invite04.png) no-repeat;width: 100%; height: 0.66rem; background-size: 100% 100%;}
.share{position: fixed; bottom: 0.6rem; left: 0; width: 100%; text-align: center; height: 1.2rem; z-index: 2; padding: 0 .3rem;  box-sizing: border-box; }
.share a{.btn(100%,44px,#ff8016,linear-gradient(90deg, #ff2402 0%, #ff8016 100%),#fff); border-radius: 22px; margin: 7px 0; box-shadow: 1px 2px 3px #bf0001; border: none;}
.logo{position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; height: 0.6rem; z-index: 2; padding: .1rem 0; box-sizing: border-box; background: #fff;}
.logo img{height: 0.4rem;}
</style>