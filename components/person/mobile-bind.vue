<template>
<div class="about-contain">
    <form  @submit="doSubmit">
			<div class="vam vam-basic">
				<div>
					<div>手机号</div>
					<div>
						<input type="text" class="input" placeholder="请输入" v-model="mobile"/>
					</div>
				</div>
				<div>
					<div>验证码</div>
					<div>
						<input type="text" class="input verif-code" placeholder="请输入"  v-model="code" autocomplete="off"/>
            <a href="javascript:void(0)" class="btn-code" :class="{'disabled':canClick}" @click="countDown()" >{{content}}</a>
					</div>
				</div>
				
				<div>
					<div></div>
					<div>
            <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
            <button type="submit" class="btn-save">绑定</button>
					</div>
				</div>
			</div>
    </form>
		</div>
</template>
<script>
import common from '~/assets/js/common'
import {mapState, mapActions} from 'vuex'
export default {
  metaInfo: {
    title: '找回验证码'
  },

   data () {
    return {
       mobile: '',
       code: '',
      content: '获取验证码', // 按钮里显示的内容
      totalTime: 60 ,     //记录具体倒计时时间
      canClick: false, //添加canClick  判断按钮能否点击
      errorMsg: ''
    }
  },
  computed:{
      ...mapState(['userToken'])
  },
  methods:{
    ...mapActions(['checkVeriCode','fetchVeriCode','bindMobile']),
     countDown:function() {
            if (this.canClick) return  //改动的是这两行代码,限制点击
            var that=this; 
           
        if(!common.IsPhone(that.mobile)){
          // layer.msg('手机号码格式不正确', {icon: 2});
          that.errorMsg='手机号码格式不正确';
          return
        }
        let formDatas=new FormData();
         formDatas.append('mobile', that.mobile);
         formDatas.append('scene', 3);  //1注册  2找回密码 3验证手机号
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
    doSubmit (e) {
      e.preventDefault()
      
      const errMsg=this.validate()
      this.errorMsg=errMsg
      if (!errMsg) {
		  let formDatas = new FormData();
		  
      // formDatas.append('mobile',this.mobile);
		  formDatas.append('code', this.code);
      formDatas.append('token', this.userToken);
      formDatas.append('account',this.mobile);

      this.bindMobile(formDatas).then((data) => {
            if(data.code==1){
                layer.msg(data.msg, {icon: 1});
                setTimeout(() => {
                   this.$router.replace('/person/person-info');
                 }, 2000);
            }else{
              layer.msg(data.msg, {icon: 2});
            }
      })
      }
    },
    validate () {
     return common.validateMobileBind(this.mobile.trim(),this.code.trim())
  }
  }
  }
</script>
<style lang="less" scoped>
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
.about-contain {
    padding: 40px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 20px;
    min-height: 400px;
}
.vam-basic{width: 560px; margin: 0 auto;
    >div>div{padding: 10px 0; line-height: 1;}
    >div>div:first-child{width: 120px; text-align:right; padding-right: 20px; box-sizing: border-box;}
    >div>div:last-child{width: 440px;}
    .input.verif-code{width: 295px;}
.btn-code{
    .btn(137px,42px,transparent,transparent,#fff);background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%);     vertical-align: bottom;
}
.btn-code.disabled{background: #bbb; color: #fff;}
.btn-save{
    .btn(137px,48px,transparent,transparent,#fff);background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); 
}
}
</style>