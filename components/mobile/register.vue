<template>
<div class="regist-box">
  <div class="regist-head">
    <div class="logo"><img src="~/assets/images/logo-m.png"/></div>
    <div class="tip">注册即送650元满减券</div>
  </div>
<form  class="login-style"  @submit="doSubmit">
     <h3 class="title">新用户注册</h3>
		<div class="input-item">
      <i class="iconfont">&#xe6e7;</i>
			<input
			type="text"
			class="input"
			placeholder="昵称"
			v-model="nickname"
			>
     </div> 
		<div class="input-item mt10">
      <i class="iconfont">&#xe600;</i>
			<input
			type="text"
			class="input"
			placeholder="手机号"
			v-model="mobile"
      autocomplete="off"
			>
      
		</div>

    <div class="input-item mt10">
      <i class="iconfont">&#xe640;</i>
			<input
			type="text"
			class="input"
			placeholder="验证码"
			v-model="validcode"
      autocomplete="off"
			>
      <a href="javascript:void(0)" class="btn valid-code" :class="{'disabled':canClick}" @click="countDown()" >{{content}}</a>
		</div>
		<div class="input-item mt10">
      <i class="iconfont">&#xe640;</i>
			<input
			type="password"
			class="input"
			placeholder="密码"
			v-model="password"
      autocomplete="new-password"
			>
		</div>
		<div class="input-item mt10">
       <i class="iconfont">&#xe640;</i>
			<input
			type="password"
			class="input"
			placeholder="重复密码"
			v-model="confirm_password"
			>
		</div>
    <div class="input-item mt10" v-show="isInvite">
      <i class="iconfont">&#xe683;</i>
			<input
			type="text"
			class="input"
			placeholder="邀请码(非必填)"
			v-model="be_invited_code"
			>
		</div>
		
		<div class="mt10 f14">
      <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
      <br/>
      
        <label class="my_protocol">
              <input class="input_agreement_protocol" type="checkbox" @click = "checkbox($event)"/>
              <span></span>阅读并同意  <nuxt-link :to="{ path:'/m/mobile-agreement', query:{id:1}}" target="_blank" tag="a">《图啦啦用户协议》</nuxt-link> 
              <nuxt-link :to="{ path:'/m/mobile-agreement', query:{id:2}}" target="_blank" tag="a" >《版权声明》</nuxt-link>
        </label>
      <button type="submit" class="btn-login">注册</button>
      <div class="tr"><span class="goreg">已有账户，<nuxt-link to="/m/mobile-login" class="cmain"  >立即登录</nuxt-link></span></div>
		</div>
</form>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import common from '~/assets/js/common'
export default {
  data () {
    return {
      dis:false,
      mobile: '',
      validcode:'',
      code: '',
      nickname: '',
      password:'',
      confirm_password:'',
      be_invited_code:'',
      isInvite:0,
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60 ,     //记录具体倒计时时间
      canClick: false, //添加canClick  判断按钮能否点击
      errorMsg: ''

      
    }
  },
  mounted(){
    // import('layui-layer')
    if(this.$route.query.invite_code){
      this.be_invited_code=this.$route.query.invite_code
    }
  },
   methods: {
    ...mapActions(['register']),
  checkbox(event){
            this.dis = event.target.checked
       },
  countDown:function() {
            if (this.canClick) return  //改动的是这两行代码,限制点击
            var that=this; 
           
        if(!common.IsPhone(that.mobile)){
          that.errorMsg='手机号码格式不正确';
          return
        }
            this.canClick = true
            that.content = that.totalTime + 's' //这里解决60秒不见了的问题
            let cloak = setInterval(function () {
              that.totalTime--
              if (that.totalTime > 0) {
                that.content = that.totalTime + 's'
              }
              if (that.totalTime <= 0) {     //当倒计时小于等于0时清除定时器
                window.clearInterval(cloak)
                that.content = '重新发送';
                that.totalTime = 60;
                that.canClick = false  //这里重新开启
              }
            }, 1000)
          
        },

    doSubmit (e) {
      e.preventDefault()
      if(!this.dis){
        layer.msg('你还未勾协议', {icon: 2});
        return
      }
      const errMsg=this.validate()
      this.errorMsg=errMsg
      if (!errMsg) {
		  let formDatas = new FormData();
		  
      formDatas.append('mobile',this.mobile);
		  formDatas.append('code', 123456);
		  formDatas.append('nickname', this.nickname);
		  formDatas.append('password', this.password);
      formDatas.append('confirm_password', this.confirm_password);
      formDatas.append('be_invited_code', this.be_invited_code);
        // 调用接口
        this.register(formDatas)
          .then((data) => {
            if(data.code==1){
              layer.msg(data.msg, {icon: 1});
            }
            else{
              layer.msg(data.msg, {icon: 2});
            }
          })
      }
    },
    validate () {
     return common.validateReg(this.nickname.trim(),this.mobile.trim(),this.password.trim(),this.confirm_password.trim())
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
.regist-box{background:#fff;  min-height: 100vh; box-sizing: border-box; padding-bottom: 30px;}
.regist-head{width: 100%; height: 250px; background: url(~/assets/images/pic50.png) no-repeat; background-size: 100% 100%; padding-top: 40px; box-sizing: border-box;}
.regist-head .logo{width: 120px; margin: 0 auto; text-align: center; font-size: 14px;}
.regist-head .logo img{width: 100%;}
.regist-head .tip{width: 220px; color: #fff; font-size: 20px; text-align: center; position: relative; margin: 30px auto 0; height: 30px; line-height: 30px;}
.regist-head .tip::before{content: ''; display: block; position: absolute;     top: 14px;
    left: -50px; height: 1px; background: #fff; width: 50px;}
.regist-head .tip::after{content: ''; display: block; position: absolute;     top: 14px;
    right: -50px; height: 1px; background: #fff; width: 50px;}
.login-style{margin-top: 30px; height: auto;padding: 0 30px 0;
h3.title{font-size: 20px; color: var(--color);margin-bottom: 20px;}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.input-item i.iconfont{font-size: 22px; line-height: 1; color: #a7a7a7;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.i-email{.bg-map(18px,20px,-537px, -106px);}
.i-qq{.bg-map(16px,20px, -506px, -107px);}
.i-invite{.bg-map(20px,20px, -598px, -101px);}
.i-nickname{.bg-map(18px,20px, -569px, -100px);}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.sendsms{color: var(--color);display: inline-block; width: 100px; text-align: right;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
.btn-login{.btn(100%,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
.quick-login{margin-top: 45px; padding: 0px 50px; box-sizing: border-box; display: flex;justify-content: space-between; text-align: center;}
.login-qq i{.bg-map(60px,60px,-588px, -129px); margin-bottom: 5px;}
.login-wechat i{.bg-map(60px,60px,-512px, -129px); margin-bottom: 5px;}
.valid-code{color: var(--color);    height: 20px;line-height: 20px; background: transparent;}
.valid-code.disabled{color: #b0b0b0;}
}
.usercontract{ font-size: 12px; color: var(--grayColor); margin-bottom: 5px;}
.usercontract a{ color: var(--grayColor); text-decoration: underline;}
</style>