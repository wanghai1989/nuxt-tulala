<template>
<form class="about-contain"  @submit="doSubmit">
			<div class="vam vam-basic">
				<div>
					<div class="vam-l"><span class="cred">*</span>头像</div>
					<div class="vam-r">
						<div class="vipimg">
							<input type="file" class="filepath" id="img_photo" @change="changepic()"  accept="image/jpeg,image/jpg,image/peg,image/png">
							<img :src="personInfo.avatar" v-if="personInfo.avatar" class="userimg" id="vipimg"/>
                        	<img src='~/assets/images/defaultVip.png' v-else class="userimg" id="vipimg"/>
							<em class="btn-upload">更换头像</em>
						</div>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span> 性别</div>
					<div>
						<div class="input-radio">
						    <!-- 选中状态添加 checked 属性 -->
						     <input id="male" type="radio" name="sex" value="1" v-model="sex" />
						     <label for="male">男</label>
						</div>
						<div class="input-radio">
						      <input id="female" type="radio" name="sex" value="2"  v-model="sex"/>
						      <label for="female">女</label>
						</div>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>生日</div>
					<div>
						<input type="date" class="input" placeholder="出生日期" v-model="birthday"/>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>行业</div>
					<div>
						<select class="select"  v-model="industry">
							<option value="">---请选择--- </option>
							<option v-for="item in setting" :value="item.id" :key="item.id">{{item.value}}</option>
						</select>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>职业</div>
					<div>
						<input type="text" class="input" placeholder="请输入"   v-model="professional"/>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>工作年限</div>
					<div>
						<select class="select" v-model="working_time">
							<option value="">---请选择--- </option>
							<option value="1">3年以下</option>
							<option value="2">3-5年</option>
							<option value="3">5年以上</option>
						</select>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>QQ</div>
					<div>
						<input type="text" class="input" placeholder="请输入"  v-model="qq"/>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>所在城市</div>
					<div>
						<select name="input_province" id="input_province" class="select city"  @change="getaddr('province',$event)">
					    </select>
					    <select name="input_city" id="input_city" class="select city"  @change="getaddr('city',$event)">
					    </select>
					     <select name="input_area" id="input_area" class="select city"  @change="getaddr('area',$event)">
					    </select>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>详细地址</div>
					<div>
						<input type="text" class="input" placeholder="请输入" id="address"  v-model="address"/>
						<p class="f12 cgray">此信息将做为收件地址，请如实填写</p>
					</div>
				</div>
				<div>
					<div><span class="cred">*</span>个人简介</div>
					<div>
						<textarea class="input area" placeholder="请输入" v-model="introduction"  @keyup="getLength()"></textarea>
						<p class="cgray f12">最多输入{{maxLength}}字，您还可以输入<span class="cmain">{{maxLength-content_length}}</span>个字</p>
					</div>
				</div>
				<div>
					<div></div>
					<div> 
						<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
						<button type="submit" class="btn-save">保存</button>
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
  data () {
    return {
	errorMsg: '',
	content_length:0,
    maxLength:200,
    userInfo:{},
	// personInfo:{},
	// token:'',
	blob:'',
	vipimg:'~/assets/images/defaultVip.png',
	province:'',
	province_code:'',
	city:'',
	city_code:'',
	area:'',
	area_code:'',
    birthday:'',
	sex:1,
	industry:'',
	professional:'',
	working_time:'',
	qq:'',
	address:'',
	introduction:''
    }
  },
		mounted(){  
				// 下面就可以写子组件想在mounted时执行代码（此时父组件的mounted已经执行完毕）
				this.fetchSet()
				this.loadcity()  //加载城市数据
			let pt=	setInterval(() => {
				if(Object.keys(this.personInfo).length>0){
					clearInterval(pt);
					if(this.personInfo.is_complete_my_info){
						this.getperson()
					}
					}
			}, 100);
						
						//  this.getcity()
		},
		computed:{
      ...mapState(['setting','personInfo','userToken'])
  },
	methods:{
		 ...mapActions({
		  savePersoninfo:'savePersoninfo',
		  fetchSetting:'fetchSetting'
      }),
	  getLength(){
		if(this.personInfo.introduction.length>this.maxLength){
          this.personInfo.introduction= this.personInfo.introduction.slice(0, this.maxLength)
        }
		this.content_length=this.personInfo.introduction.length
	},
	  getperson(){
			  this.sex=this.personInfo.sex
			  this.industry=this.personInfo.industry
			  this.professional=this.personInfo.professional
			  this.working_time=this.personInfo.working_time
			  this.qq=this.personInfo.qq
			  this.address=this.personInfo.address
			  this.introduction=this.personInfo.introduction
			  this.province_code=this.personInfo.province_code
			  this.province=this.personInfo.province
			  this.city_code=this.personInfo.city_code
			  this.city=this.personInfo.city
			  this.area_code=this.personInfo.area_code
			  this.area=this.personInfo.area
			  this.vipimg=this.personInfo.avatar
			  this.birthday=common.dataFormat(this.personInfo.birthday);


			  $("#input_province").val(this.province_code);
			  $("#input_province").change();
			  $("#input_city").val(this.city_code);
			  $("#input_city").change();
			  $("#input_area").val(this.area_code);
	  },
	  fetchSet(){
      let formDatas = new FormData();
		  formDatas.append('type', 4);

		  this.fetchSetting(formDatas)
},
	  getaddr(obj,event){
		  if(obj=='province'){
			  this.province=$(event.target).find("option:selected").text()
			  this.province_code=event.target.value
		  }
		  if(obj=='city'){
			  this.city=$(event.target).find("option:selected").text()
			  this.city_code=event.target.value
		  }
		  if(obj=='area'){
			  this.area=$(event.target).find("option:selected").text()
			  this.area_code=event.target.value
		  }
	  },
		doSubmit (e) {
			e.preventDefault()
	    const errMsg=this.validate()
      if (!errMsg) {
          this.errorMsg=''
		  
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  if(!this.personInfo.is_complete_my_info || (this.personInfo.is_complete_my_info && this.blob)){   //第一次，或者一次以上修改，并且上传了头像
		  formDatas.append('avatar',this.blob,'xx.jpg');
		  }
		  formDatas.append('birthday', this.birthday);
		  formDatas.append('province', this.province);
		  formDatas.append('province_code', this.province_code);
		  formDatas.append('city', this.city);
		  formDatas.append('city_code', this.city_code);
		  formDatas.append('area', this.area);
		  formDatas.append('area_code', this.area_code);

		  formDatas.append('sex', this.personInfo.sex);
		  formDatas.append('industry', this.personInfo.industry);
		  formDatas.append('professional', this.personInfo.professional);
          formDatas.append('working_time', this.personInfo.working_time);
		  formDatas.append('qq', this.personInfo.qq);
		  formDatas.append('address', this.personInfo.address);
		  formDatas.append('introduction', this.personInfo.introduction);
          this.savePersoninfo(formDatas)
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
            }
            if(data.code==1){
			 this.personInfo.is_complete_my_info=1
			 layer.msg(data.msg, {icon: 1});
			 setTimeout(() => {
                  this.$router.push("/mine")
			 }, 1000);
            }
          })
		  }else{
			  this.errorMsg=errMsg
		  }
	  },
	 async changepic(){
		let file=$("#img_photo").get(0).files[0];
		if (typeof(file) == 'undefined'){
			return
		}
		const format='image/jpeg';
        let base64Img=await processImg.cutImageBase64(file,null,format,180); //上传的图片进行压缩并且合成水印
        this.blob= processImg.base64ToBlob(base64Img,format);  //转成blob格式的文件
		$("#vipimg").attr("src",base64Img)
	  }, 
	   validate () {          
		return common.validateBasic(
			this.personInfo.is_complete_my_info,
			this.blob,
			this.personInfo.sex,
			this.birthday,
			this.personInfo.industry,
			this.personInfo.professional,
			this.personInfo.working_time,
			this.personInfo.qq,
			this.province_code,
			this.city_code,
			this.area_code,
			this.personInfo.address,
			this.personInfo.introduction)
	},
	  loadcity:function(){
		  $.getJSON("/json/city_code.json", function (pdata){
			  var html = "<option value=''>== 省份 ==</option>"; 
			  $("#input_city").append(html); 
			  $("#input_area").append(html);
			  $.each(pdata,function(idx,item){
			     html += "<option value='" + item["code"] + "' exid='" + idx + "'>" + item["name"] + "</option>";
			  });
			  $("#input_province").append(html);
			  $("#input_province").change(function(){
			   if ($(this).val() == "") return;
			   $("#input_city option").remove(); 
			   $("#input_area option").remove();
			   var proid=  $(this).find("option:selected").attr("exid"); 
			   var html = "<option value=''>== 城市 ==</option>"; 
			   				$("#input_area").append(html);
			   $.each(pdata[proid]["city"],function(idx,item){
			      html += "<option value='" + item["code"] + "' exid='" + idx + "'>" + item["name"] + "</option>";
			   });
			   $("#input_city").append(html);  
			  });
			  
			
			  $("#input_city").change(function(){
			   if ($(this).val() == "") return;
			   $("#input_area option").remove();
			   var proid= $("#input_province").find("option:selected").attr("exid");
			   var cityid= $(this).find("option:selected").attr("exid"); 
			    
			   var html = "<option value=''>== 区域 ==</option>";
				   $.each(pdata[proid]["city"][cityid]["area"],function(idx,item){
				      html += "<option value='" + item["code"] + "' exid='" + idx + "'>" + item["name"] + "</option>";
				   });
				   $("#input_area").append(html);  
				  });
			})
	  },
	//   getcity:function(province_code,city_code,area_code){
	// 	  console.log(province_code+','+city_code+','+area_code)
	// 	$("#input_province").val(province_code);
	// 	$("#input_province").change();
	// 	$("#input_city").val(city_code);
	// 	$("#input_city").change();
	// 	$("#input_area").val(area_code);
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
   .vipimg{
       width: 60px; height: 60px; border-radius: 30px; vertical-align: middle; overflow: hidden;position: relative;
       .filepath { width: 100%; height: 100%; opacity: 0; vertical-align: top; position: relative; z-index: 2; }
       .userimg{  position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; z-index: 0;}
       .btn-upload{position: absolute; bottom: 0; left: 0;width: 100%; height: 20px; line-height: 20px; display: none;
                background: #000; opacity: .5; text-align: center;font-size: 12px; color: #fff; z-index: 1;cursor: pointer;}
		.btn-upload:hover{opacity: 0.9;}
   }
   .vipimg:hover .btn-upload{display: block; cursor: pointer;}
    >div>div{padding: 10px 0; line-height: 1;}
    >div>div:first-child{width: 120px; text-align:right; padding-right: 20px; box-sizing: border-box;}
    >div>div:last-child{width: 440px;}
    .select.city{width: 142px;}
    .btn-save{
    .btn(137px,48px,transparent,transparent,#fff);background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); 
}
.btn-save:hover{opacity: 0.9;}
}
.area{height: 80px; line-height: 26px;}
</style>