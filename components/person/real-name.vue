<template>
<form class="about-contain" @submit="doSubmit">
			<!--<div class="theme-title enter">基本信息</div>-->
			<div class="vam vam-basic">
				<div>
					<div><span class="cred">*</span>身份证</div>
					<div>
						<div class="idcard-img">
							<div class="img-upload front_img">
								<input type="file" class="filepath" id="front_photo" @change="changepic('front')" accept="image/jpeg,image/jpg,image/peg,image/png" >
								<div class="operate">
								<i></i><br />
								<span>身份证正面照</span>
								</div>
							</div>
							<div class="img-upload back_img">
								<input type="file" class="filepath" id="back_photo" @change="changepic('back')" accept="image/jpeg,image/jpg,image/peg,image/png" >
								<div class="operate">
								<i></i><br />
								<span>身份证反面照</span>
								</div>
							</div>
						</div>
						<div class="idcard-txt">
							证件必须是清晰彩色原件电子版本，支持jpg、png、jpeg的图片格式。
						</div>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>真实姓名</div>
					<div>
						<input type="text" class="input" placeholder="请输入" v-model="card_name"/>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>身份证号码</div>
					<div>
						<input type="text" class="input" placeholder="请输入" v-model="card_no"/>
					</div>
				</div>
				
				<div>
					<div></div>
					<div>
						<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
						<button type="submit" class="btn-save">确定</button>
            		</div>
				</div>
			</div>
			
</form>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import common from '~/assets/js/common'
import processImg from '~/assets/js/processimg'
export default {
  metaInfo: {
    title: '会员基本信息'
  },
  data () {
    return {
     errorMsg: '',
	 img_front:'',
	 img_backend:'',
	 blob_front:'',
	 blob_backend:'',
	 card_name:'',
	 card_no:''
    }
  },
  mounted(){  
			// import('layui-layer')
			// this.userInfo=JSON.parse(window.localStorage.getItem("userInfo"))
		},
computed:{
	  ...mapState(['userToken'])
  },
  methods:{
 ...mapActions({
		  saveRealname:'saveRealname'
      }),
	  	doSubmit (e) {
			e.preventDefault()
	    const errMsg=this.validate()
      if (!errMsg) {
          this.errorMsg=''
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		//   formDatas.append('identity_card_img_front', $("#front_file").get(0).files[0]);
		  formDatas.append('identity_card_img_front',this.blob_front,'xx.jpg');
		//   formDatas.append('identity_card_img_backend', $("#back_file").get(0).files[0]);
		  formDatas.append('identity_card_img_backend',this.blob_backend,'xx.jpg');
		  formDatas.append('identity_card', this.card_no);
		  formDatas.append('identity_card_name', this.card_name);
	this.saveRealname(formDatas)
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
            }
            if(data.code==1){
              layer.msg('提交成功，将在1-2个工作日完成审核！', {icon: 1});
			  setTimeout(() => {
				  this.$router.push('/person/person-info') 
			  }, 2000);
            }
          })
		  }else{
			  this.errorMsg=errMsg
		  }
  },
  async changepic(obj){
		let file=$("#"+obj+"_photo").get(0).files[0];
		if (typeof(file) == 'undefined'){
			return
		}
		const format='image/jpeg';
        let base64Img=await processImg.cutImageBase64(file,null,format,900); //上传的图片进行压缩并且合成水印
		 if(obj=='front')
		this.blob_front= processImg.base64ToBlob(base64Img,format); 
		if(obj=='back')
		this.blob_backend= processImg.base64ToBlob(base64Img,format); 
		$("."+obj+"_img").css({"background-image":"url(" + base64Img + ")","background-size":"100% 100%"});
	  }, 
//   changepic(obj){
	  
// 	  if(obj=='front')
// 		this.img_front=1
// 		if(obj=='back')
// 		this.img_backend=1
// 		var reads = new FileReader();    
// 		var f = $("#"+obj+"_file").get(0).files[0];
// 		var rep = /jpeg|png|gif|bmp/ig;
// 		var gstyle = f.type.split("/")[1];
// 		if(rep.test(gstyle)){
// 			reads.readAsDataURL(f);
// 			var that = this;
// 			reads.onload = function(e) {
// 				$("."+obj+"_img").css({"background-image":"url(" + this.result + ")","background-size":"cover"});
// 			};
// 		}
// 	  },
  validate () {
		return common.validateCard(this.blob_front,this.blob_backend,this.card_name,this.card_no)
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
    .btn-save{
    .btn(137px,48px,transparent,transparent,#fff);background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); 
}

.idcard-img{display: flex;}
.img-upload{width: 160px; height: 160px; border: 2px dashed #d4d4d4; border-radius: 4px; margin-right: 20px; overflow: hidden;
position: relative;vertical-align: middle;display: inline-block; text-align: center;  box-sizing: border-box;
.filepath{width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2;}
.operate{padding-top: 40px; position: absolute; z-index: 1; top: 0; left: 0;width: 160px; height: 160px;}
 i{.bg-map(60px,60px,-139px, -59px); margin-bottom: 12px; }

}
.idcard-txt{color: #999; margin-top: 8px; font-size: 12px;}
}
</style>