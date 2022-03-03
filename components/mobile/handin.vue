<template>
<form  @submit="doSubmit"  class="task-box">
  <!-- <h3 class="title">发布任务</h3> -->
	<div class="list-item">
    <div class="tit"><span class="cred">*</span>祝福图片</div>
    <div class="input-item">
      	<div class="item-pic">
			            <i class="i-add"></i>
                        <input type="file" class="filepath" id="wish_photo" @change="changepic()" accept="image/jpeg,image/jpg,image/peg,image/png">
						<img src="../../assets/images/transparent.png"  id="view_id_wish_photo">
	  				</div>
    </div>
  </div>
  <div class="list-item">
    <div class="tit"><span class="cred">*</span>祝福语</div>
    <div class="input-item">
      	<textarea placeholder="送上一句祝福吧！！" class="textarea" v-model="wish_words" @keyup="getLength()"></textarea>
				<p class="cgray f12">最多输入{{maxLength}}字，您还可以输入<span class="cmain">{{maxLength-wish_length}}</span>个字</p>
    </div>
  </div>
  
  <div class="mt50">
        <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
			  <button type="submit" class="btn-submit">提交</button>
  </div>
</form>
</template>
<script>
import processImg from '~/assets/js/processimg'
import common from '~/assets/js/common'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data () {
    return {
     errorMsg: '',
	 wish_img:'',
	 wish_words:'',
	 wish_length:0,
   layer_wish_img:'',
	 maxLength:200,
	 UrlBigImg:''
	//  userInfo:{}
	 
    }
  },
  computed:{
	  ...mapState(['userToken'])
  },
  mounted(){  
		},
  methods:{
 ...mapActions({
		  upEvaluation:'upEvaluation',
      }),
...mapMutations(['setShowLogin']),
			getLength:function(){
		if(this.wish_words.length>this.maxLength){
          this.wish_words= this.wish_words.slice(0, this.maxLength)
        }
		this.wish_length=this.wish_words.length
	},

async doSubmit (e) {
			e.preventDefault()
      if(!this.userToken){
        layer.msg('您还未登录', {icon: 2});
        setTimeout(() => {
          this.$router.push({path:'/m/mobile-login',query:{backUrl:this.$route.path}})
        }, 2000);
        
        return
      }
			let file=$("#wish_photo").get(0).files[0];

	    const errMsg=common.validateEvaluation(file,this.wish_words)
		
      if (!errMsg) {
          this.errorMsg=''
		  let formDatas = new FormData();
		  
		  let base64Img=await this.changepic(); //上传的图片进行压缩并且合成水印
      let blob= processImg.base64ToBlob(base64Img,'image/jpeg');  //转成blob格式的文件
		
		  formDatas.append('token', this.userToken);
          formDatas.append('img',blob,'xx.jpg');
		  formDatas.append('content', this.wish_words);
		this.upEvaluation(formDatas)
		.then((data) => {
			if(data.code==0){
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
			this.show_hand=0
			layer.msg(data.msg, {icon: 1});
			}
		})
		}else{
			this.errorMsg=errMsg
		}
		},
 
  uphand:function(){
	  if(!this.userToken){
			this.setShowLogin(1)
			return
		}
	 this.show_hand=1
		},
		closehand:function(){
			this.show_hand=0
		},
		closeBigImg:function(){
			this.showBigImg=0
		},
  async changepic(){
	   var file = $("#wish_photo").get(0).files[0];
	   let base64Img=await processImg.cutImageBase64(file,null,'image/jpeg',600);
	   $("#view_id_wish_photo").attr("src",base64Img);
		return base64Img;
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
.item-pic{ width: 160px; height: 160px; border: 1px solid #d0d0d0; display: inline-block;
   margin-right: 15px; text-align: center; position: relative;
   .i-add{.bg-map(48px,48px,-869px, -40px); position: absolute; top: 56px; left: 56px; z-index: 1;} 
   .filepath { width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2;}
    img{position: absolute; top: 0; left: 0; width: 100%; height: 100%;  z-index: 0; }
    }
.textarea{    width: 380px;
    height: 100px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;}   
  .btn-submit{
    .btn(100%,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);
}
.btn-submit:hover{opacity: 0.9;} 
</style>