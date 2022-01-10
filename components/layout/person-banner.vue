<template>
	<div class="banner person">
			<div class="wrapper df">
				<div class="vip-img">
					<div>
					<img :src="personInfo.avatar" v-if="personInfo.avatar" />
                    <img src='~/assets/images/defaultVip.png' v-else /> 
					</div>
					<i class="i-design" v-if="personInfo.designer_status==102" title="平台设计师"></i>
				</div>
				<div class="vip-txt">
					<div class="username">账号：{{personInfo.nickname}}(ID:{{personInfo.num}})</div>
					<div class="userlabel">
						<nuxt-link to="/vip/pay-vip"> 
							<i class="i-vip focus" v-if="personInfo.is_vip" title="VIP会员"></i>
							<i class="i-vip" v-else title="非VIP会员"></i>
						</nuxt-link>
						<!-- <nuxt-link to="/enter/design-basic"> <i class="i-design" :class="{focus:personInfo.designer_status==102}" title="平台设计师"></i></nuxt-link> -->
						<span class="person-bind" v-if="personInfo.is_complete_my_info"><i></i> 已完善</span>
						<nuxt-link class="person-bind" to="/person/basic-info" v-else><i></i> 未完善</nuxt-link>
						<span class="phone-bind" v-if="personInfo.is_binding_mobile"><i></i> 已绑定</span>
						<nuxt-link class="person-bind" to="/person/mobile-bind" v-else><i></i> 未完善</nuxt-link>
						<span class="name-bind"  v-if="personInfo.certification"><i></i> 已实名</span>
						<nuxt-link class="person-bind" to="/person/real-name" v-else><i></i> 未完善</nuxt-link>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import { mapState} from 'vuex'
export default {
  computed:{
      ...mapState(['personInfo'])
  },
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
.banner.person{height: 168px;padding-top: 42px; box-sizing: border-box; background: url(../../assets/images/banner05.png) no-repeat center center; color: #fff;
.vip-img{width: 84px; height: 84px; border-radius: 42px;  position: relative;}
.vip-img>div{width: 84px; height: 84px; border-radius: 42px; overflow: hidden; display: flex;align-items: center;}
.vip-img img{width: 100%; min-height: 100%;}
.vip-img .i-design{.bg-map(20px,20px,-25px, -193px); position: absolute; right: 2px; bottom: 2px;}
.vip-txt{margin-left: 20px;padding-top: 5px;}
.phone-bind, .name-bind,.person-bind{display: inline-block; height: 34px;    line-height: 32px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.35); padding: 0px 15px;}
.i-vip{.bg-map(28px,26px,-1096px, -156px); }
.i-vip.focus{.bg-map(28px,26px,-1034px, -43px); }
// .i-design{.bg-map(28px,26px,-22px, -193px); }
// .i-design.focus{.bg-map(28px,26px,-62px, -193px); }
.phone-bind i{.bg-map(14px,21px,-1069px, -44px);}
.name-bind i{.bg-map(24px,22px,-1095px, -41px);} 
.person-bind i{.bg-map(24px,22px,-1100px, -125px);}
.username{font-size: 16px;}
.userlabel{margin-top: 10px;}
.userlabel a{color: #fff;}
.userlabel a.person-bind:hover{background: var(--color);}
}
</style>