<template>
<div class="mine-box">
  <div class="mine-head">
     <div class="vip-head">
       <div class="vip-img">
         <img :src="personInfo.avatar" v-if="personInfo.avatar" />
         <img src='~/assets/images/defaultVip.png' v-else /> 
       </div>
       <div class="vip-txt">
         <div  class="username">{{personInfo.nickname}}(ID:{{personInfo.num}})</div>
         <div  class="tel">{{handTel(personInfo.mobile)}}</div>
       </div>
     </div>
  </div>
 <div class="coin-box">
   <div class="item integral">
     <div class="line01">
      <i class="iconfont">&#xe6a4;</i>    <span>积分</span>  
     </div>
     <div class="line02">
       400
     </div>
   </div>
   <div class="item coin">
     <div class="line01">
       <i class="iconfont">&#xe699;</i>  <span>图啦币</span>  
     </div>
     <div class="line02">
       400.00
     </div>
   </div>
 </div>
 <ul class="ul-menu">
   <li class="task" @click="pubilcTask('task/public')">
    <a href="javascript:void(0)">
      <i class="iconfont">&#xe628;</i> 发布任务
      </a>
    </li>
    <li class="public">
    <nuxt-link to="/m/mobile-taskpublic">
      <i class="iconfont">&#xec46;</i> 我的发布
      </nuxt-link>
    </li>
    <li class="accept">
    <nuxt-link to="/m/mobile-taskaccept">
      <i class="iconfont">&#xe683;</i> 我的接单
      </nuxt-link>
    </li>
    <li class="file" @click="downLoad('person/my-file')">
      <i class="iconfont">&#xe603;</i> 我的作品
    </li>
    <li class="file" @click="gosignin()">
      <i class="iconfont">&#xe62c;</i> 签到
    </li>
 </ul>

 <div class="quit-box">
   <a href="javascript:void(0)" class="btn-quit"  @click="doLogout()">退出登录</a>
 </div>
</div>
</template>
<script>
import common from '~/assets/js/common'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  metaInfo: {
    title: '我的'
  },
  data () {
    return {
      mobile: '',
      password:'',
      pwdflag:false,
      code:'',
      errorMsg: ''
    }
  },
   computed:{
      ...mapState(['personInfo','userToken','baseUrl'])
  },
  mounted(){
    if(!this.userToken){
      this.$router.push("/m/mobile-login")
      return
    }else{
      this.verifyToken(this.userToken).then(data => { 
      if(data.code==1){ //验证token是否失效
        this.updatePersoninfo()
      }else{
        this.$router.push("/m/mobile-login")
      }
      }) 
    }
    
  },
   methods: {
      ...mapMutations(['cancelToken']),
       ...mapActions({
          'logout':'logout',
          'fetchPersoninfo':'fetchPersoninfo',
          'verifyToken':'verifyToken',
		      'fetchsignIn':'fetchsignIn'
      }),
      gosignin:function(){
                if(!this.userToken){
                    this.$router.push('/m/mobile-login')
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
                            layer.msg('签到成功，获得5积分！！', {icon: 1});
                        }
                    })
            },
      pubilcTask:function(url){
      let _that=this
       let fullpath=this.baseUrl+url
       layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div style="color:#333333"><div style="color:#999999">请移步电脑端操作</div>网址：'+fullpath+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    _that.copyContent(url);
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
    },
    copyContent(url){ 
		//创建一个input元素
      let input = document.createElement('input') 
      //给input的内容复制
      let invitelink=this.baseUrl+url
      input.value = invitelink
      // 在body里面插入这个元素
      document.body.appendChild(input)   
      // 选中input里面内容
      input.select()  
      //执行document里面的复制方法
      document.execCommand("Copy") 
      // 复制之后移除这个元素
      document.body.removeChild(input)

	  layer.msg('已复制成功哦~', {icon: 1});
	  
    },
      handTel:function(tel){
        return common.handleTel(tel)
      },
      updatePersoninfo:function(){
		  let formDatas = new FormData();
      // console.log(this.userToken)
		  formDatas.append('token', this.userToken);
		  this.fetchPersoninfo(formDatas)
	  },
     doLogout(){
        let formDatas = new FormData();
		    formDatas.append('token', this.userToken);
        this.logout(formDatas).then(data => {
          if(data.code==1 || data.code==105){
            this.cancelToken()
            this.$router.replace('/m/mobile-login');
          }
        })
      	// this.$store.dispatch("logout", false);
      },
    downLoad:function(url){
       let _that=this
       let fullpath=this.baseUrl+url
       layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>请移步电脑端下载 </br>网址：'+fullpath+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                    _that.copyContent(url)
                  }
                });
    },
    copyContent(url){ 
		//创建一个input元素
      let input = document.createElement('input') 
      //给input的内容复制
      let invitelink=this.baseUrl+url
      input.value = invitelink
      // 在body里面插入这个元素
      document.body.appendChild(input)   
      // 选中input里面内容
      input.select()  
      //执行document里面的复制方法
      document.execCommand("Copy") 
      // 复制之后移除这个元素
      document.body.removeChild(input)

	  layer.msg('已复制成功哦~', {icon: 1});
	  
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
.mine-box{background:#f2f2f2;  min-height: 100vh; box-sizing: border-box; padding-bottom: 80px;}
.mine-head{background: url('~/assets/images/pic53.png') no-repeat; width: 100%; height: 2rem;min-height: 180px; background-size: cover;    padding: .3rem 0.15rem;
    box-sizing: border-box;color: #fff; }
.vip-head{display: flex; }
.vip-img{    width: 0.6rem;    margin-right: 10px;
    height: 0.6rem; border-radius: 32px; overflow: hidden;}
.vip-img img{width: 100%; min-height: 100%;}
.vip-txt{flex: 1;}
.vip-txt .username{font-size: 20px; }
.vip-txt .tel{font-size: 14px; color: #f0f0f0;}
.coin-box {display: flex; padding: 0px .15rem; margin-top: -.8rem;}
.coin-box .item{flex: 1; height: auto; background: #fff; border-radius: 4px; padding: 10px 15px; box-sizing: border-box;}
.coin-box .item.integral{margin-right: 15px;}
.coin-box .item.integral i{font-size: 40px; line-height: 1; color: #d4237a; }
.coin-box .item.coin i{font-size: 40px; line-height: 1; color: #f2d857; }
.coin-box .line01 span{font-size: 14px; color: var(--grayColor);}
.coin-box .line02{font-size: 18px; color: var(--backColor);    margin-top: 5px;}
.ul-menu{padding: 0rem .15rem; background: #fff;    margin-top: 30px;
 li{border-bottom: 1px solid #eee; padding: 15px 0px; font-size: 15px; color: var(--backColor); height: 30px; line-height: 30px; position: relative;} 
 li>a{display: block;}
 li.task i{font-size: 22px; margin-right: 6px; color: #d5001b;}
 li.public i{font-size: 22px; margin-right: 6px; color: #1296db;}
 li.file i{font-size: 22px; margin-right: 6px; color: #d4237a;}
 li.accept i{font-size: 22px; margin-right: 6px; color: #e0620d;}
 li:after{ .bg-map(10px,16px,-638px, -198px); position: absolute; top: 23px; right: 0px; content: ''; display: block; }
}
.quit-box{padding: .15rem; margin-top: 30px;}
.btn-quit{.btn(100%,42px,var(--redColor),var(--redColor),#fff); }
.btn-quit:hover{opacity: 0.9;}
</style>