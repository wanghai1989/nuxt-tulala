<template>
<div>
<header class="header" :class="pageclass"> 
			<div class="wrapper clearfix">
        <div class="logo">
                <nuxt-link to="/">
                    <img src="~/assets/images/logo01.png" title="图啦啦" v-if="pageclass=='index'" >
                    <img src="~/assets/images/logo02.png" title="图啦啦" v-else >
              </nuxt-link>
			</div>
				 <ul class="fl nav-list">
                    <li>
                      <i class="i-hot"></i>
                      <nuxt-link to="/designer">我是设计师</nuxt-link>
                       <div class="material-box">
                         <div class="material-name" >
                            <nuxt-link to="/enter">入驻图啦啦</nuxt-link>
                          </div>
                         <div class="material-name" >
                            <nuxt-link to="/designer">图啦设计师</nuxt-link>
                          </div>
                          <div class="material-name" >
                            <nuxt-link to="/task">参与任务</nuxt-link>
                          </div>
                          
                        </div>
				   </li>
            <li>
                       <nuxt-link to="/task/public">找设计师</nuxt-link>
				   </li>
           <li>
                       <nuxt-link :to="{ name: 'material-id', params:{id: 1 }}">素材中心</nuxt-link>
                       <div class="material-box">
                          <div class="material-name"  v-for="item in navigation" :key="item.id">
                            <nuxt-link :to="{ name: 'material-id', params:{id: item.id }}">{{item.name}}
                            <div class="pull-down-box" :class='[item.type_class,item.name=="办公文档" ?"double":"single" ]' >
                            <div class="pd-top">
                                <h3>{{item.name}}<span>近期新增1596张</span></h3>
                            </div>
                          <div v-if="item.name=='办公文档'">
                            <div v-for="item2 in item.child" :key="item2.id">
                            <div class="pd-name" >
                              <nuxt-link :to="{ name: 'material-id', params:{type:item.type_class,id: item2.id }}">{{item2.name}}</nuxt-link>
                            </div>
                            <div class="pd-list clearfix">
                              <nuxt-link class="main-sort" v-for="item3 in item2.scenarios" :key="item3.id" :to="{ name: 'material-id', params:{type:item.type_class, id: item2.id },query:{scenarios_id:item3.id}}">{{item3.name}}</nuxt-link>
                            </div> 
                            </div>
                          </div>
                            <div class="pd-list clearfix" v-else> 
                              <nuxt-link class="main-sort"  v-for="child in item.scenarios" :key="child.id" :to="{ name: 'material-id', params:{id: item.id },query:{scenarios_id:child.id}}">{{child.name}}</nuxt-link>
                            </div>                                                                               
				   	  </div>
</nuxt-link>

                          </div>
                       </div>
				   </li>


                    <!-- <li v-for="item in navigation" :key="item.id"> 
                        <nuxt-link :to="{ name: 'material-id', params:{id: item.id }}">{{item.name}}</nuxt-link>
                        <div class="pull-down-box" :class='[item.type_class,item.name=="办公文档" ?"double":"single" ]' >
                            <div class="pd-top">
                                <h3>{{item.name}}<span>近期新增1596张</span></h3>
                            </div>
                          <div v-if="item.name=='办公文档'">
                            <div v-for="item2 in item.child" :key="item2.id">
                            <div class="pd-name" >
                              <nuxt-link :to="{ name: 'material-id', params:{type:item.type_class,id: item2.id }}">{{item2.name}}</nuxt-link>
                            </div>
                            <div class="pd-list clearfix">
                              <nuxt-link class="main-sort" v-for="item3 in item2.scenarios" :key="item3.id" :to="{ name: 'material-id', params:{type:item.type_class, id: item2.id },query:{scenarios_id:item3.id}}">{{item3.name}}</nuxt-link>
                            </div> 
                            </div>
                          </div>
                            <div class="pd-list clearfix" v-else> 
                              <nuxt-link class="main-sort"  v-for="child in item.scenarios" :key="child.id" :to="{ name: 'material-id', params:{id: item.id },query:{scenarios_id:child.id}}">{{child.name}}</nuxt-link>
                            </div>                                                                               
				   	  </div>
                    </li> -->
                   
				   <li>
                        <nuxt-link to="/mall">积分商城</nuxt-link>
				   </li>
           <li>
                        <nuxt-link to="/active/invite-friend">邀请好友</nuxt-link>
				   </li>
				</ul>

                <div class="login fr">
                  <nuxt-link to="/notice" class="btn-notice" :class="pageclass" title="公告">
                   <ul class="ul-notice" v-if="notice.length>0">
                     <li v-for="item in notice" :key="item.id">
                    <nuxt-link  :to="{ name: 'notice-id', params:{ id: item.id }}"  :title="item.title">{{item.title}}</nuxt-link> 
                   </li>
                     <li class="all"> <nuxt-link to="/notice" >查看全部</nuxt-link> </li>
                   </ul>
                  </nuxt-link>
                  
					 <div class="logined"  v-show="userToken">
                        <nuxt-link to="/mine" >
                        <img :src="personInfo.avatar" v-if="personInfo.avatar" />
                        <img src='~/assets/images/defaultVip.png' v-else /> 
                        </nuxt-link>
                        <i class="i-design" v-if="personInfo.designer_status==102" title="平台设计师"></i>
                        <div class="u-detail">
	          				<div class="u-info">
	                        <div class="userimg">
                            <img :src="personInfo.avatar" v-if="personInfo.avatar" class="lazy-nodelay"  style="display: inline-block;" />
                            <img src='~/assets/images/defaultVip.png'  class="lazy-nodelay"  style="display: inline-block;" v-else /> 
	                        </div>
	                        <div class="u-name">
	                          <span>{{personInfo.nickname}}</span>
                            <em>ID：{{personInfo.num}}</em>
	                        </div>
	                        <div class="dj">
	                             <span class="marfivepx znvip " title=""></span>
	
	                           <span class="qyvip " title=""></span>
	                                                 </div>
                                      <nuxt-link to="/vip/pay-vip">开通终身VIP</nuxt-link>
	                                             </div>
	  
	                                         <div class="opengimg">
                                             <nuxt-link to="/vip"><img class="lazy-nodelay"  src="~/assets/images/allvip.jpg" style="display: inline;"></nuxt-link>
	                                          </div>
	                   
	                     <ul>
	                       <li> <nuxt-link  to="/mine"><i></i><span>个人中心</span></nuxt-link> </li>
	                       <li> <nuxt-link  to="/active/invite-friend"><i class="ione"></i><span>邀请好友</span></nuxt-link></li>
	                       <li><nuxt-link  to="/mine/my-collect"><i class="itwo"></i><span>我的收藏</span></nuxt-link></li>
	                       <li><a href="javascript:;" @click="doLogout()"><i class="ithree"></i><span>退出登录</span></a></li>
	                     </ul>
	     			</div>
					</div>
				 <div class="unlogin" v-show="!userToken">
                    <nuxt-link class="btn login-lg" to="/user/login" >登录</nuxt-link>
                    <nuxt-link class="btn login-reg" to="/user/register" >注册</nuxt-link>
				</div> 
        </div>
               
		</div>
	</header>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'

export default {
  props:["pageclass"],
    data(){
	return { 
    params:{},
    route_name:'',
    category_id:0,
  }
  },
  created(){
   
  },
  // beforeMount(){
  //   if(this.userToken){
  //      this.updatePersoninfo()
  //    }
  // },
  mounted(){
  	// //页面刷新，如果存在token，页面保持登录状态
     this.fetchNavigation()
     this.fetchNoticeList()
     
  },
  computed:{
      ...mapState(['navigation','notice','personInfo','userToken','isLogin'])
  },
  
  methods:{ //页面进来发送请求
      ...mapActions({
          'fetchNavigation':'fetchNavigation',
          'fetchNotice':'fetchNotice',
          // 'fetchPersoninfo':'fetchPersoninfo',
          'logout':'logout'
      }),
      ...mapMutations(['cancelToken']),
fetchNoticeList:function(){   
		  let formDatas = new FormData();
		  formDatas.append('page', 1);
		  formDatas.append('pageSize', 5); //查前五条数据
		  this.fetchNotice(formDatas)
	  },
    // updatePersoninfo:function(){
		//   let formDatas = new FormData();
		//   formDatas.append('token', this.userToken);
		//   this.fetchPersoninfo(formDatas)
	  // },
      doLogout(){
        let formDatas = new FormData();
		    formDatas.append('token', this.userToken);
        this.logout(formDatas).then(data => {
          if(data.code==1 || data.code==105){
            this.cancelToken()
            this.$router.replace('/user/login');
          }
        })
      	// this.$store.dispatch("logout", false);
      }
  },
  // asyncData ({ store,route}) {
  //     return store.dispatch('fetchNavigation')
  // },
  
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
        cursor: pointer;}
    @keyframes rotate-anim{
      0%{transform:rotateY(0deg);}
      30%{transform:rotateY(180deg);}
      50%{transform:rotateY(180deg);}
      80%{transform:rotateY(360deg);}
      100%{transform:rotateY(360deg);}
    }
    .header{height: 88px; position: relative; top: 0; background: #fff;  z-index: 4; width: 100%;box-shadow: 0px 3px 8px 0px  rgba(92, 92, 92, 0.2);
    .logo{ width: 112px; height: 57px; overflow: hidden; margin-top: 15px; float: left;     margin-right: 50px;}
    .logo img{width: 100%;}
    .nav-list>li{ float: left;  position: relative; margin: 0 15px;padding:0;}
    .nav-list>li .i-hot{.bg-map(22px,22px,-211px, -192px); position: absolute; top: 15px; right: -6px; animation: rotate-anim 5s linear infinite; }
    


    .nav-list>li>a{font-size: 16px;display: inline-block; padding: 0px 10px; height: 88px; line-height: 88px;
     border-bottom: 3px solid transparent; color: #333; box-sizing: border-box; font-weight: bold;}
    .nav-list>li>a.nuxt-link-active{border-bottom: 3px solid #3ebb2b; font-weight: bold;}
    .nav-list>li>a.focus{color: var(--color); border-bottom: 3px solid  var(--color); font-size: 16px;}
    .nav-list>li>a:hover{color:  var(--color); border-bottom: 3px solid transparent; font-size: 16px;}
    .nav-list>li:hover .material-box{display: block;}
    .login{margin: 20px 15px 0px 0px;display: flex;
    .unlogin{margin-top: 8px}
    >.btn-notice{.bg-map(18px,18px,-774px, -172px);  display:inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
        border-radius: 14px;cursor: pointer;
        margin: 10px 6px 0 0; position: relative; padding-top: 1px;}
    .btn-notice.index{ background:#fff url(~/assets/images/bg-ico.png) no-repeat -774px -169px;}
    .btn-notice>.ul-notice{position: absolute;     top: 28px; display: none;
    left: -100px; width: 260px; padding: 10px 25px; box-sizing: border-box; background: #fff; border-radius: 8px;
    box-shadow: 0px 0px 6px 0px #d0d0d0; line-height: 44px;
    li{white-space: nowrap;width: 100%;overflow: hidden; border-bottom: 1px solid #eee; text-overflow: ellipsis;}
    li a{color: var(--grayColor);}
    li a:hover{color: var(--backColor);}
    li.all{border-bottom: none;}
    li.all a{ color: var(--backColor);}
    }
    .btn-notice>.ul-notice .all{text-align: center;}
    .btn-notice:hover>.ul-notice{display: block;}
    
        .login-lg{width: 88px; height: 32px;line-height: 32px;border: 1px solid #999; background: transparent; color: #999;font-size: 14px; margin-right: 5px;};
        .login-reg{width: 88px; height: 32px;line-height: 32px; border: 1px solid var(--color); background: linear-gradient(90deg, #2dc61d 0%, #26b216 100%); color: #fff;   font-size: 14px; border-radius: 4px; opacity: .9;};
        .login-reg:hover{opacity: 1;}
        .logined{   position: relative;padding-bottom: 20px;box-sizing: border-box;}
        .logined:hover .u-detail{display: block;}
        .logined > a { width: 50px;height: 50px; border-radius: 25px;overflow: hidden;display: flex;align-items: center;}
        .logined img{width: 100%; min-height: 100%;}
        .i-design{.bg-map(20px,20px,-25px, -193px); position: absolute;right: 0px;bottom: 18px;}
        }
        .u-detail { position: absolute; top: 55px; left: -265px; z-index: 111; display: none; padding: 20px 15px 9px; width: 300px;
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
}

    .header.index{background: rgba(255,255,255,0.14);box-shadow: none; position: absolute; top: 0; left: 0;
    .nav-list>li>a{  color: #fff; }
    .nav-list>li>a.focus{color: #fff; font-weight: bold; border-bottom: 3px solid #fff; }
    .nav-list>li>a:hover{border-bottom: 3px solid transparent;color: #fff; font-weight: bold;}
    .login{
         .login-lg{width:88px; height:32px; background:transparent; border:transparent; color:#fff;  font-size: 14px; margin-left: 5px};
         .login-reg{width:88px; height:32px; background:transparent; border:1px solid #fff; color:#fff; font-size: 14px;  };
         .login-reg:hover{ background:var(--color); border:1px solid var(--color); color:#fff; font-size: 14px;  opacity: .9;}
        }
    
}   

.material-box{
   position: absolute;
    top: 88px;
    width: 160px;
  background-color: #fff;
  left: -29px;
  border: 1px solid #e7e7e7;
  z-index: 200;
  display: none;
  .material-name{height: 50px; line-height: 50px; font-size: 16px; text-align: center; border-bottom: 1px solid #f1f1f1; }
  .material-name a{display: block; height: 100%;}
  .material-name a:hover{color: var(--color);}
  .material-name a:hover  .pull-down-box{display: block;}
}
.material-box:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
    border-top: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    top: -6px;
    left: 72px;
    background: #fff;

}
.pull-down-box {
  position: absolute;
    top: -1px;
    width: 500px;
  background-color: #fff;
  left: 160px;
  border: 1px solid #e7e7e7;
  display: none;
  z-index: 200;
  /*padding-bottom:20px;*/
}
.pull-down-box:before {
        content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(225deg);
    border-top: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    top: 20px;
    left: -7px;
    background: #fff;
}
.pull-down-box.single{width: 310px;}
.pull-down-box.double{width: 600px; padding-bottom: 15px;}
.pull-down-box .pd-top{ border-bottom: 1px solid #efeeec; display: flex;height: 50px; line-height: 50px; padding: 0px 35px;
     h3{font-size: 18px; color: var(--backColor);}
     span{font-size: 14px;margin-left: 5px; color: #666;}
}
.pull-down-box .pd-name{border-left: 3px solid transparent; padding-left: 10px; height: 14px; line-height: 14px; font-weight: bold; margin: 15px 0px 5px 30px}
.pull-down-box .pd-list{
    .main-sort {
         display: block;
        width: 155px;
        text-align: left;
        padding-left: 35px;
        line-height: 40px;
            color: #333;
        border-right: 1px solid #efeeec;
        box-sizing: border-box;
        font-size: 15px;
        float: left;
        }
    .main-sort:nth-child(2n){border-right: none;}
}
.pull-down-box.double .pd-list{padding: 0px 30px 5px;
       .main-sort {
         display: block;
        width: 90px;
        padding-left: 0;
        text-align: left;
        line-height: 30px;
            color: #333;
        border: none;
        box-sizing: border-box;
        font-size: 14px;
        float: left;
        }
}
.pull-down-box.png h3{color: var(--color);}
.pull-down-box.bjtp h3{color: var(--colorBjtp);}
.pull-down-box.ui h3{color: var(--colorUi);}
.pull-down-box.mbsc h3{color: var(--colorMbsc);}
.pull-down-box.word h3{color: var(--colorBgwd);}
.pull-down-box.syt h3{color: var(--colorSyt);}

.pull-down-box.png .main-sort:hover{color: var(--color);}
.pull-down-box.bjtp .main-sort:hover{color: var(--colorBjtp);}
.pull-down-box.ui .main-sort:hover{color: var(--colorUi);}
.pull-down-box.mbsc .main-sort:hover{color: var(--colorMbsc);}
.pull-down-box.word .main-sort:hover{color: var(--colorBgwd);}
.pull-down-box.syt .main-sort:hover{color: var(--colorSyt);}

.pull-down-box.png .pd-name{border-color: var(--color); color:var(--color);}
.pull-down-box.bjtp .pd-name{border-color: var(--colorBjtp); color: var(--colorBjtp);}
.pull-down-box.ui .pd-name{border-color: var(--colorUi); color: var(--colorUi);}
.pull-down-box.mbsc .pd-name{border-color: var(--colorMbsc); color: var(--colorMbsc);}
.pull-down-box.word .pd-name{border-color: var(--colorBgwd); color: var(--colorBgwd);}
.pull-down-box.word .pd-name a{color: var(--colorBgwd); text-align: left;}
.pull-down-box.syt .pd-name{border-color: var(--colorSyt); color:var(--colorSyt) ;}
    </style>