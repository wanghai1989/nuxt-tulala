<template>
<form  @submit="doSubmit"  class="task-box">
  <!-- <h3 class="title">发布任务</h3> -->
	<div class="list-item">
    <div class="tit"><span class="cred">*</span>任务类型</div>
    <div class="input-item">
      	<select class="select" v-model="type_id">
          <option value="">--请选择--</option>
            <option v-for="item in setting" :value="item.id" :key="item.id">{{item.value}}</option>
        </select>
    </div>
  </div>
  <div class="list-item">
    <div class="tit"><span class="cred">*</span>任务名称</div>
    <div class="input-item">
      	<input type="text" class="input"  v-model="name"/>
    </div>
  </div>
  <div class="list-item">
    <div class="tit"><span class="cred">*</span>预算</div>
    <div class="input-item">
      	<input type="text" class="input" v-model="money"  onkeyup="this.value=this.value.replace(/\D/g, '')"/>
    </div>
  </div>
  <div class="list-item">
    <div class="tit"><span class="cred">*</span>手机号</div>
    <div class="input-item">
      	<input type="text" class="input" v-model="personInfo.mobile"/>
    </div>
  </div>
  <div class="list-item">
    <div class="tit"><span class="cred">*</span>要求描述</div>
    <div class="input-item">
      		<textarea placeholder="请输入项目描述" v-model="description" class="textarea" @keyup="getLength()"></textarea>
		 			<p class="cgray f12">最多输入{{maxLength}}字，您还可以输入<span class="cmain">{{maxLength-description_length}}</span>个字</p>
    </div>
  </div>
  <div class="list-item">
    <div class="tit">参考图片</div>
    <div class="upload">
									<div class="upload_warp">
										<div class="upload_warp_left" @click="fileClick">
										<img src="~/assets/images/upload.png">
										</div>
										<!-- <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
										或者将文件拖到此处
										</div> -->
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
											<img src="~/assets/images/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
										</div>
										<img :src="item.file.src">
										</div>
									</div>
									</div>
  </div>
  <div>
        <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
			  <button type="submit" class="btn-report" :disabled="disabled">发布</button>
  </div>
</form>
</template>
<script>
import common from '~/assets/js/common'
import processImg from '~/assets/js/processimg'
import workStep from '~/components/layout/work-step.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  components: {workStep},
  data () {
    return {
    disabled:false,
	type_id:'',
	name:'',
	money:'',
	// mobile:'',
	 files:[],
	imgList: [],
	size: 0,
	description:'',
  description_length:0,
  maxLength:800,
	 errorMsg: ''
    }
  },
  mounted(){  
      this.fetchSet()
		},
		
 computed:{
	  ...mapState(['setting','personInfo','userToken'])
  },
  methods:{
 ...mapActions({
		  createWork:'createWork',
      fetchSetting:'fetchSetting'
      }),
...mapMutations(['setShowLogin']),
      getLength(){
        if(this.description.length>this.maxLength){
          this.description= this.description.slice(0, this.maxLength)
        }
		this.description_length=this.description.length

	},
      fetchSet(){
      let formDatas = new FormData();
		  formDatas.append('type', 7);

		  this.fetchSetting(formDatas)
},
clearInfo(){
  this.type_id='',
  this.name='',
  this.money='',
  this.description='',
  this.imgList=[]
},
 async doSubmit (e) {
			e.preventDefault()
      if(!this.userToken){
			  this.$router.push({path: '/m/mobile-login',query:{backUrl:this.$router.path}}) 
		}
			 const errMsg=common.validateTaskpublic(this.type_id,this.name,this.money,this.personInfo.mobile,this.description)
       
      if (!errMsg) {
        if(this.imgList.length>5){
          layer.msg("参考图片不能超过5张", {icon: 2});
            return
        }

      this.errorMsg=''
      this.disabled=true
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
      formDatas.append('type',this.type_id);
		  formDatas.append('name', this.name);
		  formDatas.append('money', this.money);
		  formDatas.append('mobile', this.personInfo.mobile);
		  formDatas.append('description', this.description);
		  if($("#upload_file").get(0).files.length==0){
			 formDatas.append('images[]',null); 
		  }else{
		  for(let i=0;i<=$("#upload_file").get(0).files.length-1;i++){
          let file=$("#upload_file").get(0).files[i];
          let base64Img=await processImg.cutImageBase64(file,null,'image/jpeg',1080); //上传的图片进行压缩并且合成水印
          let blob= processImg.base64ToBlob(base64Img,'image/jpeg');  //转成blob格式的文件
		  // console.log('这是blob',blob)
          formDatas.append('images[]',blob,'xx.jpg');
			  }
			  }
		this.createWork(formDatas)
		.then((data) => {
      this.disabled=false
			if(data.code==0){
        // this.$layer.msg(data.msg);
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
      this.clearInfo()
      // this.$layer.msg(data.msg);
			layer.msg(data.msg, {icon: 1});
      setTimeout(() => {
        this.$router.push('/m/mobile-taskpublic')
      }, 2000);
			}
		})
		}else{
			this.errorMsg=errMsg
		}
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
        // document.getElementById('upload_file').value=''
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
.task-box{padding: 30px 15px 15px;}
.list-item{margin-bottom: 15px;}
.btn-report{.btn(100%,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); }
h3.title{color: var(--backColor); font-size: 18px; height: 50px; line-height: 50px; padding: 0px 15px;}
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
      height: 80px;
      width: 100px;
    //   border: 1px solid #d0d0d0;
      margin: 0px 10px 10px 0px;
      float: left;
      line-height: 80px;
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
      margin-top: 18px;
    }

    .upload_warp_left {
      float: left;
      width: 100%;
      height: 100%;
      border: 1px dashed #d0d0d0;
      border-radius: 4px;
      cursor: pointer;
    }

    .upload_warp {
      margin: 10px;
      height: 100px;
    }

    .upload {
      border: 1px solid #d0d0d0;
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      text-align: center;
    }
</style>