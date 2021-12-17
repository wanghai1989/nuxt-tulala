<template>
<div class="laymshade login" v-if="showLogin">
			<div class="login-box clearfix">
				<i class="close" @click="close()"></i>
				<div class="login-l">
				  <h3>欢迎来到图啦啦</h3>
          <p class="p01">注册即送650满减券</p>
          <p class="p02">上传素材赚佣金</p>
          <p class="p03">分享交流提升技能</p>
          <p class="p04">接工单赚外块</p>
				</div>
				<div class="login-r">
					<div class="login">
						<img src="~/assets/images/logo02.png" />
					</div>
					<Login></Login>

				</div>
			</div>
		</div>
</template>
<script>
import Login from '~/components/person/login.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
components: {Login},
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  computed:{
	  ...mapState(['showLogin'])
  },
  methods: {
    ...mapMutations(['setShowLogin']),
  //   doSubmit () {
  //     if (this.validate()) {
  //       // 调用接口
  //       this.login({
  //         username: this.username,
  //         password: this.password
  //       })
  //         .then(() => {
  //           this.$router.replace('/app')
  //         })
  //     }
  //   },
    close(){
    this.setShowLogin(0)
    },
  // validate () {
  //     if (!this.username.trim()) {
  //       this.errorMsg = '姓名不能为空'
  //       return false
  //     }
  //     if (!this.password.trim()) {
  //       this.errorMsg = '密码不能为空'
  //       return false
  //     }
  //     this.errorMsg = ''
  //     return true
  //   }
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
    height: @height;
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
.login-box{width: 840px; position: fixed; height: 500px; top: 50%; left: 50%; margin-top: -250px; margin-left: -420px; z-index: 5; 
background: #fff; border-radius: 5px; accelerator: false; position: relative;
.login-l{width: 360px; float: left;overflow: hidden; height: 500px; background: url(../../assets/images/pic09.png) no-repeat; 
background-size: cover; padding: 50px 0px 0px; box-sizing: border-box; color: #fff; text-align: center;}
.login-l h3{font-size: 24px; margin-bottom: 60px;}
.login-l p{
    padding: 10px 30px;
    background: var(--color);
    width: 300px;
    box-sizing: border-box;
    margin: 0px auto 25px;    transform: rotate(350deg);
    border-radius: 30px;}
  .login-l p.p01{background: #c14949;}
  .login-l p.p02{background: #49c0c1;}
  .login-l p.p03{background: #c1ac49;}
  .login-l p.p04{background: #b449c1;}
.login-r{width: 480px; float: left; padding: 50px 80px; box-sizing: border-box;}
.login{text-align: center;}
.login-style{margin-top: 55px; height: 170px; }
.login-qq{.btn(100%,60px,#28b7f7,#28b7f7,#fff); border-radius: 30px; font-size: 16px; margin-top: 25px;}
.login-qq i{.bg-map(28px,26px,-501px, -42px); margin-right: 10px;}
.login-wechat{.btn(100%,60px,#05d02f,#05d02f,#fff); border-radius: 30px; font-size: 16px;}
.login-wechat i{.bg-map(28px,26px,-542px, -44px); margin-right: 10px;}
.tip{display: flex; margin-top: 40px;}
.smslogin{flex: 1; color: var(--color);}
.goreg{flex: 1; color:  var(--grayColor); text-align: right;}
.goreg a{color: var(--color);}
.input-item{border-bottom: 1px solid #d6d6d6; display: flex;    padding: 10px 0px;}
.i-phone{.bg-map(16px,20px,-506px, -79px);}
.i-sms{.bg-map(16px,20px,-538px, -78px);}
.input{border: none; flex: 1; height: 20px; line-height: 20px;    margin: 0px 10px;}
.sendsms{color: var(--color);display: inline-block; width: 100px; text-align: right;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 10px; right: 10px;}
.style01{padding-top: 23px; display: none;}
.style02{display: block;}
.btn-login{.btn(320px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
}
</style>