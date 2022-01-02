<template>
<div>
   这是我的首页

   <!-- <button @click="getShareInfo('标题','aa')">微信分享</button> -->
</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
   layout: 'mobile',
components: {},
mounted(){
  // this.getShareInfo('我这是标题','bb')
   this.wxShare(
      {
        title: 'title',
        desc: 'desc',
        link: 'shareData.url',
        imgUrl: 'shareData.image'
      },
      'https://www.jianshu.com/p/840169ba92e6'
    )
},
computed:{
	  ...mapState(['wxshare'])
  },
 methods: {
      // ...mapActions({
      //     'shareSdk':'shareSdk'
      // }),
//    async getShareInfo(tit,fxUrl){//如果分享的内容会根据情况变化，那么这里可以传入分享标题及url
//      let formDatas = new FormData();
// 		    formDatas.append('url', 'http://www.91tula.com/m/mobile-register');
//         await this.shareSdk(formDatas);//这里我写了一个公用的接口请求js，这里正常axios请求就可以，只要拿到数据都可以
          
//             console.log('res',this.wxshare)
          
//             // localStorage.setItem("jsapi_ticket", res.jsapi_ticket);
//             //拿到后端给的这些数据
//             let appId = this.wxshare.appId;
//             let timestamp = this.wxshare.timestamp;
//             let nonceStr = this.wxshare.noncestr;
//             let signature = this.wxshare.signature;
           
//             wx.config({
//               debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//               appId: appId,         // 必填，公众号的唯一标识，填自己的！
//               timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
//               nonceStr: nonceStr,   // 必填，生成签名的随机串
//               signature: signature, // 必填，签名，见附录1
//               jsApiList: [
//                 'onMenuShareTimeline',
//                 'onMenuShareAppMessage'
//               ]
//             })
            
//             wx.ready(function () {
//                 //分享到朋友圈
//                 wx.onMenuShareTimeline({
//                   title: tit,   // 分享时的标题
//                   link: fxUrl,     // 分享时的链接
//                   imgUrl: _this.pic,    // 分享时的图标
//                   success: function () {
//                     console.log("分享成功");
//                   },
//                   cancel: function () {
//                     console.log("取消分享");
//                   }
//                 });
//                 //分享给朋友
//                 wx.onMenuShareAppMessage({
//                   title: tit,
//                   desc: '这件商品终于优惠了，每件只需100元', 
//                   link: fxUrl,
//                   imgUrl: _this.pic,
//                   type: '',
//                   dataUrl: '', 
//                   success: function () {
//                     console.log("分享成功");
//                   },
//                   cancel: function () {
//                     console.log("取消分享");
//                   }
//                 });
// })
//  }
 }}
</script>
<style lang="less" scoped>
</style>