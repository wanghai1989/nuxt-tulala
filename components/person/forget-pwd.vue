<template>
  <form  class="login-style"   @submit="doSubmit">
		<div class="input-item">
			<i class="i-phone"></i>
			<input
			type="text"
			class="input"
			v-model="mobile"
			placeholder="手机号"
			>
		</div>
    <div class="input-item mt10">
      <i class="i-sms"></i>
      <input type="text" class="input sms"  placeholder="短信验证码" v-model="code" autocomplete="off"/>
        <a href="javascript:void(0)" class="btn valid-code" :class="{'disabled':canClick}" @click="countDown()" >{{content}}</a>
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
        type="password"
        class="input-login"
        placeholder="密码(6-12位字母数字组合)"
        v-model="password"
        >
      <i class="i-pwd" :class="{'show':pwdflag}" @click="togglePwd()"></i>
		</div>
		<div class="input-item mt10">
			<i class="i-sms"></i>
			<input
			type="password"
			class="input"
			v-model="confirm_password"
			placeholder="重复新密码"
			>
		</div>
		<div class="mt50">
			<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
       <button type="submit" class="btn-login">确定</button>
		</div>
		<div class="tip">
      <span class="goreg">没有账户，<router-link to="/user/login">去登录</router-link></span>
		</div>
</form>
</template>
<script>
import common from '~/assets/js/common'
import {mapState, mapActions} from 'vuex'
export default {
  metaInfo: {
    title: '会员密码修改'
  },
  data () {
    return {
      mobile: '',
      code: '',
      password:'',
      confirm_password:'',
      pwdflag:false,

      content: '获取验证码', // 按钮里显示的内容
      totalTime: 60 ,     //记录具体倒计时时间
      canClick: false, //添加canClick  判断按钮能否点击
      errorMsg: ''
    }
  },
  mounted(){

  },
  
   methods: {
    ...mapActions(['forgetPassword','checkVeriCode','fetchVeriCode']),
     countDown:function() {
            if (this.canClick) return  //改动的是这两行代码,限制点击
            var that=this; 
           
        if(!common.IsPhone(that.mobile)){
          that.errorMsg='手机号码格式不正确';
          return
        }
        let formDatas=new FormData();
         formDatas.append('mobile', that.mobile);
         formDatas.append('scene', 2);  //1注册  2找回密码 3验证手机号
        // 调用接口
        this.fetchVeriCode(formDatas)
          .then((data) => {
            if(data.code==1){
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
            }else{
               layer.msg('短信验证码获取失败，重新获取', {icon: 2});
            }
          })
        },
      togglePwd(){
      if(this.pwdflag)
      this.pwdflag=false
      else
      this.pwdflag=true
    },
    doSubmit (e) {
      e.preventDefault()
      
      const errMsg=this.validate()
      this.errorMsg=errMsg
      if (!errMsg) {
		  let formDatas = new FormData();
		  
      formDatas.append('mobile',this.mobile);
		  formDatas.append('code', this.code);
		  formDatas.append('nickname', this.nickname);
		  formDatas.append('password', this.password);
      formDatas.append('confirm_password', this.confirm_password);


      // 调用接口
        this.checkVeriCode(formDatas)
          .then((data) => {
            if(data.code==1){
              //调用接口
            this.forgetPassword(formDatas)
              .then((data) => {
                if(data.code==1){
                  layer.msg(data.msg, {icon: 1});
                }
                else{
                  layer.msg(data.msg, {icon: 2});
                }
              })
                }else{
                  layer.msg(data.msg, {icon: 2});
                }
              })
      }
    },
    validate () {
     return common.validateForgetpwd(this.mobile.trim(),this.code.trim(),this.password.trim(),this.confirm_password.trim())
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
.login-box2 .login-style{margin-top: 55px; height: auto;
.tip{display: flex; margin-top: 5px;}
.smslogin{flex: 1; color: var(--color);}
.goreg{flex: 1; color: var(--grayColor); text-align: right;}
.goreg a{color: var(--color);}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.i-email{.bg-map(18px,20px,-537px, -106px);}
.i-qq{.bg-map(16px,20px, -506px, -107px);}
.i-nickname{.bg-map(16px,20px, -569px, -100px);}
.i-pwd{.bg-map(20px,20px, -630px, -104px);}
.i-pwd.show{background-position:-666px -103px ;}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.sendsms{color: var(--color);display: inline-block; width: 100px; text-align: right;}
.valid-code{color: var(--color);    height: 20px;line-height: 20px; background: transparent;}
.valid-code.disabled{color: #b0b0b0;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
.btn-login{.btn(320px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
.btn-login:hover{opacity: 0.9;}
.quick-login{margin-top: 45px; padding: 0px 50px; box-sizing: border-box; display: flex;justify-content: space-between; text-align: center;}
.login-qq i{.bg-map(60px,60px,-588px, -129px); margin-bottom: 5px;}
.login-wechat i{.bg-map(60px,60px,-512px, -129px); margin-bottom: 5px;}
}

</style>