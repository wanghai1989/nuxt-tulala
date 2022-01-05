<template>
<div class="regist-box">
  <div class="regist-head">
    <div class="logo"><img src="~/assets/images/logo-m.png"/></div>
    <div class="tip">欢迎回来！请用手机号登录</div>
  </div>
<form  class="login-style"  @submit="doSubmit">
     <h3 class="title">登录</h3>
		
		<div class="input-item">
        <i class="iconfont">&#xe600;</i>
				<input
					type="text"
					class="input-login"
					placeholder="手机号"
					v-model="mobile" />
			</div>
			<div class="input-item mt10">
        <i class="iconfont">&#xe640;</i>
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
          <i class="iconfont" v-if="pwdflag" @click="togglePwd()">&#xe60d;</i>
          <i class="iconfont" v-else @click="togglePwd()">&#xe67d;</i>
			</div>
			<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
			<div class="mt50">
				<button type="submit" class="btn-login"> 登录</button>
        
			</div>
      <div class="tr"><span class="goreg">没有账户，<nuxt-link to="/m/mobile-register" class="cmain">立即注册</nuxt-link></span></div>
</form>
</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import common from '~/assets/js/common'
export default {
  data () {
    return {
      mobile: '',
      password:'',
      pwdflag:false,
      backUrl:'',
      code:'',
      errorMsg: ''

      
    }
  },
  mounted(){
    if(this.$route.query.backUrl){
     this.backUrl=this.$route.query.backUrl
   }
  },
   methods: {
    ...mapMutations(['setToken']),
    ...mapActions(['login','fetchPersoninfo']),
    togglePwd(){
      if(this.pwdflag)
      this.pwdflag=false
      else
      this.pwdflag=true
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
                setTimeout(() => {
                  if(this.backUrl)
                  this.$router.replace(this.backUrl)  //跳回上一个路由
                  else
                  this.$router.replace('/m/mobile-mine') 
                }, 1000);
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
.regist-head{width: 100%; height: 2.5rem; background: url(~/assets/images/pic50.png) no-repeat; background-size: cover; padding-top: .5rem; box-sizing: border-box;}
.regist-head .logo{width: 1.2rem; margin: 0 auto; text-align: center;}
.regist-head .logo img{width: 100%;}
.regist-head .tip{width: 2.5rem; color: #fff; font-size: 20px; text-align: center; position: relative; margin: .3rem auto 0; height: .3rem; line-height: .3rem;}
.regist-head .tip::before{content: ''; display: block; position: absolute;     top: .14rem;
    left: -.3rem; height: 1px; background: #fff; width: .3rem;}
.regist-head .tip::after{content: ''; display: block; position: absolute;     top: .14rem;
    right: -.3rem; height: 1px; background: #fff; width: .3rem;}

.login-style{margin-top: 30px; height: auto;padding: 0 30px 0;
h3.title{font-size: 20px; color: var(--color);margin-bottom: 20px;}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.input-item i.iconfont{font-size: 22px; line-height: 1; color: #a7a7a7;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.btn-login{.btn(100%,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
.i-pwd{.bg-map(20px,20px, -630px, -104px);}
.i-pwd.show{background-position:-666px -103px ;}
}
</style>