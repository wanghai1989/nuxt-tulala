<template>
<div>
   <div class="banner vip">
			<div class="wrapper">
				<div class="title">开通VIP畅享全站海量素材任意下载</div>
				<div class="file-ico">
					<span class="mkys">
						<i></i>
						免抠元素
					</span>
					<span class="bjtp">
						<i></i>
						背景图片
					</span>
					<span class="wzui">
						<i></i>
						网站UI
					</span>
					<span class="mbsc">
						<i></i>
						模板素材
					</span>
					<span class="bgwd">
						<i></i>
						办公文档
					</span>
					<span class="syt">
						<i></i>
						摄影图
					</span>
				</div>
				<div class="tc mt50">
          <router-link class="btn-openvip" to="/user/pay-vip">开通会员</router-link>
				</div>
			</div>
		</div>
		<ul class="ul-viprote wrapper clearfix">
		      <li>
		          <span class="tse">功能特权</span>
		          <span class="line"></span>
		          <span class="ptt">下载权限</span>
				  <span class="ptt">接单权限</span>
		          <span class="ptt">全站下载</span>
		          <span class="ptt">每日更新</span>
		          <span class="ptt">高速下载</span>
		          <span class="ptt">优先客服</span>
		          <span class="ptt">身份铭牌</span>
		      </li>
		      <li class="jsao-more more-two">
		        <span class="taoc">终身VIP</span>
		        <span class="qian"><em>￥</em>199<b>原价299</b></span>
            <router-link class="btn-openvip" to="/user/pay-vip">开通会员</router-link>
		        <span class="pt jc">任意下载</span>
		        <span class="gou"><i></i></span>
				<span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		      </li>
		       <li class="jsao-more ">
		        <span class="taoc">包年VIP</span>
		        <span class="qian"><em>￥</em>99</span>
            <router-link class="btn-openvip" to="/user/pay-vip">开通会员</router-link>
		        <span class="pt jc">任意下载</span>
		        <span class="gou"><i></i></span>
				<span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		      </li>
		       <li class="jsao-more">
		        <span class="taoc">包月VIP</span>
		        <span class="qian"><em>￥</em>49</span>
            <router-link class="btn-openvip" to="/user/pay-vip">开通会员</router-link>
		        <span class="pt jc">任意下载</span>
		        <span class="gou"><i></i></span>
				<span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		        <span class="gou"><i></i></span>
		      </li>
		       <li class="jsao-more">
		       <span class="taoc">普通用户</span>
		        <span class="qian"><em>￥</em>0</span>
            <router-link class="btn-regist" to="/user/pay-vip">注册即可</router-link>
		        <span class="pt jc">0个/天</span>
		        <span class="xia"><i></i></span>
				<span class="xia"><i></i></span>
		        <span class="xia"><i></i></span>
		        <span class="xia"><i></i></span>
		        <span class="xia"><i></i></span>
		       <span class="xia"><i></i></span>
		      </li>
		    </ul>
		    <div class="tc mt15">对套餐使用情况如有疑问，欢迎您随时咨询<a class="cmain" href="">在线客服</a> </div>
	<div class="vip-service">
		<div class="wrapper">
			<div class="title">VIP特权服务</div>
			<div class="line"></div>
			<div class="service">
				<span class="viptq">
					<i></i><br />
					VIP特权
				</span>
				<span class="qybz">
					<i></i><br />
					权益保障
				</span>
				<span class="txkf">
					<i></i><br />
					贴心客服
				</span>
				<span class="hlsc">
					<i></i><br />
					海量素材
				</span>
				<span class="gsxz">
					<i></i><br />
					高速下载
				</span>
			</div>
			<div class="mt50 tc">
                <router-link class="btn-openvip" to="/user/pay-vip">开通会员</router-link>
			</div>
			
		</div>
	</div>
	</div>
</template>

<script>

import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   computed:{
      ...mapState(['userToken'])
  },
   created(){
    //    this.setToken(localStorage.getItem("preRoute"))
   },
   methods:{
    //    ...mapMutations(['setToken']),
   }

}
</script>
<style lang="less" scoped>
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
   line-height: calc(@height - 2px); 
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
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
    display: inline-block;
    vertical-align: middle;
    width: @width;
    height: @height;
    position: relative;
    background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
    cursor: pointer;
}
.banner.vip{width: 100%; max-width: 1920px; margin: 0 auto; height: 560px; padding-top: 80px; box-sizing: border-box; background: url(~/assets/images/banner06.png) no-repeat center center; color: #fff;
.title{font-size: 48px; color: #fff; text-align: center;}
.file-ico{display: flex; width: 750px; margin: 35px auto;
span{flex: 1; text-align: center;}
span i{display: block;width: 52px; height: 52px; background: #fff; border-radius: 26px; position: relative;margin: 0 auto 10px;}
.mkys i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px,-208px, -77px);}
.bjtp i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px,-246px, -78px);}
.wzui i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px,-288px, -77px);}
.mbsc i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px, -398px, -75px);}
.bgwd i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px,-433px, -76px);}
.syt i:before{content: ""; position: absolute; top: 13px; left: 0px; .bg-map(25px,25px,-464px, -75px);}
}
.btn-openvip{.btn(220px,48px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
}
.ul-viprote {
    position: relative;
    margin-top: -90px;
    border-top: 5px solid  #ebc66d;
    border-radius: 6px;
    box-shadow: 0px 3px 7px 0px 
        rgba(0, 0, 0, 0.19);
    z-index: 10;
    background: #fff;
    padding: 35px 0px;
    li{    position: relative;
    display: block;
    float: left;
    width: 240px;text-align: center;
    height: 640px;    box-sizing: border-box;
    border-right: 1px solid #d4d4d4;}
    li .tse {
    display: block;
    margin-top: 40px;
    margin-left: 60px;
    font-size: 24px;
    color: var(--backColor);
    text-align: left;
}
     li .line {
    display: block;
    width: 48px;
    height: 4px;
    background-color: #ebc66d;
    margin-left: 60px;
    margin-top: 6px;
    margin-bottom: 50px;    border-radius: 2px;
}
.btn-openvip{.btn(142px,40px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 20px;}
.btn-regist{.btn(142px,40px,var(--color),transparent,var(--color)); border-radius: 20px;}
li .ptt {
    display: block;
    margin-left: 60px;
    height: 76px;
    line-height: 76px;
    text-align: left;
    font-size: 15px;
    color:var(--backColor) ;
}
.taoc{
    font-size: 20px;
    color: var(--backColor); 
        display: block;
    text-align: center;
}
 .qian{
    display: block;
    font-size: 40px;
    font-family: Arial;
    font-weight: 700;
    color: #ebcb6d;
    text-align: center;
}
.qian em{
        display: inline-block;
    font-size: 16px;
    color: #ebc56b;
    vertical-align: 17px;
    font-weight: 100;
    font-style: normal;
    text-align: center;
}
 .qian b{
    font-size: 16px;
    font-weight: 100;
    color: #5d5d5d;
    text-decoration: line-through;
}
li .jc {
    display: block;
    height: 76px;
    line-height: 76px;
    font-size: 15px;
    color: var(--backColor);
    text-align: center;
}
li .gou,li .xia {
    display: block;
    height: 76px;
    line-height: 76px;
    text-align: center;
    font-size: 15px;
    color: var(--backColor);
}
li .gou i{.bg-map(18px,18px,-1173px, -43px);}
li .xia i{.bg-map(18px,18px,-1177px, -121px);}
}
.vip-service{margin-top: 30px; width: 100%; background: #fff; padding: 50px 0 60px;
.title{font-size: 36px; color: var(--backColor); text-align: center;}
.line{width: 60px; height: 5px; margin: 10px auto 60px; background-color: #ebc66d;}
.service{display: flex;}
.service span{flex: 1; text-align: center; font-size: 18px; color: var(--backColor);}
.service i{margin-bottom: 5px;}
.viptq i{.bg-map(52px,52px,0px, -126px);}
.qybz i{.bg-map(52px,52px,-64px, -126px);}
.txkf i{.bg-map(52px,52px,-125px, -121px);}
.hlsc i{.bg-map(52px,52px,-182px, -124px);}
.gsxz i{.bg-map(52px,52px, -243px, -126px);}
.btn-openvip{.btn(220px,48px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); }
}
</style>