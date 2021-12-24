<template>
<div>
<div class="laymshade" v-if="signShow">
			<div class="sign-box">
				<i class="close" @click="closeSign()"></i>
				<div class="sign01">恭喜获得积分+{{addIntegral}}</div>
				<div class="sign02">我的积分<b>{{integral}}</b> </div>
				<div class="sign03">
                    <nuxt-link  class="btn btn-go"  to="/integral-mall">去购物</nuxt-link>
                    <a href="javascript:void(0)"  class="btn btn-go"   @click="goLuckDraw()">去抽奖</a>
				</div>
			</div>
		</div>
    <div class="pendant">
			<!-- <div class="vip-pend1">
				<a href="person-vip.html"> <i></i><br /> <span>全站<br />vip</span></a>
			</div> -->
			<div class="vip-pend2">
                <nuxt-link to="/vip"><i></i><br /> <span>全站<br />vip</span></nuxt-link>
				<!-- <a href="enterprise-vip.html"> <i></i><br /> <span>全站<br />vip</span></a> -->
			</div>
            <div class="item-pend qd"  @mouseover="qdOver()" @mouseout="qdOut()">
				<a href="javascript:void(0)"> <i></i><br /> <span>签到</span></a>
                <div class="sign-in"  v-show="qdShow">
                     <a class="btn-qd"  @click="gosignin()"  href="javascript:void(0)">立即签到</a>
				</div>
			</div>
			<div class="item-pend kf">
				<a href="#"> <i></i><br /> <span>客服</span></a>
			</div>
			<div class="item-pend ptfl" @mouseover="ptflOver()" @mouseout="ptflOut()">
				<a href="#"> <i></i><br /> <span>福利</span></a>
				<div class="welfare"  v-show="welfareShow">
					<div class="invite">
                     <nuxt-link class="btn-go" to="/active/invite-friend">马上邀请</nuxt-link>
				</div>
				<div class="wheel">
                    <!-- <a class="btn-go" href="/active/big-wheel">去抽奖</a> -->
                    <nuxt-link class="btn-go" to="/active/big-wheel">去抽奖</nuxt-link>
				</div>
				</div>
			</div>
			<div class="item-pend lm">
                <nuxt-link to="/about/qq-group"><i></i><br /> <span>联盟</span></nuxt-link>
			</div>
			<div class="item-pend zq">
				<nuxt-link to="/enter"> <i></i><br /> <span>入驻</span></nuxt-link>
			</div>
			<div class="item-pend jy">
			<nuxt-link to="/advice"><i></i><br /><span>建议</span></nuxt-link>	
			</div>
			<div class="item-pend rw">
				<nuxt-link to="/task"> <i></i><br /> <span>任务</span></nuxt-link>	
			</div>
			<div class="item-top" id="holdtop" @click="holdTop()">
				<i></i>
			</div>
		</div>
</div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
        data () {
            return {
                qdShow:0,//签到显示
                signShow:0, //签到接口
                integral:0,
                addIntegral:0,
                // userInfo:{},
                welfareShow:0, //福利
            }
        },
        computed:{
	  ...mapState(['signin','userToken'])
  },
        mounted(){
            // if(localStorage.getItem("userInfo")!= null){
            //     this.userInfo=JSON.parse(window.localStorage.getItem("userInfo"))
            // }
            this.showTop();
        },
    	methods:{
            ...mapActions({
		  fetchsignIn:'fetchsignIn'
      }),
      ...mapMutations(['setShowLogin']),
            showTop(){
                    window.onscroll = function () {
                        if ($(window).scrollTop()>100){
                            $("#holdtop").fadeIn(800);
                            }else{
                            $("#holdtop").fadeOut(800);
                            }
                    }
                },
            holdTop:function(){
                $('body,html').animate({
                    scrollTop: 0
                }, 500);
            },

            goLuckDraw(){
                this.signShow=0
                this.$router.push('/active/big-wheel')
            },

            qdOver:function(){
                this.qdShow=1
            },
            qdOut:function(){
                this.qdShow=0
            },
            ptflOver:function(){
                this.welfareShow=1
            },
            ptflOut:function(){
                this.welfareShow=0
            },
            gosignin:function(){
                if(!this.userToken){
                    this.setShowLogin(1)
                    return
                }

               let formDatas = new FormData();
                formDatas.append('token', this.userToken);
                this.fetchsignIn(formDatas)
                    .then((data) => {
                        if(data.code==0){
                        layer.msg(data.msg, {icon: 2});
                        }
                        if(data.code==1){
                            this.signShow=1
                            this.integral=data.data.integral
                            this.addIntegral=data.data.addIntegral
                        }
                    })
            },
            closeSign:function(){
                this.signShow=0
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
.pendant {text-align: center; position: relative;
    width: 50px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    box-shadow: -3px 0px 6px 0px 
        rgba(0, 0, 0, 0.15);
    opacity: 0.98;
    z-index: 100;
    span{font-size: 12px; line-height: 14px;    display: inline-block;
    margin-top: 5px;}
    .vip-pend1 {
    padding: 10px 0px;
    background-image: linear-gradient(0deg,  #deb4be 0%,  #f7e3e3 100%);
        }
    .vip-pend1 i{.bg-map(24px,22px,-350px, -7px); }
    .vip-pend2 {
     padding: 10px 0px;
    background-image: linear-gradient(0deg, 
        #ece79d 0%, 
        #ffffff 100%);
        }
    .vip-pend2 i{.bg-map(24px,22px,-389px, -7px); }
    .item-pend{width: 50px; margin: 0 auto; padding: 15px 0px; border-bottom: 1px solid #d6d6d6;}
    .item-pend span{color: #999;}
    .item-pend i{ opacity: 0.9;}
    .item-pend:hover span{color: #333; }
    .item-pend:hover i{ opacity: 1;}
    .item-pend.kf i{.bg-map(22px,25px,-464px, -5px);}
    .item-pend.ptfl{position: relative;}
    .item-pend.ptfl i{.bg-map(22px,25px,-428px, -4px);}
    .item-pend.ptfl .welfare{width: 230px; height: auto;position: absolute; right: 50px; top: 0px; }
    .item-pend.ptfl .welfare .invite{width: 230px; height: 140px; background: url(~/assets/images/pic42.png) no-repeat;
     background-size: contain;}
     .item-pend.ptfl .welfare .wheel{width: 230px; height: 140px; background: url(~/assets/images/pic43.png) no-repeat;
     background-size: contain;}
    .item-pend.lm i{.bg-map(22px,25px,-498px, -5px);}
    .item-pend.zq i{.bg-map(22px,25px,-247px, -1px);}
    .item-pend.jy i{.bg-map(22px,25px,-277px, -3px);}
    .item-pend.rw i{.bg-map(22px,25px,-314px, -4px);}

    .item-pend.qd{position: relative;}
    .item-pend.qd .sign-in{width: 230px; height: 140px; background: url(~/assets/images/pic41.png) no-repeat;
     background-size: contain; position: absolute; right: 50px; top: 0px; }
    .item-pend.qd i{.bg-map(25px,25px,-702px, -167px);}

    .item-top{position: absolute;bottom: 40px;  left: 14px; display: none;}
    .item-top i{.bg-map(22px,25px,-531px,-4px);}
    .btn-qd{.btn(100px,28px,#fccc0a,#fccc0a,#5e00b2); font-size: 14px; border-radius: 17px; 
    margin-top: 100px; box-shadow: 0px 1px 4px #fccc0a; font-weight: bold;};
    .btn-go{.btn(100px,28px,#fccc0a,#fccc0a,#5e00b2); font-size: 14px; border-radius: 17px; 
    margin-top: 100px; box-shadow: 0px 1px 4px #fccc0a; font-weight: bold;};
    
}
.sign-box{width: 600px; height: 628px; position: fixed; top: 50%; left: 50%; margin-top: -314px; margin-left: -300px; z-index: 5; 
        background: url(~/assets/images/pic44.png) no-repeat; background-size: contain; accelerator: false; position: relative; 
        padding-top: 280px; text-align: center;
    .close{.bg-map(24px,24px,-1174px, -153px); position: absolute; top: 10px; right: 10px;}
    .sign01{font-size: 24px; color: var(--backColor);}
    .sign02{font-size: 18px; color: var(--grayColor); margin-top: 30px; }
    .sign02 b{font-size: 16px; color: var(--redColor); font-weight: bold; font-size: 30px;}
    .sign03 {text-align: center; margin-top: 130px;}
    .sign03 .btn-go{width: 160px; height: 50px; line-height: 50px; text-align: center; background: #fbe945; color: var(--redColor);
    font-size: 18px; margin: 0px 20px; border-radius: 25px;}
    }
</style>