<template>
<div>
    <webBanner position='hand_in_hand'></webBanner>
	<webLogin></webLogin>
    <aboutNav></aboutNav>
    <div class="wrapper">
       <form class="hund-contain" @submit="doSubmit">
		   <a class="btn-apply" href="javascript:void(0)" id="gohand" @click="uphand()">●<br/>我<br/> 也<br/>要<br/>上<br/>传<br/>●</a>
		<div class="laymshade hand" v-if="show_hand">
			<div class="hand-box clearfix">
				<div class="hand-head">
					牵手图啦
				</div>
				<i class="close" @click="closehand()"></i>
				  <div class="vam vam-hand">
				  	<div>
					<div class="vam-l"><span class="cred">*</span>祝福图片</div>
					<div class="vam-r">
						<div class="item-pic">
			            <i class="i-add"></i>
                        <input type="file" class="filepath" id="wish_photo" @change="changepic()" accept="image/jpeg,image/jpg,image/peg,image/png">
						<img src="../../assets/images/transparent.png"  id="view_id_wish_photo">
	  				</div>
						
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>祝福语</div>
					<div>
						<textarea placeholder="送上一句祝福吧！！" class="textarea" v-model="wish_words" @keyup="getLength()"></textarea>
						<p class="cgray f12">最多输入{{maxLength}}字，您还可以输入<span class="cmain">{{maxLength-wish_length}}</span>个字</p>
					</div>
				</div>
				<div>
					<div></div>
					<div>
						<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
						<button type="submit" class="btn-submit">提交</button>
					</div>
				</div>
				  </div>
			</div>
		</div>
			<div class="hund-tit">
				<h3><span class="cred">{{countfile}}</span>个库粉晒出了自拍</h3>
			</div>
			<ul class="ul-hand clearfix">
				<li  v-for="item in evaluation" :key="item.id" >
					<div class="hand-img" @click="showImg(item.url)">
						<img :src="item.url">
					</div>
					<div class="hand-name">
						{{item.nickname}}
					</div>
					<div class="hand-font">
						{{item.content}}
					</div>
				</li>
			</ul>
			 <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>

			
	<div class="laymshade hand" v-if="showBigImg">
			<div class="center-dialog">
				<div class="center-ctn-box">
					<div class="table-cell-box">
						<div class="Bigimg-box">
							<em class="Bigimg-close-Btn" @click="closeBigImg()">×</em>
							<!-- <p>这是标题</p> -->
							<img :src="UrlBigImg" />
						</div>
					</div>
				</div>
			</div>
		</div>
</form>
    </div>
    
</div>
</template>
<script>

import webBanner from '~/components/layout/web-banner'
import aboutNav from '~/components/layout/about-nav'
import common from '~/assets/js/common'
import processImg from '~/assets/js/processimg'
import webLogin from '~/components/layout/web-login.vue'
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	layout: 'web',
	head(){
	   return {
			title:'心系图啦-图啦粉丝自拍-图啦话题-图啦活动-设计不抠图，图啦粉丝千千万！__图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '牵手图啦是图啦啦粉丝聚集地，图啦啦口碑，图啦啦粉丝的乐趣，图啦啦优秀团队为您打造最好体验，感谢所有粉丝对图啦啦支持！！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '图啦啦粉丝，图啦啦团队，图啦话题，图啦啦活动，粉丝主题'
			}]
			}
  },
 components: {MoPaging,webBanner,aboutNav,webLogin},
  data () {
    return {
     errorMsg: '',
	 wish_img:'',
	 wish_words:'',
	 wish_length:0,
	 show_hand:0, //上传窗口默认不显示，1为显示
	 page:1,
     layer_wish_img:'',
	 showBigImg:0,
	 maxLength:200,
	 UrlBigImg:''
	//  userInfo:{}
	 
    }
  },
  computed:{
	  ...mapState(['pageSize','evaluation','countfile','userToken'])
  },
  mounted(){  
			this.fetchEvaluat()
		},
  methods:{
 ...mapActions({
		  upEvaluation:'upEvaluation',
		  fetchEvaluation:'fetchEvaluation'
      }),
...mapMutations(['setShowLogin']),
	   //从page组件传递过来的当前page
            pageChange:function(page) {

                this.page = page
                this.fetchEvaluat()
            },
			getLength:function(){
		if(this.wish_words.length>this.maxLength){
          this.wish_words= this.wish_words.slice(0, this.maxLength)
        }
		this.wish_length=this.wish_words.length
	},
showImg:function(url){
	this.UrlBigImg=url
	this.showBigImg=1

},
fetchEvaluat:function(){
		 let params={
				page:this.page,  //当前页
				pageSize:this.pageSize  //一页显示数量
			}

			this.fetchEvaluation(params)
	  },
async doSubmit (e) {
			e.preventDefault()
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

.hund-contain{    box-sizing: border-box; margin-top: 40px;  min-height: 400px;
.btn-apply{.btn(48px,22px,#b23016,linear-gradient(90deg, 
        #c53a1d 0%, 
        #b23016 100%),#fff);
		position: fixed; top: 450px; left: 50%; margin-left: 600px; padding: 6px 0px; line-height: 22px;  }
.hund-tit{display: flex;
h3{flex: 1; font-size: 24px; color: var(--backColor); height: 24px; line-height: 24px; border-left: 4px solid var(--redColor); text-indent: 15px;}
.btn-upload{.btn(160px,35px, var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff);font-size: 14px; border-radius: 18px; }
.btn-upload:hover{opacity: 0.9;}
}
   .ul-hand{width: 105%; position: relative;
li{width: 220px; height: auto; margin-top: 26px; margin-right: 25px; overflow: hidden; float: left; background: #fff;
padding: 10px 10px; box-sizing: border-box;}
.hand-img{width: 100%; height: auto; }
.hand-img img{width: 100%;}
.hand-name{color:  var(--backColor);; margin-top: 15px;}
.hand-font{margin-top: 5px;} 
}
}

.hand-box{width: 600px;min-height: 400px; max-height: 800px;  position: fixed; top: 50%; left: 50%; margin-top: -250px; margin-left: -420px; z-index: 5; 
background: #fff; border-radius: 5px;  
>img{width: 100%;}
.hand-head{width: 100%; height: 60px; line-height: 60px; font-size: 18px; color: var(--backColor); text-indent: 15px;
    background-color: #FAFAFA;
    border-bottom: 1px solid #EBEBEB;}
.vam-hand{width: 500px; margin: 30px auto 30px; }
.vam-hand>div>div{padding: 10px 0;}
.item-pic{ width: 160px; height: 160px; border: 1px solid #d0d0d0; display: inline-block;
   margin-right: 15px; text-align: center; position: relative;
   .i-add{.bg-map(48px,48px,-869px, -40px); position: absolute; top: 56px; left: 56px; z-index: 1;} 
   .filepath { width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2;}
    img{position: absolute; top: 0; left: 0; width: 100%; height: 100%;  z-index: 0; }
    }
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 18px; right: 15px;}
.textarea{    width: 380px;
    height: 100px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;}
.btn-submit{
    .btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);
}
.btn-submit:hover{opacity: 0.9;}
}
.layui-layer-page{width: auto !important;}

</style>