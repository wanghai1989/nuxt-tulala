<template>
<div class="sjs-top">
			<div class="wrapper clearfix">
				<div class="fl">
					图啦啦欢迎您！  &nbsp;<i class="i-phone"></i>&nbsp;<span class="f16 cf5f5">0755-2382-3043</span>
				</div>
				<div class="fr" v-show="userToken">
					<nuxt-link to="/"><i class="i-home"></i>图啦啦首页</nuxt-link> &nbsp;&nbsp;
					<div class="userimg-head">
					 <nuxt-link  to="/mine">
					 	<img :src="personInfo.avatar" v-show="personInfo.avatar" />
            <img src='~/assets/images/defaultVip.png' v-show="!personInfo.avatar" /> 
					 </nuxt-link>
           <i class="i-design" v-show="personInfo.designer_status==102" title="平台设计师"></i>
					  <div class="u-detail">
	          				<div class="u-info">
	                        <div class="userimg">
	                        <img :src="personInfo.avatar" v-show="personInfo.avatar"  class="lazy-nodelay" style="display: inline-block;"/>
                        	<img src='~/assets/images/defaultVip.png'  v-show="!personInfo.avatar"   class="lazy-nodelay" style="display: inline-block;"/> 
	                        </div>
	                        <div class="u-name">
	                          <span>{{personInfo.nickname}}</span>
                            <em>ID：{{personInfo.num}}</em>
	                        </div>
	                        <div class="dj">
	                             <span class="marfivepx znvip " title=""></span>
	                           <span class="qyvip " title=""></span>
	                                                 </div>
                                      <nuxt-link to="/vip/pay-vip" >开通终身VIP</nuxt-link>
	                                             </div>
	  
	                                         <div class="opengimg">
                                             <nuxt-link to="/vip/pay-vip"><img class="lazy-nodelay"  src="~/assets/images/allvip.jpg" style="display: inline;"></nuxt-link>
	                                          </div>
	                   
	                     <ul>
	                       <li> <nuxt-link  to="/mine"><i></i><span>个人中心</span></nuxt-link> </li>
	                       <li> <nuxt-link  to="/active/invite-friend"><i class="ione"></i><span>邀请好友</span></nuxt-link></li>
	                       <li><nuxt-link  to="/mine/my-collect"><i class="itwo"></i><span>我的收藏</span></nuxt-link></li>
	                       <li><a href="javascript:;" @click="doLogout()"><i class="ithree"></i><span>退出登录</span></a></li>
	                     </ul>
	     			</div>
					</div>
				</div>
				<div class="fr" v-show="!userToken" >
					<nuxt-link to="/"><i class="i-home"></i>图啦啦首页</nuxt-link> &nbsp;&nbsp;|&nbsp;&nbsp;
					 <nuxt-link to="/user/login" >登录</nuxt-link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <nuxt-link to="/user/register" >免费注册</nuxt-link>
				</div>
			</div>
		</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'

export default {
    data(){
	return { 
    //  prodclass:  this.dataClass
  }
  },
  computed:{
      ...mapState(['userToken','personInfo'])
  },
  
  methods:{ //页面进来发送请求
      ...mapActions({
          'logout':'logout',
          'fetchPersoninfo':'fetchPersoninfo',
      }),
      ...mapMutations(['cancelToken']),
      updatePersoninfo:function(){
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  this.fetchPersoninfo(formDatas)
	  },
      doLogout(){
        let formDatas = new FormData();
		    formDatas.append('token', this.userToken);
        this.logout(formDatas).then(data => {
          if(data.code==1 || data.code==105){
            this.cancelToken()
            this.$router.replace('/user/login');
          }
        })
      }
  },
 
  mounted(){
    this.updatePersoninfo()
  	// //页面刷新，如果存在token，页面保持登录状态
		// let userInfo=JSON.parse(localStorage.getItem("userInfo")) 
		// if(userInfo){
		// 	this.$store.dispatch("userLogin", true);
		// }
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
.sjs-top{height: 46px; line-height: 46px; color: #333; font-size: 12px;background: #fff;
a:hover{text-decoration: underline;}
.userimg-head{width: 40px; height: 40px; display: inline-block;  border-radius: 20px;vertical-align: middle; position: relative;}
.userimg-head>a{width: 40px; height: 40px; display: inline-block;  border-radius: 20px; overflow: hidden;}
.userimg-head img{width: 100%; min-height: 100%;}
.userimg-head:hover .u-detail{display: block;}
.i-design{.bg-map(20px,20px,-25px, -193px); position: absolute;right: -8px; bottom: 0px;}
.i-phone{.bg-map(24px,24px, -686px, -42px); margin-right: 6px;}
.i-home{.bg-map(14px,14px,-723px, -47px);margin-right: 6px;    margin-top: -1px;}
}
// .ul-nav{float: left;margin-left: 50px;
// li{float: left; width: 90px; text-align: center; }
// li a{display: block;}
// }
 .u-detail { position: absolute; top: 40px; left: -265px; z-index: 111; display: none; padding: 20px 15px 9px; width: 300px;
          border-radius: 4px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.2); line-height: normal; 
         .u-info { margin-bottom: 17px; width: 100%; height: 60px; border-bottom: 1px solid #eceff1; }
         .u-info .userimg { float: left; width: 40px; height: 40px; border-radius: 20px; overflow: hidden; }
         .u-info .userimg img { display: inline-block; width: 40px;  }
         .u-info .u-name { float: left; margin-left: 10px; width: 93px; height: 100%; text-align: left; }
         .u-info .u-name span { display: inline-block; overflow: hidden; width: 85px; height: 18px; color: #000; 
         text-overflow: ellipsis; white-space: nowrap; font-weight: 700; font-size: 14px; }
         .u-info .u-name em { display: inline-block; color: #949494; vertical-align: 5px; font-size: 12px; line-height: 10px; }
         .u-info .dj { float: left; height: 100%; }
        //  .u-info .dj .znvip { display: inline-block; width: 22px; height: 30px; background: url(../image/newuser.png) -22px -338px no-repeat; 
        //  vertical-align: -10px; }
         .u-info a { float: right; display: block; margin-top: 5px; width: 86px; height: 28px; border-radius: 48px;
          background:var(--redColor); ; color: #fff; font-weight: 700; font-size: 13px; line-height: 28px;text-align: center; }
         .opengimg { margin-bottom: 8px; width: 300px; height: 83px; }
         .opengimg img { width: 100%; height: 100%; }
         ul { display: flex; justify-content: space-between; width: 100%; height: 60px; }
         ul li { flex: 1; }
         ul li a { display: block; color: #757575; font-size: 13px; text-align: center; margin: 0 auto; }
         ul li a i { .bg-map(30px,35px,-749px, -120px);  display: block;     margin: 0 auto;}
         ul li a .ione { .bg-map(30px,35px,-665px, -125px); display: block; }
         ul li a .itwo {.bg-map(30px,35px,-792px, -119px);display: block;  }
         ul li a .ithree {.bg-map(30px,35px,-706px, -119px);display: block; }
    }
</style>