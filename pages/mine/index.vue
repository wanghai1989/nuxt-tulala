<template>
<div>
    <personBanner></personBanner>
    <personNav></personNav>
    <div class="laymshade login" v-if="ispublic">
			<div class="login-box clearfix">
				<i class="close" @click="close()"></i>
				<div class="publicNo">
                    <h3>图啦啦公众号</h3>
                    <img src="~/assets/images/pic02.jpg"  title="图啦啦公众号"/>
                    <p>关注公众号及时获取图啦啦最新资讯</p>
                </div>
			</div>
		</div>
    <div class="wrapper">
        <personInfo></personInfo>
    </div>
</div>
</template>
<script>

import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import personInfo from '~/components/person/person-info.vue'
export default {
layout: 'web',
components: {personBanner,personNav,personInfo},
 head(){
	   return {
			title: '会员基本信息-图啦啦91tula.com'
			}
  },
   data () {
    return {
      username: '',
      password: '',
      errorMsg: '',
      ispublic:0  //注册成功，提示关注公众号
    }
  },
 mounted(){
  if(this.$route.query.publicno){
     this.ispublic=1
   }
  },
  methods: {
    close(){
    this.ispublic=0
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
        background: url(../../assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
.login-box{width: 340px; position: fixed; height: 360px; top: 50%; left: 50%; margin-top: -250px; margin-left: -170px; z-index: 5; 
background: #fff; border-radius: 5px; accelerator: false; position: relative;
.login{text-align: center; }
.publicNo{padding: 40px 30px 20px; text-align: center;}
.publicNo h3{font-size: 20px; text-align: center; font-weight: bold; color: var(--backColor);}
.publicNo img{width: 220px;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}

}
</style>