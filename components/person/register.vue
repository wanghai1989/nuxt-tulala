<template>
  <form  class="login-style"  @submit="doSubmit">
		<div class="input-item">
			<i class="i-nickname"></i>
			<input
			type="text"
			class="input"
			placeholder="昵称（不填随机生成）"
			v-model="nickname"
			>
     </div> 
		<div class="input-item mt10">
			<i class="i-phone"></i>
			<input
			type="text"
			class="input"
      onkeyup="this.value=this.value.replace(/\D/g,'')"
			placeholder="手机号"
			v-model="mobile"
      autocomplete="off"
			>
      
		</div>

    <div class="input-item mt10">
			<i class="i-sms"></i>
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
			<i class="i-sms"></i>
			<input v-if="this.pwdflag"
          type="text"
					class="input-login"
					placeholder="密码(6-12位字母数字组合)"
					v-model="password" 
					>
          <input v-else
          type="password" autocomplete="off"
					class="input-login"
					placeholder="密码(6-12位字母数字组合)"
					v-model="password"
					>
      <i class="i-pwd" :class="{'show':pwdflag}" @click="togglePwd()"></i>
		</div>
		<div class="input-item mt10">
			<i class="i-sms"></i>
			<input
			type="password" autocomplete="off"
			class="input"
			placeholder="重复密码"
			v-model="confirm_password"
			>
		</div>
    <div class="tr" v-if="!show_invited_code">
      <a href="javascript:void(0)" @click="showInvite()" class="cmain">显示邀请码</a> 
    </div>
    <div class="input-item mt10" v-show="show_invited_code">
			<i class="i-invite"></i>
			<input
			type="text"
			class="input"
			placeholder="邀请码(非必填)"
			v-model="be_invited_code"
			>
		</div>
		
		<div class="mt10">
      <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
      <br/>
      
        <label class="my_protocol">
              <input class="input_agreement_protocol" type="checkbox" @click = "checkbox($event)"/>
              <span></span>阅读并同意  <nuxt-link :to="{ path:'/agreement', query:{id:1}}"  target="_blank" tag="a">《图啦啦用户协议》</nuxt-link>和 
              <nuxt-link :to="{ path:'/agreement', query:{id:2}}"  target="_blank" tag="a">《版权声明》</nuxt-link>
        </label>
      <button type="submit" class="btn-login">注册</button>
		</div>
		<div class="tip">
			<span class="goreg">已有账户，<nuxt-link to="/user/login">去登录</nuxt-link></span>
		</div>
</form>
</template>
<script>
import common from '~/assets/js/common'
import {mapState, mapActions, mapMutations} from 'vuex'
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
      pwdflag:false,
      show_invited_code:0,
      content: '获取验证码', // 按钮里显示的内容
      totalTime: 60 ,     //记录具体倒计时时间
      canClick: false, //添加canClick  判断按钮能否点击
      errorMsg: ''

      
    }
  },
  mounted(){
    if(this.$route.query.invite_code){
      this.show_invited_code=1
      this.be_invited_code=this.$route.query.invite_code
    }
  },
   methods: {
    ...mapMutations(['setToken','setShowLogin']),
    ...mapActions(['register','fetchPersoninfo','fetchVeriCode','checkVeriCode']),
    checkbox(event){
            this.dis = event.target.checked
       },
  showInvite:function() {
    this.show_invited_code=1
  },
  countDown:function() {
            if (this.canClick) return  //改动的是这两行代码,限制点击
            var that=this; 
           
        if(!common.IsPhone(that.mobile)){
          that.errorMsg='手机号码格式不正确';
          return
        }
        console.log(that.mobile)
        let formDatas=new FormData();
         formDatas.append('mobile', that.mobile);
         formDatas.append('scene', 1);  //1注册  2找回密码 3验证手机号
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
               layer.msg(data.msg, {icon: 2});
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
      // console.log(common.randomWord(true,4,6))

      if(!this.dis){
        layer.msg('你还未勾协议', {icon: 2});
        return
      }
      const errMsg=this.validate()
      this.errorMsg=errMsg
      if (!errMsg) {
		  let formDatas = new FormData();
      formDatas.append('mobile',this.mobile);
		  formDatas.append('code', this.validcode);
		  formDatas.append('nickname', this.nickname?this.nickname:common.randomWord(true,4,6)); //昵称不填则系统生成
		  formDatas.append('password', this.password);
      formDatas.append('confirm_password', this.confirm_password);
      formDatas.append('be_invited_code', this.be_invited_code);

      // 调用接口
        this.checkVeriCode(formDatas)
          .then((data) => {
            if(data.code==1){
              // 调用接口
              this.register(formDatas)
                .then((data) => {
                  console.log(data)
                  if(data.code==1){
                    layer.msg(data.msg, {icon: 1});
                    this.setToken(data.data.token)
                    this.fetchPerson(data.data.token)
                      setTimeout(() => {
                        this.$router.replace('/mine') 
                      }, 1000);
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
    fetchPerson:function(token){
		  let formDatas = new FormData();
		  formDatas.append('token',token);

		  this.fetchPersoninfo(formDatas)
	  },
    validate () {
     return common.validateReg(this.mobile.trim(),this.password.trim(),this.confirm_password.trim())
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
.login-box2 .login-style{margin-top: 50px; height: auto;
.tip{display: flex; margin-top: 5px;}
.smslogin{flex: 1; color: var(--color);}
.goreg{flex: 1; color: var(--grayColor); text-align: right;}
.goreg a{color: var(--color);}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.i-email{.bg-map(18px,20px,-537px, -106px);}
.i-qq{.bg-map(16px,20px, -506px, -107px);}
.i-invite{.bg-map(20px,20px, -598px, -101px);}
.i-nickname{.bg-map(18px,20px, -569px, -100px);}
.i-pwd{.bg-map(20px,20px, -630px, -104px);}
.i-pwd.show{background-position:-666px -103px ;}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.sendsms{color: var(--color);display: inline-block; width: 100px; text-align: right;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
.btn-login{.btn(320px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
.btn-login:hover{opacity: 0.9;}
.quick-login{margin-top: 45px; padding: 0px 50px; box-sizing: border-box; display: flex;justify-content: space-between; text-align: center;}
.login-qq i{.bg-map(60px,60px,-588px, -129px); margin-bottom: 5px;}
.login-wechat i{.bg-map(60px,60px,-512px, -129px); margin-bottom: 5px;}
.valid-code{height: 20px;line-height: 20px; background: transparent; font-size: 14px;}
.valid-code.disabled{color: #b0b0b0;}
}
.usercontract{ font-size: 12px; color: var(--grayColor); margin-bottom: 5px;}
.usercontract a{ color: var(--grayColor); text-decoration: underline;}
</style>