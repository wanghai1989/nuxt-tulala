<template>
<div class="task-l">
  <div class="laymshade taskamount" v-show="popupShow">
			<div class="hand-box clearfix">
				<div class="hand-head">
					确定雇佣 <span class="f12 cgray">定金占比<em class="f14 cmain">{{workinfo.amount_of_ratio}}</em>%</span>
				</div>
				<i class="close" @click="closeemploy()"></i>
        <form  @submit="doSubmit">
				  <div class="vam vam-hand">
				  	<div>
					<div class="vam-l"><span class="cred">*</span>确定金额</div>
					<div class="vam-r">
						<div>&nbsp;</div>
						<input type="text" class="input" placeholder="请输入项目最终金额" v-model="real_money" @input="amountKey($event)"  onkeyup="this.value=this.value.replace(/\D/g, '')" />
						<p class="cgray f12">此金额为双方最终商定项目金额</p>
					</div>
				</div>
				<div>
						<div><span class="cred">*</span>项目合同</div>
						<div>
				              <a href="javascript:void(0)" class="btn-upload">上传文件 <input type="file" accept=".doc,.docx"  @change="changefile()" id="file_contract"> </a>
							  <span class="cmain" v-if="isContract">已上传</span>
							  <i id="tip_file" class="i-tipfile"></i><span class="cgray f12">合同格式为doc、docx，文件不超过为1M</span> 
						</div>
					</div>
				<div>
					<div>定金</div>
					<div>
            {{start_amount}} 
					</div>
				</div>
				<div>
					<div>尾款</div>
					<div>
            {{final_amount}}
					</div>
				</div>
				<div>
					<div></div>
					<div>
            <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
            <button type="submit" class="btn-enter">安全雇佣</button>
					</div>
				</div>
				  </div>
          </form>
			</div>
		</div>
	<workStep :stepId="3"></workStep>
	<div class="task-info">
		<div class="task-title">
		{{workinfo.name}}
	</div>
	<div class="task-describ clearfix">
		<div class="span-txt"><span class="cgray">任务类别</span>&nbsp;&nbsp;<span class="fw">{{workinfo.category_name}}</span></div>
		<div class="span-txt"><span class="cgray">预算</span>&nbsp;&nbsp;<span class="fw">{{workinfo.money}}</span></div>
		<div class="span-txt"><span class="cgray">发布时间</span>&nbsp;&nbsp;<span class="fw">{{workinfo.status_approved_time?workinfo.status_approved_time:'--'}}</span></div>
		<div class="span-txt end"><span class="cgray">有效期</span>&nbsp;&nbsp;<span class="fw">{{endDays(workinfo.effective_time)}}</span></div>
		<div class="span-txt row"><span class="cgray">项目描述</span>&nbsp;&nbsp;<span class="fw">{{workinfo.description}}</span></div>
		<div class="span-txt row" v-if="workinfo.img_one"><span class="cgray" style="vertical-align: middle;">参考附件</span>
		<div class="egg-img" @click="showImg(workinfo.img_one)"  v-if="workinfo.img_one"> <img :src="workinfo.img_one"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_two)"  v-if="workinfo.img_two"><img :src="workinfo.img_two"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_three)"  v-if="workinfo.img_three"><img :src="workinfo.img_three"/></div>
		<div class="egg-img" @click="showImg(workinfo.img_four)" v-if="workinfo.img_four"><img :src="workinfo.img_four" /></div>
		<div class="egg-img" @click="showImg(workinfo.img_five)" v-if="workinfo.img_five"><img :src="workinfo.img_five" /></div>
		</div>
	</div>
	</div>
	<div class="employ-list">
		<div class="title">
			<h3>可雇佣</h3>
			<span class="cgray f14">已有<span class="f18 cblack"> {{workinfo.apply_count}} </span> 位报名</span>
		</div>
		<ul class="ul-employ" v-if="employlist.length>0">
			<li class="clearfix"  v-for="item in employlist" :key="item.id">
				<div class="l">
					<nuxt-link :to="{ name: 'designer-id', params:{ id: item.member_id }}" class="nickname"> {{item.nickname}}</nuxt-link>
					<div class="mt20 cgray">
						<div class="item-txt">作品  <span class="cblack fw">{{item.product_count}}</span>  件</div> 
						<div class="item-txt">级别  <span class="cblack fw">{{!designlevel[item.designer_level]?"--":designlevel[item.designer_level]}}</span> <i class="i-tip" :id="'tip'+ item.id"  @click="tips('tip'+item.id)"></i> </div>
						<div class="item-txt">设计师号码  <span class="cblack fw">{{item.mobile}}</span> </div> 
						<div class="item-txt">时间 <span class="cblack">{{item.created_at}}</span></div>
						<div class="item-txt row">说明  <span class="cblack">{{item.description}}</span></div>
					</div>
					
					
				</div>
				<div class="r">
					<div class="f12 cgray">报价</div>
					<div class="f18 cred">{{item.money}} 元</div>
					<a class="btn-employ" href="javascript:void(0)" @click="safeEmploy(item.id)">安全雇佣</a>
				</div>
			</li>
		</ul>
		 <div class="nodata" v-else>
				<img src="~/assets/images/pic32.png" />
				<p>暂无数据</p>
			</div>
		 <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
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
import MoPaging  from '~/components/layout/web-pagination.vue'
import workStep from '~/components/layout/work-step.vue'
export default {
	components: {MoPaging,workStep},
  data () {
    return {
	// taskID:'',//任务ID 
    join_id:'',//竞价id
    popupShow:0, //安全雇佣窗口是否显示
    real_money:'', //项目总额
    start_amount:0, //项目定金
    final_amount:0, //项目
		errorMsg:0,
	showBigImg:0,
	 UrlBigImg:'',
	 isContract:0,//是否上传合同
	  userInfo:{}
    }
  },
  mounted(){  
	//   this.taskID=this.$route.params.id
	//   this.fetchWorkinf(this.taskID)
	  this.fetchEmploy()
		},
		
 computed:{
	  ...mapState(['page','pageSize','countfile','employlist','workinfo','personInfo','userToken','designlevel'])
  },
  methods:{
 ...mapActions({
    //   fetchWorkinfo:'fetchWorkinfo',
	  fetchEmploylist:'fetchEmploylist',
      createEmploy:'createEmploy'
      }),
	  endDays:function(time){
		return common.getEndDays(time)
	},
	   changefile(){
		   console.log($("#file_contract").get(0).files[0].size)
		let size=$("#file_contract").get(0).files[0].size/1024/1024
		let name=$("#file_contract").get(0).files[0].name;
        var index = name.lastIndexOf('.');
        var ext = name.substr(index + 1); //文件扩展名
		var suffix= ["doc", "docx", "pdf"]; //合同支持的后缀名
		if(size>1){
			layer.msg('文件超过1M，请重新上传')
			return
		}
		if(suffix.indexOf(ext)==-1){
			layer.msg('项目合同格式不对，请重新上传')
			return
		}else{
			this.isContract=1
		}
	  }, 
	   tips(id){
		  layer.tips('<div>一级：设计师助理</br>二级：设计师</br>三级：资深设计师</br>四级：设计指导</div>', '#'+id, {
				  tips: [1, '#34bc76'],
				  time: 4000
				});
		},
	//    tipsFile(){
	// 	  layer.tips('<div>合同文件格式为（doc、docx、pdf）</div>', '#tip_file', {
	// 			  tips: [1, '#34bc76'],
	// 			  time: 4000
	// 			});
	// 	},
      closeemploy:function(){
			this.popupShow=0
		},
      safeEmploy:function(id){
        this.join_id=id
        this.popupShow=1
      },
	  showImg:function(url){
		this.UrlBigImg=url
	    this.showBigImg=1
		},
		closeBigImg:function(){
			this.showBigImg=0
		},
      amountKey:function(e){
        let real_money = e.target.value;
        this.start_amount=real_money*0.5
        this.final_amount=real_money*0.5
      },
    //   fetchWorkinf:function(id){
	// 	  let formDatas = new FormData();
	// 	  formDatas.append('id',id);
	// 	  formDatas.append('token', this.userToken);
     
	// 	  this.fetchWorkinfo(formDatas)
	//   },
	  //从page组件传递过来的当前page
      pageChange:function(page) {
          this.page = page
          this.fetchEmploy()
      },
 doSubmit (e) {
			e.preventDefault()
			 let file=$("#file_contract").get(0).files[0];
			 const errMsg=common.validateEmploy(this.real_money,this.isContract)
			
			  this.errorMsg=errMsg

		if (!errMsg) {
			let formDatas = new FormData();
			formDatas.append('token', this.userToken);
			formDatas.append('id', this.join_id);
			formDatas.append('real_money', this.real_money); 
			formDatas.append('contract', file);
			this.createEmploy(formDatas)
			.then((data) => {
				console.log(data)
				if(data.code==0){
				layer.msg(data.msg, {icon: 2});
				}
				if(data.code==1){
				layer.msg('雇佣成功，待设计师确认!', {icon: 1});
				setTimeout(() => {
					this.popupShow=0
					this.$router.push('/mine/my-works')
				}, 2000);
				}
			})
		  }
		  },
fetchEmploy:function(){
		  let formDatas = new FormData();
		  formDatas.append('id',this.workinfo.id);
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  formDatas.append('token', this.userToken);
		  this.fetchEmploylist(formDatas)
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
.nodata{margin-top: 0px;}
.hand-box{width: 600px; position: fixed; height: 450px; top: 50%; left: 50%; margin-top: -200px; margin-left: -420px; z-index: 5; 
background: #fff; border-radius: 5px;  position: relative;
.hand-head{width: 100%; height: 60px; line-height: 60px; font-size: 18px; color:var(--backColor); text-indent: 15px;
    background-color: #FAFAFA;
    border-bottom: 1px solid #EBEBEB;}
.vam-hand{width: 500px; margin: 10px auto 0; }
.vam-hand>div>div{padding: 10px 0;}
.vam-hand .i-tipfile{.bg-map(18px,18px, -1091px, -8px);}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 18px; right: 15px;}
.btn-submit{
    .btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);
}
.btn-upload{ .btn(74px,26px,#c4c4c4,#fff,var(--backColor)); font-size: 12px; position: relative; border-radius: 2px;
	input[type='file']{opacity: 0; position: absolute; left: 0px; width: 76px;}
}
.btn-upload:hover{background: #f0f0f0;}
}
.task-l{float: left; width: 895px; float: left; margin-right: 25px;   
.task-title{font-size: 18px; font-weight: bold; color: var(--backColor); height: 70px; line-height: 70px; border-bottom: 1px solid #eee; margin-bottom: 15px;}
    .task-info{padding: 0px 25px 25px;background: #fff;}

	// .work-title{font-size: 14px; color:var(--backColor); font-weight: bold; margin-bottom: 15px;}
    // .title{height: 80px; line-height: 80px;background: #eee; color:var(--backColor); text-indent: 25px; font-size: 20px;}
	.title{height: 80px; line-height: 80px;background: #eee; color:var(--backColor); padding: 0px 25px; font-size: 20px; display: flex;}
	.title>h3{flex: 1;}
    .span-txt{line-height: 40px; float: left;margin-right: 70px; line-height: 25px; margin-bottom: 15px;}
	.span-txt.end{margin-right: 0px;}
    .span-txt.row{width: 100%;}
    .vip-info {margin: 40px 0 0; width: 820px;}
    .vip-info .l{color:var(--backColor); text-align: right; width: 80px;}
    .vip-info .r{padding: 10px 0px 10px 12px; }
    .input,.select{width: 400px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
    textarea{width: 495px; height: 165px; border: 1px solid #d0d0d0;text-indent: 5px; color: #333; border-radius: 4px;}
    .btn-enter{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 4px; margin-top: 30px;}
    .btn-report{.btn(180px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
    .employ-list{ margin-top: 25px;
     .title{display: flex; background: #eee; height: 80px;  padding-right: 25px;}
     .title h3{flex: 1; font-size: 20px; color: #333; text-indent: 0;}
    .ul-employ{
    li{padding: 25px 25px; background: #fff; border-bottom: 1px solid #d4d4d4;}
	li:last-child{border-bottom: none;}
    li .l{float: left; width: 80%;}
	li .l .nickname{font-size: 18px; color: var(--color); font-weight: bold;}
	li .l .nickname:hover{text-decoration: underline;}
	.item-txt{display: inline-block; margin-right: 40px; line-height: 40px;   color: var(--grayColor);}
	.item-txt:nth-child(4){margin-right: 0;}
	.item-txt.row{display: block; line-height: 22px;}
    li .r{float: left; width: 20%; text-align: right;}
    .i-certi{.bg-map(20px,22px, -1002px, -70px);}
	.i-tip{.bg-map(18px,18px, -1091px, -8px);}
	
    .btn-employ{.btn(137px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); margin-top: 15px;}
    }
    } 
    
    }
</style>