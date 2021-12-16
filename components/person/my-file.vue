<template>
<div class="file-contain">
	<div class="laymshade fileinfo" v-show="isShow"  >
		<div class="fileinfo-box clearfix">
			<div class="fileinfo-head">
				完善资料
			</div>
				<i class="close" @click="close()"></i>
				<div class="fileinfo-l">
				<img  :src="detailImg" alt="">
				</div>
				<div class="fileinfo-r"> 
					<div class="vam">
						<div>
							<div><span class="cred">*</span>素材类型</div>
							<div class="direction">
					  			<a href="javascript:;"  @click="fetchCond(item.id)" :class="{focus:item.id==category_id2}" :value="item.id" v-for="item in category" :key="item.id">{{item.name}}</a>
							</div>
						</div>

						<div v-if="JSON.stringify(condition.scenarios)!='[]'">
							<div><span class="cred">*</span>场景/风格</div>
							<div>
								<select class="select" v-model="scenariosValue">
									<option value="">--请选择--</option>
									<option v-for="option in condition.scenarios" :value="option.id" :key="option.id">
										{{ option.name }}
									</option>
								</select>
							</div>
						</div>
						<div v-if="JSON.stringify(condition.file_formats)!='[]'">
							<div><span class="cred">*</span>格式</div>
							<div>
								<select class="select" v-model="formatsValue">
									<option value="">--请选择--</option>
									<option v-for="option in condition.file_formats" :value="option.id" :key="option.id">
										{{ option.name }}
									</option>
								</select>
							</div>
						</div>
						<div v-if="JSON.stringify(condition.shape)!='[]'">
							<div><span class="cred">*</span>版式</div>
							<div>
								<select class="select" v-model="shapeValue">
									<option value="">--请选择--</option>
									<option v-for="option in condition.shape" :value="option.id" :key="option.id">
										{{ option.name }}
									</option>
								</select>
							</div>
						</div>
						<div v-if="['word','ppt','excel'].indexOf(type_class)==-1">
							<div><span class="cred">*</span>分辨率</div>
							<div>
								<input type="text" class="input" placeholder="1080px*1200px/72dpi" v-model="imgDpi" />
							</div>
						</div>
						<!-- <div>
							<div>颜色</div>
							<div>
								<input type="color" class="inputcolor" v-model="color"/>
							</div>
						</div> -->
						<div>
							<div><span class="cred">*</span>源文件</div>
							<div>
								<span v-if="isUpload" class="cmain">源文件已上传</span>
							  <div class="sourcefile" v-else>
								<span class="span" > 
								<input name="" type="text" id="viewfile" class="inputstyle" /> 
								</span> 
								<label for="unload" class="file1">浏览...</label> 
								<input type="file" @change="uploadFileScource()" class="file" id="upload"   accept=".zip,.7z,.rar"/> 

								</div>
								 <div class="progress-box" v-if="isProgress">
								 <div class="progress">
										<div class="info" id="info">
										</div>
										</div>
										<span>20%</span>
									</div>
							<p class="cgray">建议格式为 <span class="cblack">.zip，.7z，.rar</span></p>
							</div>
							
						</div>
						<div>
							<div style="po"><span class="cred">*</span>标题</div>
							<div>
								<input type="text" class="input" placeholder="" v-model="fileName" />
							</div>
						</div>
						<div>
							<div><span class="cred">*</span>关键词</div>
							<div>
								<textarea  class="textarea" placeholder="" v-model="keywords"></textarea>
								<!-- <input type="text" class="input" placeholder="" v-model="keywords" /> -->
								<span class="cred">*关键词之间用“，”隔开</span>
							</div>
						</div>
						<div>
							<div>备注</div>
							<div>
								<input type="text" class="input" placeholder="" v-model="note" />
							</div>
						</div>
						<div>
							<div></div>
							<div>
								<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
								<a class="btn-audit" @click="saveFile()">提交审核</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			<ul class="statu-nav">
				<li :class="[this.state_val==1?'focus':'']" @click="fetchProduct(1,0)">待完善</li>
				<li :class="[this.state_val==2?'focus':'']" @click="fetchProduct(2,0)">待审核</li>
				<li :class="[this.state_val==3?'focus':'']" @click="fetchProduct(3,0)">已审核</li>
				<li :class="[this.state_val==4?'focus':'']" @click="fetchProduct(4,0)">审核拒绝</li>
			</ul>

			<ul class="categary-nav">
				<li v-for="(item,index) in category" :value="item.id" :key="item.id"  :class="[(index==0 && category_id==0)?'focus':'',(item.id==category_id)?'focus':'']" ><a href="javascript:;" @click="fetchProduct(0,item.id,item.type_class)">{{item.name}}</a></li>
			</ul>
			
			<ul class="ul-prodfile clearfix" :class="{'unfinish':state_val==1}" v-if="myproduct.length>0" >
				<li  v-for="item in myproduct" :key="item.id">
					<div class="prod-img" :style="{'background':'#eee url('+item.list_img_path+') center'}">
						<!-- <img :src="item.list_img_path"> -->
						<a href="javascript:void(0)" class="btn-perfectinfor" v-if="state_val==1"  @click="completeInfo(item.category_id,item.id,item.is_upload_origin_file,item.detail_img_path)">完善资料</a>
						<a href="javascript:void(0)" class="btn-delete" :class="{refused:state_val==4}" v-if="state_val==1 || state_val==4"  @click="deleteProduct(item.id)">删除</a>
					</div>
					<div class="prod-txt" v-if="state_val==2 || state_val==3">
							<a class="btn-perfectinfor" v-if="state_val==3"  @click.prevent="downSourceFile(item.id,item.name)">下载源文件</a>
							<div class="font">{{item.name}}</div>
						</div>
				</li>
			</ul>
			<div class="nodata" v-else>
				<img src="~/assets/images/pic32.png" />
				<p>您还没有此类作品</p>
			</div>
			 <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
			</div>
</template>
<script>
import common from '~/assets/js/common'
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import MoPaging  from '~/components/layout/web-pagination.vue'
export default {
components: {MoPaging},
//   props: ['dataClass'],
    data(){
	return { 
		isShow:0, //完善信息弹窗默认不显示
		prodID:0,
		state_val:1,  //素材状态 1 待完善 2待审核 3已审核
		type_class:'png', //素材类型
		category_id:0,  //列表素材类型ID
		category_id2:0, //完善信息素材类型ID
     	// prodclass:  this.dataClass,
		//  userInfo:{},
		 keywords:'',  //搜索关键词
		 fileName:'',  //素材名
		 imgDpi:'', //分辨率
		 note:'' ,//备注
		 color:'#000000', //颜色  暂时不加颜色
		 scenariosValue:'',   //素材场景
		 formatsValue:'',  //素材格式
		 shapeValue:'',  //素材版式
		 page:1,
		 isUpload:0, //源文件是否上传
		 isProgress:0,//是否显示进度条，默认隐藏
		 detailImg:'',//大图
		  errorMsg: ''  //页面显示错误
  }
  },
  computed:{
	  ...mapState(['pageSize','myproduct','category','condition','countfile','userToken','personInfo'])
  },
  watch :{
	  '$store.state.myproduct'(){
		  if(this.state_val!=1){   //未完善列表不用瀑布流
			let promiseAll = [], img = [], imgTotal = this.myproduct.length;
			for(let i = 0 ; i < imgTotal ; i++){
				promiseAll[i] = new Promise((resolve, reject)=>{
					img[i] = new Image()
					img[i].src = this.myproduct[i].list_img_path
					img[i].onload = function(){
						//第i张加载完成
						resolve(img[i])
					}
				})
			}
			Promise.all(promiseAll).then((img)=>{
				this.columnOnload()
				//全部加载完成
			})
		  }
      }

    },
  mounted(){  
	//   import('layui-layer')
	  this.fetchCategory()
	  this.fetchProduct(this.state_val,this.category_id,this.type_class)  //我的素材列表
  },
  methods:{ //页面进来发送请求
  ...mapMutations(['setShowVip']),
      ...mapActions({
          fetchCategory: 'fetchCategory',
		  fetchMyProduct:'fetchMyProduct',
		  fetchCondition:'fetchCondition',
		  upFileinfo:'upFileinfo',
		  upFileScource:'upFileScource',
		  fetchGoods: 'fetchGoods',
		  deleteFile:'deleteFile',
		   downFile:'downFile'
      }),
	  downSourceFile(id,name){
		if(this.personInfo.is_vip){
		  let formDatas = new FormData();
		  formDatas.append('token',this.userToken);
          formDatas.append('product_id',id);
		 this.downFile(formDatas).then((res) => {
　　　　　　　　this.download(res,'图啦啦_'+name+'.zip') //此处跳转到第三步
          })
		}else{
			this.setShowVip(1)
			  return
		}
	},
	download:function(data,fileName) {
　　　　　　if (!data.size) {
			   layer.msg('没有可下载文件', {icon: 2});
　　　　　　　　return
　　　　　　}
			 const blob = new Blob([data])
			 const link = document.createElement('a')
			 link.download = fileName
			 link.style.display = 'none'
				link.href = URL.createObjectURL(blob)
				console.log(URL.createObjectURL(blob))
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
　　　　　　},
	  uploadFileScource:function(){ 
        let formData = new FormData();
		let file=$("#upload").get(0).files[0];
        formData.append('file', file);
		formData.append('product_id', this.prodID);
		formData.append('size', (file.size/1024/1024).toFixed(2) +'M');
		var config = {
			headers: {
				'Authentication-Token': this.userToken,
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: function (e) {
				if(e.lengthComputable){
					let progress=(e.loaded / e.total*100).toFixed(0)  //上传进度
					$("#info").css("width",progress+"%");
					$(".progress-box span").text(progress+"%")
				}
			}
      }
	    this.isProgress=1 //开始显示进度条
		this.isUpload=0
        this.upFileScource({formData,config})
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
				this.isProgress=0
				this.isUpload=1
            //   layer.msg(data.msg, {icon: 1});
            }
          })
     },
	  saveFile:function(){
	    const errMsg=this.validate()
      if (!errMsg) {
        this.errorMsg=''
		  let formDatas = new FormData();
		  let keywordarr=this.keywords.split('，')
          if(['word','ppt','excel'].indexOf(this.type_class)>-1){
			  this.imgDpi='1920px*1080px'
		  }
		  formDatas.append('token', this.userToken);
		  formDatas.append('id', this.prodID);
          formDatas.append('category_id', this.category_id2);
		  formDatas.append('name', this.fileName);
		//   formDatas.append('file', $("#upload").get(0).files[0]);
		  formDatas.append('scenario', this.scenariosValue);
          formDatas.append('file_format', this.formatsValue);
		  formDatas.append('shape', this.shapeValue);
          formDatas.append('color', this.color);
		  formDatas.append('img_dpi', this.imgDpi);
		  for(var item in keywordarr){
			  formDatas.append('tag[]',keywordarr[item]);
		  }
		  formDatas.append('note', this.note);
          this.upFileinfo(formDatas)
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
            }
            if(data.code==1){
				this.fetchProduct(this.state_val,this.category_id,this.type_class)
				this.isShow=0
				this.keywords='',  //搜索关键词
				this.fileName='',  //素材名
				this.imgDpi='', //分辨率
				this.note='' ,//备注
				// this.color='', //颜色
				this.scenariosValue='',   //素材场景
				this.formatsValue='',  //素材格式
				this.shapeValue='',  //素材版式
              layer.msg(data.msg, {icon: 1});
            }
          })
		  }else{
			  this.errorMsg=errMsg
		  }
	  },
	   validate () {
		  if( JSON.stringify(this.condition.scenarios)=='[]'){
			  this.scenariosValue=100
		  }
		  if(JSON.stringify(this.condition.file_formats)=='[]'){
			this.formatsValue=100
		  }
		  if(JSON.stringify(this.condition.shape)=='[]'){
			  this.shapeValue=100
		  }
     return common.validateFileinfo(this.scenariosValue,this.formatsValue,this.shapeValue,this.imgDpi.trim()==""?"1080px":this.imgDpi.trim(),this.isUpload,this.keywords)
  },
	  wordDel:function(index){
        this.keywords.splice(index, 1);
	  },
      fetchCond:function(id){
		  this.category_id2=id
      	this.fetchCondition({category_id:id})
      },

	  completeInfo:function(category_id,id,isUpload,img){
		  this.category_id2=category_id
		  this.isShow=1
		  this.isUpload=isUpload
		  this.prodID=id
		  this.detailImg=img
		//   this.fetchCondition({category_id:category_id}) //获取搜索条件
		  this.fetchCond(category_id)
	  },
	  close:function(){
		 this.isShow=0
	  },
            //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchProduct(this.state_val,this.category_id,this.type_class)
            },
      deleteProduct:function(product_id){
		   
		  let formDatas = new FormData();
		    formDatas.append('token', this.userToken);	 
				formDatas.append('id', product_id);
			
                this.deleteFile(formDatas).then((data) => {
					console.log(data)
					if(data.code==1){
						layer.msg(data.msg, {icon: 1});
						this.fetchProduct(this.state_val,this.category_id,this.type_class)  //我的素材列表
					}
				})
	  },
	  fetchProduct:function(state_val,category_id,type_class){  //state 素材状态   type 素材类型
			if(state_val){
				this.state_val=state_val
			}
			if(category_id){
				this.category_id=category_id
			}
			if(type_class){
				this.type_class=type_class
			}
	     
			let formDatas = new FormData();
		    formDatas.append('token', this.userToken);	 
			if(this.category_id){
				formDatas.append('category_id', this.category_id);
			} 
			 formDatas.append('status', this.state_val);	  //this.state_val
			 formDatas.append('page', this.page);	 
			 formDatas.append('pageSize', this.pageSize);	 	
			 
			this.fetchMyProduct(formDatas)
	  },
	  columnOnload:function(){
		 if(this.myproduct.length==0){
			 return
		 }
			var boxArr = $(".ul-prodfile li"),
					num = Math.floor($(".ul-prodfile").width() / boxArr.eq(0).outerWidth(true)),
					columnHeightArr = [];
					columnHeightArr.length = num;
		            
					boxArr.each(function (index, item) {
						if (index < num) {
							columnHeightArr[index] = $(item).outerHeight(true);
			
						} else {
							var minHeight = Math.min.apply(null, columnHeightArr),
								minHeightIndex = $.inArray(minHeight, columnHeightArr);
			               
							$(item).css({
								position: 'absolute',
								top: minHeight,
								left: boxArr.eq(minHeightIndex).position().left
							});
							columnHeightArr[minHeightIndex] += $(item).outerHeight(true);
						}
					});
					
					$(".ul-prodfile").height(Math.max.apply(null, columnHeightArr));

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
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
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
.file-contain{padding: 40px 20px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
.statu-nav{display: flex; text-align: center; justify-content: center;
 li {height: 40px; line-height: 40px; width: 128px; margin-left: -1px;border:1px solid #d4d4d4; color: var(--backColor); text-align: center; background: #fff;cursor: pointer; }
//  li a{display: block;border:1px solid #d4d4d4; color: var(--backColor); text-align: center; background: #fff; }
 li.focus,li:hover{color: #fff;border: 1px solid var(--color); background: var(--color);}
}
.categary-nav{display: flex; border-bottom: 1px solid #eee;    margin-top: 30px;
 li {height: 50px;
    line-height: 50px;
    width: 100px; position: relative;}
 li a{display: block; color:var(--backColor); text-align: center; font-size: 16px;}
 li.focus a, li a:hover{color:var(--color);}
li.focus:after{content: ""; display: block; position: absolute; bottom: 0px; left: 20%; width: 60%; height: 2px; background: var(--color);}
}
.ul-prodfile{width: 105%; position: relative;
li{width: 275px; height: auto; max-height: 500px; margin-top: 20px; margin-right: 20px; overflow: hidden;    border: 1px solid #f0f0f0;
    box-sizing: border-box; position: relative; float: left; border-radius: 4px;
 }
.prod-txt{position: absolute; top: 0; left: 0; width: 100%; background: rgba(0,0,0,0.4); color: #fff; height: 100%;
text-align: center; padding-top: 40px; box-sizing: border-box; transition: opacity .4s; padding: 15px 20px; opacity: 0;}
.prod-txt .font{ position: absolute;top: calc(50% + 10px);width: 233px;  text-align: center; }
li:hover .prod-txt{opacity: 1; }
.prod-img{width: 100%; height: auto; max-height: 500px; min-height: 160px;overflow: hidden; position: relative; display: grid; background-size:cover;}
.prod-img img{max-width: 100%; width: 100%}
.btn-perfectinfor{.btn(150px,40px,var(--color),transparent,var(--color)); position: absolute;top: calc(50% - 40px); left: 50%; margin-left: -75px; }
.btn-delete{.btn(150px,40px,var(--redColor),transparent,var(--redColor)); position: absolute;top:  calc(50% + 10px);; left: 50%; margin-left: -75px;}
.btn-perfectinfor:hover{background: var(--color); color: #fff;}
.btn-delete:hover{background: var(--redColor); color: #fff;}
.btn-delete.refused{top: 80px;}
} 
.ul-prodfile.unfinish{
	li{height: 200px; }
	.prod-img{height: 200px; }
}
.fileinfo-box{width: 920px; position: fixed; height: auto; top: 50%; left: 50%; margin-top: -390px; margin-left: -420px; z-index: 5; 
background: #fff; border-radius: 5px;  position: relative; padding-bottom: 20px;
.fileinfo-head{width: 100%; height: 50px; line-height: 50px; background: #eee;
 padding: 0px 20px; box-sizing: border-box; color:var(--backColor); font-size: 16px; font-weight: bold;}
.fileinfo-l{width: 360px; padding:20px 30px; float: left;overflow: hidden; height: 560px; overflow-y: scroll; }
.fileinfo-l::-webkit-scrollbar {width: 0;}
.fileinfo-l img{max-width: 100%; border: 1px solid #eee;}
.fileinfo-r{width: 500px; float: left; padding: 20px 40px 20px 20px; box-sizing: border-box;}
.fileinfo-r .vam>div>div{padding: 6px 0;}
.fileinfo-r .vam>div>div:first-child{width: 90px; text-align: left;}
.fileinfo-r .vam>div>div:last-child{width: 382px; text-align: left;}
.sourcefile {position: relative;
     span.span { float:left;  } 
.file { position:absolute; left:0; width:100%; top:0px;
 height:42px; filter:alpha(opacity=0); opacity:0; cursor: pointer } 
.file1 { float: left;
    margin-left: 6px;
    z-index: 1;
    width: 112px;
    height: 42px;
    line-height: 42px;
    background: #4e6ef2;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    cursor: pointer; } 
.inputstyle { border:1px solid #BEBEBE; width:238px; float:left;
 height:40px; line-height:40px; border-radius: 4px; background:#FFF; z-index:99 } 
}
.progress-box{display: flex; margin-top: 50px;
	 span{color: #333;    margin-left: 5px;}
.progress{
    flex: 1;
                height: 12px;
				border-radius: 6px;
                background: #ddd;
				overflow: hidden;
				margin-top: 5px;
                position: relative;
            }
            .info{
                width:0px;
                height: 12px;
                background: #1543ff;
                position: absolute;
                left: 0;
                top: 0;
            }
	}



.inputcolor{width: 246px; height: 40px;}
.login{text-align: center;}
.btn-audit{.btn(214px,48px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); }
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 13px; right: 13px;}
}
.direction a{margin-bottom: 5px;margin-right: 5px; width: 86px; height: 38px;
    line-height: 38px; font-size: 14px;
}
.direction a:nth-child(4n){margin-right: 0;}
}


</style>