<template>
<div class="enter-box">
       
			<div class="step-cont"> 
          <div class="tip" v-if="personInfo.designer_status!=102">
              <i></i>您还不是图啦啦签约设计师，请先前往&nbsp;<nuxt-link class="cmain" to="/enter/design-basic">入驻图啦啦</nuxt-link>
        </div>
	  			<div class="pic-title">
	  				<span class="cred">*</span>素材类别<span class="f14 cgray">(单选)</span> 
	  			</div>
          <div class="direction">
          <a href="javascript:;" @click="categoryClick(item.id,item.type_class)" :class="{focus:item.id==isActive}"  v-for="item in category"  :value="item.id" :key="item.id">{{item.name}}</a>
          </div>
                <div class="pic-title mt20">
	  				<span class="cred">*</span>预览图 <span class="f14 cgray" v-if="wordtip">（办公文档规定尺寸<em class="cblack">1200px*1700px</em>） </span>
	  			</div>
                <div class="upload">
                <div class="upload_warp">
                    <div class="upload_warp_left" @click="fileClick">
                    <img src="../../assets/images/upload.png">
                    </div>
                    <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
                    或者将文件拖到此处
                    </div>
                </div>
                <div class="upload_warp_text">
                    选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
                </div>
                <input @change="fileChange($event)" type="file" id="upload_file" accept="image/jpeg,image/jpg,image/peg,image/png"   multiple style="display: none">
                <div class="upload_warp_img" v-show="imgList.length!=0">
                    <div class="upload_warp_img_div" v-for="(item,index) in imgList" v-bind:key="index">
                    <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                        {{item.file.name}}
                        </div>
                        <img src="../../assets/images/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                    </div>
                    <img :src="item.file.src" alt="">
                    </div>
                </div>
                </div>
	  			
	  			<div class="cgray">批量上传每次限10张</div>
	  			 <div class="error-msg mt50 tc" v-show="errorMsg">{{errorMsg}}</div>
          <div class="mt30 tc">
	  				<a class="btn-perfectfile" href="javascript:;" @click="addFile()">上传</a>
	  			</div>
	  			<div class="tip-box">
	  				<div class="title">
	  					<i></i>小提示
	  				</div>
	  				<div class="txt">
              1. 签约成为图啦啦设计师方可上传素材文件 <br>
              2. 元素、艺术字、背景、模板、UI、摄影图设计师请上传完整的jpg、jpeg或png格式原创作品（最大高宽为5000*5000px），
              PPT设计师请上传ppt或pptx格式的原创作品； <br>
              3. 务必提交与 “素材类别”相关的作品； <br>
              4. 上传单个素材作品大小控制在 50MB 之内。
	  				</div>
	  			</div>
	  	</div>
		</div>
</template>
<script>
import processImg from '~/assets/js/processimg'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  data () {
      return {
      	isActive:1,
      	// userInfo:{},
        imgList: [],
        files:[],
        size: 0,
        route:{},
        wordtip:0,
        errorMsg: ''
      }
    },
   mounted(){
//   import('layui-layer')
    this.route=this.$router
    console.log(this.route)
    this.fetchCategory();
  },
  computed:{
      ...mapState(['category','userToken','personInfo'])
  },
  // asyncData ({ store,route}) {
  //     return store.dispatch('fetchCategory')
  // },
    methods: {
    	...mapActions([
        'upMaterialImage',
        'fetchCategory'
     ]),
     ...mapMutations(['startLoading','endLoading']),
     categoryClick: function (index,typeclass) {
                    this.isActive = index
                    if(['word','ppt','excel'].includes(typeclass) ){
                      this.wordtip=1
                    }else{
                      this.wordtip=0
                    }
                },
       
     async  addFile(){
           if(this.personInfo.designer_status!='102'){ 
              this.errorMsg='您还未入驻图啦啦'
            return false
           }
          if(this.imgList.length==0){
            this.errorMsg='请先选择图片上传'
            return false
          }
          if(this.imgList.length>10){
            this.errorMsg='一次最多上传10张图片'
            return false
          }
          this.startLoading();
          let wid=this.isActive==1?620:780; //免扣保留620px，其他780px  
          const format=this.isActive==1?'image/png':'image/jpeg'; //格式  
          let suffix=this.isActive==1?'xx.png':'xx.jpg';   //格式
          let waterimg=await processImg.loadImage('/static/waterprint.png');
         let formDatas=new FormData();
         formDatas.append('token', this.userToken);
         formDatas.append('category_id', this.isActive);
        
        for(let i=0;i<=this.imgList.length-1;i++){
          let file=this.imgList[i].file;
          // let wh= await processImg.getImgWH(file) 
          // console.log(wh)   //文件宽高 单位px
          // console.log(file.size/1024/1024 +'M') //文件大小  单位M
          if (typeof(file) == 'undefined'){
            return
          }
          let base64Img=await processImg.cutImageBase64(file,waterimg,format,wid); //上传的图片进行压缩并且合成水印
          let blob= processImg.base64ToBlob(base64Img,format);  //转成blob格式的文件
          // let sources=[{'files':blob,'wh':wh},{'files':blob,'wh':wh}]
          // formDatas.append('sources[]',sources);
          formDatas.append('files[]',blob,suffix);
          // formDatas.append('wh[]',wh);
			  }
        
          this.upMaterialImage(formDatas)
          .then((data) => {
            this.endLoading();
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
            }
            if(data.code==1){
              layer.msg(data.msg, {icon: 1});
              this.imgList.splice(0,this.imgList.length);  //上传成功之后清空上传控件
              $("#upload_file").val("")
            }
          })
        },
      fileClick(){
        document.getElementById('upload_file').click()
      },
     fileChange(el){
        if(typeof  el.target.files[0]=== "undefined")
           return;
       if (!el.target.files[0].size) 
         return;
        this.fileList(el.target.files);
      },
      fileList(files){
        for (let i = 0; i < files.length; i++) {
          console.log(files[i])
          this.fileAdd(files[i]);
        }
      },
      fileAdd(file){
        
        this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
         
        }
      },
      fileDel(index){
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        if(this.imgList.length==0){ //当所有文件都删除时，清空上传控件
        $("#upload_file").val("")
          // document.getElementById('upload_file').value=''
        }
      },
      bytesToSize(bytes){
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el){
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el){
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el){
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer.files);
        // console.log(el.dataTransfer.files)
      }
    }
    	
}
</script>
<style lang="less">
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
.layui-layer-red .layui-layer-title{background: #e92987; color: #fff;}
.layui-layer-red .layui-layer-btn .layui-layer-btn0{border-color: #e92987; background-color: #e92987;}

.enter-box{width: 100%; background: #fff;margin-top: 30px;
.tip {font-size: 14px; height: 16px; line-height: 16px;margin: 0px 0px 20px 0px; color: var(--grayColor);}
.tip i{.bg-map(16px,16px,-999px, -44px); margin-right: 6px; vertical-align: text-bottom;}
.step-tit{ padding: 25px;text-align: center;
     ul{width: 820px; height: 158px; background: url(../../assets/images/pic10.png) no-repeat center; font-size: 20px; padding-top: 47px; 
      margin: 0 auto; box-sizing: border-box;}
     ul li{float: left; width: 120px;  margin-left: 77px;}
     ul li.focus{color: var(--color);}
}
.step-line{width: 100%; height: 6px;background-image: linear-gradient(180deg, 
        #f5f5f5 0%, 
        #fff 100%);}
.step-cont{width: 820px; margin: 0 auto; padding: 50px 0px;
  .vip-info .l{color:var(--backColor) ; text-align: right; width: 185px;}
  .vip-info .r{padding: 10px 0px 10px 12px; }
  .input,.select{width: 400px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
  .btn-enter{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 4px; margin-top: 30px;}
  .pic-title{font-size: 16px; color: var(--backColor); margin-bottom: 10px;}
  .direction a{.btn(120px,42px,#d0d0d0,transparent,#333); margin-right: 15px;}
  .direction a:nth-child(6){margin-right: 0;}
  .direction a.focus,direction a:hover{.btn(120px,42px,var(--color),transparent,var(--color)); margin-right: 15px;}
  .pics{display: flex;}
  .item-pic{ width: 160px; height: auto;  margin-right: 15px; text-align: center;}
  .item-pic a{width: 160px;  height: 160px; border: 1px solid #d0d0d0;    display: inline-block;}
  .btn-up{.btn(137px,48px,#d0d0d0,transparent,var(--backColor));}
  .btn-submit{.btn(137px,48px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff);}
  .btn-submit:hover{opacity: 0.9;}
   .tip-box{width: 100%; background-color: #fafafa; border: solid 1px #eeeeee; padding: 30px 30px; box-sizing: border-box; margin-top: 62px;
    .title{font-size: 16px; color: var(--backColor);}
    .title i{.bg-map(20px,26px,-630px, -76px);margin-right: 10px; }
    .txt{margin-top: 15px;    line-height: 1.8;}
   }
   .btn-perfectfile{.btn(214px,48px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
   .btn-perfectfile:hover{opacity: 0.9;}
   .direction a{ margin-right: 15px; margin-bottom: 10px;}
   .direction a:nth-child(6){margin-right: 0;}
}
}


.upload_warp_img_div_del {
      position: absolute;
      top: 6px;
      width: 16px;
      right: 4px;
    }

    .upload_warp_img_div_top {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.4);
      line-height: 30px;
      text-align: left;
      color: #fff;
      font-size: 12px;
      text-indent: 4px;
    }

    .upload_warp_img_div_text {
      white-space: nowrap;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .upload_warp_img_div img {
      max-width: 100%;
    }

    .upload_warp_img_div {
      position: relative;
      height: 120px;
      width: 146px;
    //   border: 1px solid #d0d0d0;
      margin: 0px 15px 15px 0px;
      float: left;
      line-height: 146px;
      display: table-cell;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 2px;
      overflow: hidden;
      
    }

    .upload_warp_img {
      border-top: 1px solid #d0d0d0;
      padding: 14px 0 0 14px;
      overflow: hidden
    }

    .upload_warp_text {
      text-align: left;
      margin-bottom: 10px;
      padding-top: 10px;
      text-indent: 14px;
      border-top: 1px solid #d0d0d0;
      font-size: 14px;
    }

    .upload_warp_right {
      float: left;
      width: 67%;
      margin-left: 2%;
      height: 100%;
      border: 1px dashed #d0d0d0;
      border-radius: 4px;
      line-height: 130px;
      color: #999;
    }

    .upload_warp_left img {
      margin-top: 32px;
    }

    .upload_warp_left {
      float: left;
      width: 30%;
      height: 100%;
      border: 1px dashed #d0d0d0;
      border-radius: 4px;
      cursor: pointer;
    }

    .upload_warp {
      margin: 14px;
      height: 130px;
    }

    .upload {
      border: 1px solid #d0d0d0;
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      text-align: center;
    }



</style>