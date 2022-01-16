<template>
    <div class="step-cont">
      <div class="tip" v-show="!personInfo.is_complete_my_info">
		 				<i></i>您的个人信息还未完善，请先前往<nuxt-link class="cmain"  :to="{path:'/mine/basic-info',query:{backUrl:currentPath}}">完善个人信息</nuxt-link>
		 	</div>
       <div class="tip" v-show="!personInfo.is_binding_mobile">
		 				<i></i>您的手机号还未认证，请先前往<nuxt-link class="cmain" :to="{path:'/mine/mobile-bind',query:{backUrl:currentPath}}">手机认证</nuxt-link>
		 	</div>
       <div class="tip" v-show="personInfo.certification==0 || personInfo.certification==3">
		 				<i></i>您的身份证还未认证，请先前往<nuxt-link class="cmain" :to="{path:'/mine/real-name',query:{backUrl:currentPath}}">实名认证</nuxt-link>
		 	</div>
       <div class="tip" v-show="personInfo.certification==2">
		 				<i></i>您的身份认证暂未审核通过，请耐心等待
		 	</div>
    	<form @submit="doSubmit">
        <p class="little-title">设计师信息</p>
         <div class="vam vip-info">
	  				<div>
	  					<div class="l"><span class="cred">*</span>设计师照片</div>
	  					<div class="r">
	  						<div class="img-upload design_img">
								<input type="file" class="filepath" id="design_photo" @change="changepic()" accept="image/jpeg,image/jpg,image/peg,image/png" >
								<div class="operate">
								<i></i>
								</div>
							</div>
	  					</div>
	  				</div>
            <div>
	  					<div class="l"><span class="cred">*</span>设计师标签</div>
	  					<div class="r">
                <textarea  class="area" v-model="designer_target" rows="2"></textarea>
                <p>标签用逗号“，”隔开，标签不超过 <span class="cred">6</span> 个</p>
	  					</div>
	  				</div>
            <div>
	  					<div class="l"><span class="cred">*</span>获知渠道</div>
	  					<div class="r">
	  						<select class="select" v-model="channel">
                  <option value="">请选择</option>
	  							<option v-for="item in defaultchannel" :value="item.id" :key="item.id">
	  								{{item.name }}
                   				</option>
	  						</select>
                <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
	  					</div>
	  				</div>
         </div>
          <p class="little-title">打款信息</p>
	  			<div class="vam vip-info">
	  				<div>
	  					<div class="l"><span class="cred">*</span>开户名</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="account_name"/>
	  					</div>
	  				</div>
	  				<!-- <div>
	  					<div class="l"><span class="cred">*</span>手机号</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="mobile"/>
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>QQ</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="qq"/>
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>电子邮箱</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="email"/>
	  					</div>
	  				</div> -->
            <div>
	  					<div class="l"><span class="cred">*</span>开户银行</div>
	  					<div class="r">
                <select id="ly-bank-name" class="select" v-model="account_bank">
                  <option value="">请选择</option>
                  <option v-for="item in setting" :value="item.id" :key="item.id">{{item.value}}</option>
                </select>
	  					</div>
	  				</div>
            <div>
	  					<div class="l"><span class="cred">*</span>银行卡号</div>
	  					<div class="r">
                <input class="input" type="text" v-model="bank_num" />
	  					</div>
	  				</div>
	  				
	  				<div>
	  					<div></div>
	  					<div class="r">
	  						<button type="submit"  class="btn-enter" :disabled = "!dis">下一步</button>
						 </div>
	  				</div>
	  				<div>
	  					<div></div>
	  					<div class="r">
	  						<label class="my_protocol">
							      <input class="input_agreement_protocol" type="checkbox" @click = "checkbox($event)"/>
							      <span></span>阅读并同意<nuxt-link :to="{ path:'/agreement', query:{id:10}}" class="cmain"  target="_blank">《上传声明》</nuxt-link>和
                     <nuxt-link :to="{ path:'/agreement', query:{id:7}}" class="cmain"  target="_blank">《供稿协议》</nuxt-link>
                    
							</label>
	  						
	  						
	  				</div>
	  			</div>
	  		</div>
	  		</form>
	  	</div>
</template>
<script>
import common from '~/assets/js/common'
import processImg from '~/assets/js/processimg'
import { mapState,mapActions} from 'vuex'
export default {
 data () {
    return {
      currentPath:'',
      real_name: '',
      mobile: '',
      qq:'',
      email:'',
      channel:'',
      account_name:'',
      account_bank:'',
      blob_design:'',
      designer_target:'',
      bank_num:'',
      dis:false, //是否选中协议
      errorMsg: ''
    }
  },
  computed:{
      ...mapState(['defaultchannel','setting','personInfo','userToken'])
  },
   mounted(){
     this.currentPath=this.$route.path
    this.getChannel({token:this.userToken})
    this.fetchSet()
  },
  methods: {
    ...mapActions({
        settleInOne: 'settleInOne',
        getChannel:'fetchDefaultChannel',
        fetchSetting:'fetchSetting'

     }),
     async changepic(oj){
		let file=$("#design_photo").get(0).files[0];
		if (typeof(file) == 'undefined'){
			return
		}
		const format='image/jpeg';
        let base64Img=await processImg.cutImageBase64(file,null,format,900); //上传的图片进行压缩并且合成水印
		this.blob_design= processImg.base64ToBlob(base64Img,format); 
		$(".design_img").css({"background-image":"url(" + base64Img + ")","background-size":"100% 100%"});
	  }, 
    checkbox(event){
            this.dis = event.target.checked
       },
      fetchSet(){
      let formDatas = new FormData();
		  formDatas.append('type', 3);

		  this.fetchSetting(formDatas)
},
    doSubmit (e) {
      e.preventDefault()
      
      if(!this.personInfo.is_complete_my_info){
        layer.msg('请先完善个人信息！！', {icon: 2});
        setTimeout(() => {
                  this.$router.push('/mine/basic-info') 
                }, 1500);
        return
      }
      if(!this.personInfo.is_binding_mobile){
        layer.msg('请先绑定手机号！！', {icon: 2});
        setTimeout(() => {
          this.$router.push('/mine/mobile-bind') 
                }, 1500);
        return
      }
      if(this.personInfo.certification==0 || this.personInfo.certification==3){
        layer.msg('请先实名认证！！', {icon:2});
        setTimeout(() => {
          this.$router.push('/mine/real-name') 
                }, 1500);
        return
      }
      if(this.personInfo.certification==2){
        layer.msg('实名认证暂未审核通过，请耐心等待！！', {icon:2});
        return
      }
      if(!this.dis){
        layer.msg('你还未勾协议', {icon: 2});
        return
      }
      const errMsg=this.validate()
      this.errorMsg=errMsg
      if (!errMsg) {
        let formDatas = new FormData();
        // let keywordarr=this.designer_target.split('，')
        formDatas.append('token', this.userToken);
        formDatas.append('designer_img',this.blob_design,'xx.jpg');
        // for(var item in keywordarr){
        //   formDatas.append('designer_target[]',keywordarr[item]);
        // }
        formDatas.append('designer_target',this.designer_target);
        formDatas.append('real_name','张三');
        formDatas.append('mobile', '15988888888');
        formDatas.append('qq', '349188888');
        formDatas.append('email', '349188888@qq.com');
        formDatas.append('channel', this.channel);
        formDatas.append('account_name', this.account_name);
        formDatas.append('account_bank', this.account_bank);
        formDatas.append('bank_num', this.bank_num);
        // 调用接口
        this.settleInOne(formDatas)
          .then((data) => {
            console.log(data)
             if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              this.personInfo.designer_status='104' //改变入驻状态
              // localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
              layer.msg(data.msg, {icon: 1});
              }
              setTimeout(() => {
                  this.$router.replace('/enter/design-egg')
              }, 2000);
            
          })
      }else{
      	this.errorMsg=errMsg
      }
    },
     validate () {
     return common.validateStepOne(
      this.dis,
      this.account_name,
      this.account_bank,
      this.bank_num,
      this.channel
       )
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

.step-cont{
.tip {font-size: 14px; height: 16px; line-height: 16px;margin: 0px 0px 20px 120px; color: var(--grayColor);}
.tip i{.bg-map(16px,16px,-999px, -44px); margin-right: 6px; vertical-align: text-bottom;}
.little-title{font-size: 18px; color: var(--backColor); font-weight: bold;    margin: 30px 0px 15px 120px;}
.step-tit{ padding: 25px;text-align: center;
     ul{width: 820px; height: 158px; background: url(~/assets/images/pic10.png) no-repeat center; font-size: 20px; padding-top: 47px; 
      margin: 0 auto; box-sizing: border-box;}
     ul li{float: left; width: 120px;  margin-left: 77px;}
     ul li.focus{color: var(--color);}
}
.step-line{width: 100%; height: 6px;background-image: linear-gradient(180deg, 
        #f5f5f5 0%, 
        #fff 100%);}

  .vip-info .l{color: var(--backColor); text-align: right; width: 185px;}
  .vip-info .r{padding: 10px 0px 10px 12px; }
  .input,.select{width: 400px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
  textarea.area{width: 400px; border: 1px solid #d0d0d0;text-indent: 5px;}
  .btn-enter{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 4px; margin-top: 30px;}
.btn-enter:hover{opacity: 0.9;}


}
.img-upload{width: 160px; height: 160px; border: 2px dashed #d4d4d4; border-radius: 4px; margin-right: 20px; overflow: hidden;
position: relative;vertical-align: middle;display: inline-block; text-align: center;  box-sizing: border-box;
.filepath{width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2;}
.operate{padding-top: 50px; position: absolute; z-index: 1; top: 0; left: 0;width: 160px; height: 110px;}
 i{.bg-map(60px,60px,-139px, -59px); margin-bottom: 12px; }

}

</style>