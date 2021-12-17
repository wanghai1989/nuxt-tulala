<template>
    <form  class="about-contain"   @submit="doSubmit">
			<div class="title">感谢您留下宝贵的建议</div>
			<div class="advice-box">
				<div class="question-type">
					<span class="f16 cblack"><span class="cred">*</span>反馈类型：</span>  
					 <a href="javascript:;" @click="categoryClick(item.id)" :class="{focus:item.id==isActive}"   v-for="item in setting" :value="item.id" :key="item.id">{{item.value}}</a>
				</div>
				<div class="advice-txt">
					<textarea placeholder="如您的建议被采纳有可能获得VIP奖励哦！" v-model="content" @keyup="getLength()"></textarea>
					<p class="cgray f12">最多输入{{maxLength}}字，您还可以输入<span class="cmain">{{maxLength-content_length}}</span>个字</p>
				</div>
				<div class="link">
					<input type="text" class="input" placeholder="留下您的联系方式（QQ或者电话）,加入图啦啦官方QQ群:524143450" v-model="contact" />
				</div>
				<div class="tc mt40">
					<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
							  <button type="submit" class="btn-submit">提交建议</button>
				</div>
			</div>
		</form>
</template>
<script>
import common from '~/assets/js/common'
import {
mapState,mapActions
} from 'vuex'
export default {
  data () {
      return {
      	isActive:0,
		  content:'',
		  contact:'',
		  content_length:0,
		  maxLength:200,
      	// userInfo:{},
		//   token:'',
        errorMsg: ''
      }
    },
   mounted(){
    //  import('layui-layer')
	this.fetchSet()
  },
  computed:{
      ...mapState(['category','setting','userToken'])
  },
    methods: {
		 ...mapActions({
		  upAdvices:'upAdvices',
		  fetchSetting:'fetchSetting',
      }),
	getLength(){
		if(this.content.length>this.maxLength){
          this.content= this.content.slice(0, this.maxLength)
        }
		this.content_length=this.content.length
	},
	fetchSet(){
      let formDatas = new FormData();
		  formDatas.append('type', 5);

		  this.fetchSetting(formDatas)
	},
  categoryClick: function (index) {
                    this.isActive = index
                },
	 doSubmit (e) {
			e.preventDefault()
			if(!this.userToken){
				layer.msg('你还未登录,请先登录', {icon: 2});
				localStorage.setItem("preRoute",this.$router.history.current.path)
				setTimeout(() => {
				  this.$router.replace('/user/login') 	
				}, 2000);
				return
			}
			 const errMsg=common.validateAdvice(this.isActive,this.content,this.contact)
      if (!errMsg) {
          this.errorMsg=''
		  let formDatas = new FormData();
		  
		  formDatas.append('token', this.userToken);
          formDatas.append('type',this.isActive);
		  formDatas.append('content', this.content);
		  formDatas.append('contact', this.contact);
		this.upAdvices(formDatas)
		.then((data) => {
			console.log(data)
			if(data.code==0){
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
			layer.msg(data.msg, {icon: 1});
			this.isActive=0
			this.content=''
			this.contact=''
			}
		})
		}else{
			this.errorMsg=errMsg
		}
		}
}
}
</script>
<style lang="less" scoped>
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
.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
>.title{font-size: 24px; color:var(--backColor); text-align: center; font-weight: bold;}

}
.advice-box{width: 550px; margin: 50px auto 0;
.question-type a{padding: 10px 30px; border: solid 1px #d0d0d0; border-radius: 4px; margin-right: 10px;}
.question-type a.focus,.question-type a:hover{padding: 10px 30px; border: solid 1px var(--color); border-radius: 4px; color: var(--color);}
.advice-txt{margin-top: 30px;}
.advice-txt textarea{border: 1px solid #d0d0d0; width: 100%; height: 174px; border-radius: 4px;text-indent: 5px;    box-sizing: border-box; font-size: 14px;}
.link .input{border:1px solid #d0d0d0; height: 42px; line-height: 42px; width: 100%; border-radius: 4px; text-indent: 5px; font-size: 14px;}
.link{margin-top: 15px;}
.btn-submit{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
}

</style>