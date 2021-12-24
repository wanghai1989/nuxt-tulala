<template>
<div class="about-contain">
			<div class="cert-item mt30">
				<i class="i-basic"></i> 
				<div class="cert-txt">
					<div class="f18 cblack">基本信息</div>
					<div class="cgray">用于设计师主页信息、商品收货地址等</div>
				</div>
				<nuxt-link to="/mine/basic-info"  class="btn-cert">{{personInfo.is_complete_my_info?'查看':'去完善'}}</nuxt-link>
				<span class="state focus" v-if="personInfo.is_complete_my_info"><em>已完善</em> <i></i></span>
				<span class="state" v-else><em>未完善</em> <i></i></span>
			</div>
			<div class="cert-item">
				<i class="i-phone"></i> 
				<div class="cert-txt">
					<div class="f18 cblack">手机认证</div>
					<div class="cgray">机绑定后可用于登录、接收订单信息以及网站活动等</div>
				</div> 
				<span  class="btn-cert disabled"  v-if="personInfo.is_binding_mobile">已认证</span>
				<nuxt-link to="/mine/mobile-bind"  class="btn-cert" v-else>去认证</nuxt-link>
				
				<span class="state focus"  v-if="personInfo.is_binding_mobile"><em>已认证</em> <i></i></span>
				<span class="state"  v-else><em>未认证</em> <i></i></span>
			</div>
			<div class="cert-item">
				<i class="i-realname"></i> 
				<div class="cert-txt">
					<div class="f18 cblack">实名认证</div>
					<div class="cgray">实名认证是开通接单工作的基本条件</div>
				</div> 
				<span class="btn-cert disabled"  v-if="[1,2].includes(personInfo.certification)">{{personInfo.certification==1?'已认证':'待审核'}}</span>
				<nuxt-link to="/mine/real-name"  class="btn-cert"  v-else>{{personInfo.certification==3?'重新认证':'去认证'}}</nuxt-link>
				<span class="state focus"  v-if="[1,2].includes(personInfo.certification)"><em>{{auditRealName[personInfo.certification]}}</em> <i></i></span>
				<span class="state" v-if="[0,3].includes(personInfo.certification)"><em>{{auditRealName[personInfo.certification]}}</em> <i></i></span>
			</div>
		</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  metaInfo: {
    title: '会员基本信息'
  },
  data () {
    return {
	 
    }
  },
  mounted(){  
	  this.updatePersoninfo()
	// let id = this.$layer.msg("5s后刷新页面");
	
		},
		computed:{
      ...mapState(['personInfo','auditRealName','userToken'])
  },
  methods:{
 ...mapActions({
		  fetchPersoninfo:'fetchPersoninfo'
      }),
	  updatePersoninfo:function(){
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  this.fetchPersoninfo(formDatas)
	  }
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

.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;

.cert-item{display: flex; height: 45px; margin-bottom: 60px;
.i-basic{.bg-map(45px,45px, -1030px, -72px);}
.i-phone{.bg-map(45px,45px,-1089px, -73px);}
.i-realname{.bg-map(45px,45px, -1142px, -73px);}
.cert-txt{width: 400px; margin-left: 20px;}
.btn-cert{.btn(138px,45px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff); font-size: 16px;}
.btn-cert:hover{opacity: 0.9;}
.btn-cert.disabled{background: #b5b5b5; border: 1px solid #b5b5b5;}
.btn-cert.disabled:hover{opacity: 1;}
.state{font-size: 16px; margin-left: 75px;    line-height: 45px;}
.state em{font-style: normal; color: var(--backColor);}
.state.focus{color: var(--color);}
.state.focus em{font-style: normal; color: var(--color);}
.state i{ .bg-map(20px,20px,-1135px, -154px);   vertical-align: sub;}
.state.focus i{.bg-map(20px,20px,-1135px, -44px);   vertical-align: sub;}
}
}

</style>