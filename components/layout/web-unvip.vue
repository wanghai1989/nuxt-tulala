<template>
<div class="laymshade vip" v-if="showVip">
			<div class="vip-box clearfix">
				<i class="close" @click="close()"></i>
				  <h3>开通VIP特权</h3>
          <p class="p01"><i></i> 会员免费下载</p>
          <p class="p02"><i></i>每日更新</p>
          <p class="p03"><i></i>尊贵会员名牌</p>
          <p class="p04"><i></i>享有专属客服</p>
          <p class="p05"><i></i>在线接单</p>
          <a href="javascript:void(0)" class="btn-open" @click="goOpen()">立即开通</a>
			</div>
		</div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed:{
	  ...mapState(['showVip'])
  },
  methods: {
    ...mapMutations(['setShowVip']),
    goOpen:function() {
      this.setShowVip(0)
      this.$router.push('/user/pay-vip') 
    },
    close(){
    this.setShowVip(0)
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
        background: url(../../assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
    height: @height;
    line-height: @height;
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

.vip-box{
  position: fixed;width: 360px;  height: 500px; top: 50%; left: 50%; margin-top: -250px; margin-left: -180px; z-index: 5; 
   background: url(../../assets/images/pic09.png) no-repeat; position: relative; border-radius: 5px;
background-size: cover; padding: 30px 0px 0px; box-sizing: border-box; color: #fff; text-align: center;}
.vip-box h3{font-size: 24px; margin-bottom: 42px; color: #f5cd08;}
.vip-box p{
    padding: 8px 30px;
    background: var(--color);
    width: 260px;
    box-sizing: border-box;
    margin: 0px auto 15px;    transform: rotate(350deg);
    border-radius: 30px;}
    .vip-box p i{.bg-map(14px,14px,-389px, -194px); margin-right: 8px;}
  .vip-box p.p01{background: #c14949;}
  .vip-box p.p02{background: #49c0c1;}
  .vip-box p.p03{background: #c1ac49;}
  .vip-box p.p04{background: #b449c1;}
  .vip-box p.p05{background: #a9c149;}
.btn-open{.btn(260px,42px,var(--redColor),var(--redColor),#fff); margin-top: 40px}
.btn-open:hover{opacity: 0.9;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
</style>