<template>
<div class="invite-box">
  <div class="laymshade Wechatshare" v-if="isShare" @click="closeShare()">
        <img src="/img/share.png" />
    </div>
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
      <a href="javascript:void(0)" @click="Weshare(1)">微信分享</a>
  </div>
	<div class="logo">
		<img src="~/assets/images/logo02.png" />
	</div>
</div>
</template>
<script>
import QRCode from 'qrcode'; 
import processImg from '~/assets/js/processimg'
import {mapState,mapMutations, mapActions} from 'vuex'
export default {
	data () {
    return {
		categoryId:0,
    }
  },

	computed:{
	  ...mapState(['personInfo','userToken','baseUrl','basemUrl','isShare'])
  },
  mounted(){
    console.log(this.$route.path)
  },
   created() {
        this.Weshare(0)
     },
	methods:{
    ...mapMutations(['setShare']),
    Weshare:function(num){
      if(!this.userToken && num==1){
        layer.msg('邀请好友需登录！！', {icon: 2});
        setTimeout(() => {
           this.$router.push({path: '/m/mobile-login',query:{backUrl:this.$route.path}}) 
        }, 2000);
        return
      }
      this.setShare(num)
    },
    closeShare:function(){
      this.Weshare(0)
    },
      getPromote:function(){
        if(!this.userToken){
         layer.msg('邀请好友需登录！！', {icon: 2});
        setTimeout(() => {
           this.$router.push({path: '/m/mobile-login',query:{backUrl:this.$router.path}}) 
        }, 2000);
        return
      }
        // With async/await
        let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            layer.msg('微信端不支持生成推广海报，请更换浏览器访问', {icon: 2,time: 3000});
            return
        } 

          let invitelink=this.basemUrl+'/mobile-register?invite_code='+ this.personInfo.invite_code 


          QRCode.toDataURL(invitelink, {
                    type: "image/png", //类型
                    quality: 0.8, //图片质量A Number between 0 and 1
                    width: 140, //高度
                    height: 140, //宽度
                    errorCorrectionLevel: "L", //容错率
                    margin: 2, //外边距
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

.invite-box{min-height: 100vh; background: #fe7845; position: relative;}
.invite01{background: url(~/assets/images/mobile-invite01.png) no-repeat;width: 100%; height: 1.6rem; background-size: 100% 100%;}
.invite02{background: url(~/assets/images/mobile-invite02.png) no-repeat;width: 100%; height: 1.8rem; background-size: 100% 100%;}
.invite03{background: url(~/assets/images/mobile-invite03.png) no-repeat;width: 100%; height: 1.78rem; background-size: 100% 100%;}
.invite04{background: url(~/assets/images/mobile-invite04.png) no-repeat;width: 100%; height: 0.66rem; background-size: 100% 100%;}
.share{position: absolute; bottom: 100px; left: 0; width: 100%; text-align: center; height: 90px; z-index: 2; padding: 0 15px;  box-sizing: border-box; }
.share a{.btn(100%,44px,#ff8016,linear-gradient(90deg, #ff2402 0%, #ff8016 100%),#fff); border-radius: 22px; margin: 7px 0; box-shadow: 1px 2px 3px #bf0001; border: none;}
.logo{position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; height: 64px; z-index: 2; padding: 12px 0; box-sizing: border-box; background: #fff;}
.logo img{height: 40px;}
.Wechatshare img{ width: 50%;position: absolute;right: 20px;}
</style>