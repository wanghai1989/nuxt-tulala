<template>
<form  class="login-style"  @submit="doSubmit">
<div class="login-style">
			<div class="input-item">
				<i class="i-phone"></i>
				<input
					type="text"
					class="input-login"
					placeholder="手机号"
					v-model="mobile" />
			</div>
			<div class="input-item mt10">
				<i class="i-sms"></i>
				<input v-if="this.pwdflag"
          type="text"
					class="input-login"
					placeholder="密码(6-12位字母数字组合)"
					v-model="password"
					>
          <input v-else
          	autocomplete="off"
          type="password"
					class="input-login"
					placeholder="密码(6-12位字母数字组合)"
					v-model="password"
					>
          <i class="i-pwd" :class="{'show':pwdflag}" @click="togglePwd()"></i>
			</div>
			<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
			<div class="mt50">
				<button type="submit" class="btn-login"> 登录</button>
        <a class="btn-login wechat" href="javascript:void(0)" target="_bank" @click="webchatLogin()"><i></i> 微信登录</a>
			</div>
			<div class="tip">
        <router-link to="/user/forget-pwd"  class="smslogin">忘记密码？</router-link>
				<span class="goreg">没有账户，<router-link to="/user/register">立即注册</router-link></span>
			</div>
			<!-- <div class="quick-login">
				<a class="login-wechat" href="person-info.html">
					<i></i><br> 微信登录
				</a>
				 <a class="login-qq">
					<i></i><br>QQ登录
				</a> 
			</div> -->
	</div>
	</form>
</template>
<script>
import common from '~/assets/js/common'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  // metaInfo: {
  //   title: '会员登录'
  // },
  data () {
    return {
      mobile: '',
      password:'',
      pwdflag:false,
      code:'',
      errorMsg: ''
    }
  },
  mounted(){
   if(this.$route.query.code){
     this.wechatSubmit(this.$route.query.code)
   }
  },
  computed:{
     ...mapState(['showLogin'])
  },
   methods: {
    ...mapMutations(['setToken','setShowLogin']),
    ...mapActions(['login','wechatlogin','fetchPersoninfo']),
    togglePwd(){
      if(this.pwdflag)
      this.pwdflag=false
      else
      this.pwdflag=true
    },
    webchatLogin:function(){
      window.location.href= 'https://open.weixin.qq.com/connect/qrconnect?appid=wx79e8ed0c330dabe2&redirect_uri=http://www.91tula.com/index&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
     
    },
    wechatSubmit(code){
       // 调用接口
        this.wechatlogin({
          code:code
        })
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              layer.msg(data.msg, {icon: 1});
              this.setToken(data.data.token)
              this.fetchPerson(data.data.token)
              const preRouter=localStorage.getItem("preRoute")//上一个路由
              if(!preRouter && !this.showLogin){
                setTimeout(() => {
                  this.$router.replace('/mine') 
                }, 1000);
              }
              else if(this.showLogin){
                setTimeout(() => {
                  this.setShowLogin(0)
                }, 1000);
              }
              else{
                setTimeout(() => {
                  this.$router.replace(preRouter)  //跳回上一个路由
                }, 1000);
              }
            }
          })
    },
    doSubmit (e) {
      e.preventDefault()
      const errMsg=this.validate()
      if (!errMsg) {
        this.errorMsg=''
        // 调用接口
        this.login({
          mobile:this.mobile,
          password:this.password
        })
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              layer.msg(data.msg, {icon: 1});
              this.setToken(data.data.token)
              this.fetchPerson(data.data.token)
              const preRouter=localStorage.getItem("preRoute")//上一个路由
              if(!preRouter && !this.showLogin){
                setTimeout(() => {
                  this.$router.replace('/mine') 
                }, 1000);
              }
              else if(this.showLogin){
                console.log(222)
                setTimeout(() => {
                  this.setShowLogin(0)
                }, 1000);
              }
              else{
                console.log(333)
                setTimeout(() => {
                  this.$router.replace(preRouter)  //跳回上一个路由
                }, 1000);
              }
            }
          })
      }else{
        this.errorMsg=errMsg
      }
    },
    fetchPerson:function(token){
		  let formDatas = new FormData();
		  formDatas.append('token',token);

		  this.fetchPersoninfo(formDatas)
	  },
    validate () {
     return common.validateLogin(this.mobile.trim(),this.password.trim())
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
.login-style{margin-top: 55px; height: auto;
.tip{display: flex; margin-top: 5px;}
.smslogin{flex: 1; color: var(--color);}
.goreg{flex: 1; color: var(--grayColor); text-align: right;}
.goreg a{color: var(--color);}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.i-email{.bg-map(18px,20px,-537px, -106px);}
.i-qq{.bg-map(16px,20px, -506px, -107px);}
.i-pwd{.bg-map(20px,20px, -630px, -104px);}
.i-pwd.show{background-position:-666px -103px ;}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.sendsms{color: var(--color);display: inline-block; width: 100px; text-align: right;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
.btn-login{.btn(320px,42px,#17A1FF,#17A1FF,#fff); }
.btn-login.wechat{.btn(320px,42px,var(--color),var(--color),#fff); margin-top: 15px;}
// .btn-login i{.bg-map(30px,30px,-162px, -192px); margin-right: 5px;}
.btn-login.wechat i{.bg-map(30px,30px,-54px, -189px); margin-right: 5px;}
.quick-login{margin-top: 45px; padding: 0px 50px; box-sizing: border-box; display: flex;justify-content: space-between; text-align: center;}
.btn-login:hover{opacity: .9;}
.login-qq i{.bg-map(60px,60px,-588px, -129px); margin-bottom: 5px;}
.login-wechat i{.bg-map(60px,60px,-512px, -129px); margin-bottom: 5px;}
}

</style>