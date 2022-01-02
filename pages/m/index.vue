<template>
<div>
   这是我的首页

   <button @click="getShareInfo('标题','aa')">微信分享</button>
</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
   layout: 'mobile',
components: {},
mounted(){
  this.getShareInfo('我这是标题','bb')
},

 methods: {
      ...mapActions({
          'shareSdk':'shareSdk'
      }),
    getShareInfo:function(tit,fxUrl){//如果分享的内容会根据情况变化，那么这里可以传入分享标题及url
     let formDatas = new FormData();
		    formDatas.append('url', 'http://www.91tula.com/m/mobile-register');
     this.shareSdk(formDatas)//这里我写了一个公用的接口请求js，这里正常axios请求就可以，只要拿到数据都可以
          .then(res => {
            // localStorage.setItem("jsapi_ticket", res.jsapi_ticket);
            //拿到后端给的这些数据
            let appId = res.data.appId;
            let timestamp = res.data.timestamp;
            let nonceStr = res.data.noncestr;
            let signature = res.data.signature;
            wx.config({
              debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: appId,         // 必填，公众号的唯一标识，填自己的！
              timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
              nonceStr: nonceStr,   // 必填，生成签名的随机串
              signature: signature, // 必填，签名，见附录1
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
              ]
            })
            
            wx.ready(function () {
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
      })
}
 }
}
</script>
<style lang="less" scoped>
</style>