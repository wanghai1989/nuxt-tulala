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
	<div class="logo">
		<img src="~/assets/images/logo02.png" />
	</div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
	data () {
    return {
		categoryId:0
    }
  },

mounted(){

  },

	computed:{
	  ...mapState(['productlist','personInfo','userToken','category'])
  },
	methods:{
		...mapActions({
		  fetchProductlist:'fetchProductlist',
		  fetchCategory: 'fetchCategory'
      })
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
.invite02{background: url(~/assets/images/mobile-invite02.png) no-repeat;width: 100%; height: 1.88rem; background-size: 100% 100%;}
.invite03{background: url(~/assets/images/mobile-invite03.png) no-repeat;width: 100%; height: 1.6rem; background-size: 100% 100%;}
.invite04{background: url(~/assets/images/mobile-invite04.png) no-repeat;width: 100%; height: 0.9rem; background-size: 100% 100%;}
.logo{position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; height: 0.6rem; z-index: 2; padding: .1rem 0; box-sizing: border-box; background: #fff;}
.logo img{height: 0.4rem;}
</style>