<template>
<div class="task-l">
	<!-- <div class="title">素材网站页面设计</div> -->
	<workStep :stepId="2"></workStep>
	<div class="task-info">
	<div class="task-title">
		{{workinfo.name}}
	</div>
	<div class="task-describ clearfix">
		<div class="span-txt"><span class="cgray">任务类别</span>&nbsp;&nbsp;<span class="fw">{{workinfo.category_name}}</span></div>
		<div class="span-txt"><span class="cgray">预算</span>&nbsp;&nbsp;<span class="fw">{{workinfo.money}}</span></div>
		<div class="span-txt"><span class="cgray">发布时间</span>&nbsp;&nbsp;<span class="fw">{{workinfo.status_approved_time?workinfo.status_approved_time:'--'}}</span></div>
		<div class="span-txt end"><span class="cgray">有效期</span>&nbsp;&nbsp;<span class="fw">{{workinfo.effective_time}}天</span></div>
		<div class="span-txt row"><span class="cgray">项目描述</span>&nbsp;&nbsp;<span class="fw">{{workinfo.description}}</span></div>
		<div class="span-txt row" v-if="workinfo.img_one"><span class="cgray" style="vertical-align: middle;">参考附件</span>
		<div class="egg-img" @click="showImg(workinfo.img_one)"  v-if="workinfo.img_one"> <img :src="workinfo.img_one"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_two)"  v-if="workinfo.img_two"><img :src="workinfo.img_two"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_three)"  v-if="workinfo.img_three"><img :src="workinfo.img_three"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_four)" v-if="workinfo.img_four"><img :src="workinfo.img_four" /></div>
		<div class="egg-img" @click="showImg(workinfo.img_five)" v-if="workinfo.img_five"><img :src="workinfo.img_five" /></div>
		</div>
	</div>
	<div class="task-bidding">
		<div class="tip" v-if="!(personInfo.designer_status==102)">
			<i></i>您还未 <nuxt-link to="/enter/design-basic" class="cmain">入驻图啦啦</nuxt-link>，无法报名参与
		</div>
		<form  @submit="doSubmit" >
		<div class="vam vip-info">
			<div>
				<div class="l"><span data-v-7293f343="" class="cred">*</span>报价</div>
				<div class="r"><input type="text" class="input" v-model="money"  onkeyup="this.value=this.value.replace(/\D/g, '')"/> 元 </div>
			</div>
			<div>
				<div class="l"><span data-v-7293f343="" class="cred">*</span>说明</div>
				<div class="r">
					<textarea placeholder="请输入说明"  v-model="description"  @keyup="getLength()"></textarea>
					<p class="cgray f12">最多输入200字，您还可以输入<span class="cmain">{{200-content_length}}</span>个字</p>
				</div>
			</div>
			<div>
				<div class="l"></div>
				<div class="r">
					<div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
					<button type="submit" class="btn-report"  v-if="(workinfo.status==1) && (personInfo.designer_status==102)">参与竞价</button>
					<button type="submit" class="btn-report" disabled v-else >参与竞价</button>
					<!-- <button type="submit" class="btn-report"  v-bind:disabled="!personInfo.certification">报名参与</button> -->
					<div class="rule">
						<nuxt-link :to="{ path:'/agreement', query:{id:6}}"  class="cmain"  target="_blank">《违规交易说明》</nuxt-link>
					</div>
					
				</div>
			</div>
		</div>
		</form>
	</div>
	</div>
	<div class="laymshade hand" v-if="showBigImg">
			<div class="center-dialog">
				<div class="center-ctn-box">
					<div class="table-cell-box">
						<div class="Bigimg-box">
							<em class="Bigimg-close-Btn" @click="closeBigImg()">×</em>
							<img :src="UrlBigImg" />
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import common from '~/assets/js/common'
import workStep from '~/components/layout/work-step.vue'
export default {
   components: {workStep},
  data () {
    return {
		money:'',
		description:'',
		id:'',
		content_length:0,
		errorMsg:'',
		showBigImg:0,
	 UrlBigImg:''
	//  userInfo:{}
    }
  },
  mounted(){  
	  this.id=this.$route.params.id
		},
 computed:{
	  ...mapState(['workinfo','personInfo','userToken'])
  },
  methods:{
 ...mapActions({
		  createOffer:'createOffer'
      }),
	  getLength(){
		this.content_length=this.description.length
	},
	showImg:function(url){
		this.UrlBigImg=url
	    this.showBigImg=1
	
},
closeBigImg:function(){
			this.showBigImg=0
		},
 doSubmit (e) {
			e.preventDefault()
			if(this.personInfo.designer_status!=102){
				layer.msg('你还未入驻图啦啦，不能参与竞价', {icon: 2});
				return
			}
			const errMsg=common.validateOffer(this.money,this.description)
			this.errorMsg=errMsg
		if (!errMsg) {
			let formDatas = new FormData();
			formDatas.append('token', this.userToken);
			formDatas.append('id', this.id);
			formDatas.append('money', this.money);
			formDatas.append('description', this.description);
			this.createOffer(formDatas)
			.then((data) => {
				if(data.code==0){
				layer.msg(data.msg, {icon: 2});
				}
				if(data.code==1){
				layer.msg(data.msg, {icon: 1});
				setTimeout(() => {
					this.money='',
                	this.description=''
				}, 2000);
				}
			})
		  }
		  },
// fetchWorkinf:function(id){
// 		  let formDatas = new FormData();
// 		  formDatas.append('id',id);

// 		  this.fetchWorkinfo(formDatas)
// 	  }
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
.task-l{float: left; width: 895px; float: left; margin-right: 25px;   
    .task-title{font-size: 18px; font-weight: bold; color: var(--backColor); height: 70px; line-height: 70px; border-bottom: 1px solid #eee; margin-bottom: 15px;}
    .task-info{padding: 0px 25px 25px;background: #fff;}
    .title{height: 80px; line-height: 80px;background: #eee; color:var(--backColor); text-indent: 25px; font-size: 20px;}
    .span-txt{line-height: 40px; float: left;margin-right: 70px; color: var(--backColor);}
	.span-txt.end{margin-right: 0px;}
    .span-txt.row{width: 100%;}
	.egg-img{display: inline-block; width: 140px;height: auto; max-height: 140px; overflow: hidden; vertical-align: middle;  margin-top: 10px;}
	.egg-img img{width: 100%;}
    .vip-info {margin: 40px 0 0; width: 820px;}
    .vip-info .l{color:var(--backColor); text-align: right; width: 80px;}
    .vip-info .r{padding: 10px 0px 10px 12px; }
    .input,.select{width: 100px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
    textarea{width: 100%; height: 100px; border: 1px solid #d0d0d0;text-indent: 5px; color: #333; border-radius: 4px;}
    .task-bidding{padding-top: 25px; border-top: 1px solid #eee;    margin-top: 15px;}
    .tip{font-size: 12px; color: var(--grayColor);}
    .tip i{.bg-map(16px,16px,-999px, -44px); margin-right: 6px;}
    .btn-report{.btn(180px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
	.rule{width: 180px; text-align: center; margin-top: 5px;}
  
    
    }
</style>