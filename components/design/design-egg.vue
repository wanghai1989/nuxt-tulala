<template>
      <form @submit="doSubmit">
	  		<div class="step-cont">
	  			<div class="pic-title">
	  				<span class="cred">*</span>设计方向<span class="f14 cgray">(单选)</span> 
	  			</div>
	  			<div class="direction">
	  				<a href="javascript:;" @click="categoryClick(item.id)" :class="{focus:item.id==isActive}"  v-for="item in category"  :value="item.id" :key="item.id">{{item.name}}</a>
	  			</div>
	  			<div class="pic-title mt30">
	  					<span class="cred">*</span>样品上传<span class="f14 cgray">(上传所选设计方向的原创设计作品)</span> 
	  			</div>
	  			<div class="pics">
	  				<div class="item-pic">
			            <i class="i-add"></i>
                        <input  type="file" class="filepath" id="img_photo1"  accept="image/jpeg,image/jpg,image/peg,image/png"   @change="uploadImg('img_photo1')" >
						<img  src='~/assets/images/transparent.png'  width="" id="view_img_photo1" />
	  					<div class="cblack mt10">作品一</div>
	  				</div>
	  				<div class="item-pic">
			            <i class="i-add"></i>
                        <input  type="file" class="filepath" id="img_photo2"  accept="image/jpeg,image/jpg,image/peg,image/png"   @change="uploadImg('img_photo2')">
						<img  src='~/assets/images/transparent.png'  width="" id="view_img_photo2" />
	  					<div class="cblack mt10">作品二</div>
	  				</div>
	  				<div class="item-pic">
			            <i class="i-add"></i>
                        <input  type="file" class="filepath" id="img_photo3"  accept="image/jpeg,image/jpg,image/peg,image/png"  @change="uploadImg('img_photo3')">
						<img   src='~/assets/images/transparent.png' width="" id="view_img_photo3" />
	  					<div class="cblack mt10">作品三</div>
	  				</div>
	  			</div>
          
	  			<div class="mt70">
            <div class="error-msg mb10" v-show="errorMsg">{{errorMsg}}</div>
            <button type="submit"  class="btn-submit">提交</button>
	  			</div>
	  			
	  			
	  			<div class="tip-box">
	  				<div class="title">
	  					<i></i>小提示
	  				</div>
	  				<div class="txt">
	  					1. 上传3张不同风格的原创设计作品； <br>
              2. 设计师请上传完整的jpg、jpeg或png格式原创作品; <br>
              3. 务必提交与 “设计方向”相关的作品； <br>
              4. 上传单个图片作品大小控制在 20MB 之内。
	  				</div>
	  			</div>
	  	</div>
      </form>
</template>
<script>
import { mapState,mapActions} from 'vuex'
import common from '~/assets/js/common'
import processImg from '~/assets/js/processimg'
export default {
 data () {
    return {
    isActive:0,
    // userInfo:{},
    // token:'',
    img_one:'',
    img_two:'',
    img_three:'',
      errorMsg: ''
    }
  },
  computed:{
      ...mapState(['category','personInfo','userToken'])
  },
   mounted(){
    //  import('layui-layer')
    // this.token=window.localStorage.getItem("token")
     this.fetchCategory({token:this.userToken})
    
						if(this.personInfo.designer_status=='100'){
              this.$router.replace('/enter/design-basic')
            }
            if(['101','102','103'].includes(this.personInfo.designer_status)){
              this.$router.replace('/enter/design-result')
            }
  },
  methods: {
    ...mapActions({
        fetchCategory: 'fetchCategory',
        upImage:'upImage',
        settleInTwo: 'settleInTwo'
     }),
    doSubmit (e) {
      e.preventDefault()
      

      const errMsg=this.validate()
      if (!errMsg) {
        this.errorMsg=''
        // 调用接口
        let formData = new FormData();
        formData.append('categorys_id', this.isActive);
        formData.append('token', this.userToken);
        formData.append('img_one', this.img_one);
        formData.append('img_two', this.img_two);
        formData.append('img_three', this.img_three);
        this.settleInTwo(formData)
          .then((data) => {
             if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              // this.personInfo.designer_status='101' //改变入驻状态
              // localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
              layer.msg(data.msg, {icon: 1});
              }
            this.$router.replace('/enter/design-result')
          })
      }else{
      	this.errorMsg=errMsg
      }
    },
   async uploadImg(id){ 
       let file=$("#"+id).get(0).files[0];
       if (typeof(file) == 'undefined'){
        return
      }
       const format='image/jpeg';
        let base64Img=await processImg.cutImageBase64(file,null,format,1920); //上传的图片进行压缩并且合成水印
        let blob= processImg.base64ToBlob(base64Img,format);  //转成blob格式的文件

        // $("#view_"+id).attr("src",base64Img)
        let formData = new FormData();
        formData.append('file', blob,'xx.jpg');
        formData.append('token', this.userToken);
        this.upImage(formData)
          .then((data) => {
            console.log(data)
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              $("#view_"+id).attr("src",base64Img)
              if(id=='img_photo1')
                this.img_one=data.data.file_path
              if(id=='img_photo2')
                this.img_two=data.data.file_path
              if(id=='img_photo3')
              this.img_three=data.data.file_path

              layer.msg(data.msg, {icon: 1});
            }
          })
     },
	 categoryClick(index) {
                    this.isActive = index
                },
     validate () {
     return common.validateStepTwo(
       this.isActive,
      this.img_one,
      this.img_two,
      this.img_three
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
.enter-box{width: 100%; background: #fff;margin-top: 30px;
.step-tit{ padding: 25px;text-align: center;
     ul{width: 820px; height: 158px; background: url(~/assets/images/pic10.png) no-repeat center; font-size: 20px; padding-top: 47px; 
      margin: 0 auto; box-sizing: border-box;}
     ul li{float: left; width: 120px;  margin-left: 77px;}
     ul li.focus{color: var(--color);}
}
.step-line{width: 100%; height: 6px;background-image: linear-gradient(180deg, 
        #f5f5f5 0%, 
        #fff 100%);}
.step-cont{width: 820px; margin: 0 auto; padding: 50px 0px;
  .pic-title{font-size: 16px; color: var(--backColor); margin-bottom: 10px;}
  .direction a{.btn(120px,42px,#d0d0d0,transparent,#333); margin-right: 15px;}
  .direction a.focus,direction a:hover{.btn(120px,42px,var(--color),transparent,var(--color)); margin-right: 15px;}
  .pics{display: flex;}
  .item-pic{ width: 160px; height: 160px; border: 1px solid #d0d0d0; display: inline-block;
   margin-right: 15px; text-align: center; position: relative; }
   .item-pic .i-add{.bg-map(48px,48px,-869px, -40px); position: absolute; top: 56px; left: 56px; z-index: 1;} 
   .item-pic .filepath { width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2;}
    .item-pic img{position: absolute; top: 0; left: 0; width: 100%; height: 100%;  z-index: 0; }
  .btn-up{.btn(137px,48px,#d0d0d0,transparent,var(--backColor));}
  .btn-up:hover{opacity: 0.9;}
  .btn-submit{.btn(137px,48px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff);} 
  .btn-submit:hover{opacity: 0.9;}
   .tip-box{width: 100%; background-color: #fafafa; border: solid 1px #eeeeee; padding: 30px 30px; box-sizing: border-box; margin-top: 62px;
    .title{font-size: 16px; color: var(--backColor);}
    .title i{.bg-map(20px,26px,-630px, -76px);margin-right: 10px; }
    .txt{margin-top: 15px;    line-height: 1.8;}
   }
}
}
</style>