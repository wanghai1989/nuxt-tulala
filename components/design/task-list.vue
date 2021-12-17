<template>
<div>
	<div class="laymshade hand" v-if="showTaskRule">
			<div class="center-dialog">
				<div class="center-ctn-box">
					<div class="table-cell-box">
						<div class="Bigimg-box">
							<h3 class="steptheme">工单操作流程</h3>
							<em class="Bigimg-close-Btn" @click="closeBigImg()">×</em>
							<p class="step-tit">第一步、任务——>免费发布任务 <span class="cgray f14">（雇主）</span></p>
							<img src="~/assets/images/work01.jpg" />
							<p class="step-tit">第二步、任务——>任务名称——>参与竞价<span class="cgray f14">（设计师）</span></p>
							<img src="~/assets/images/work02.jpg" />
							<p class="step-tit">第三步、我的——>我的工单——>我的发布——>安全雇佣<span class="cgray f14">（雇主）</span></p>
							<img src="~/assets/images/work03.jpg" />
							<p class="step-tit">第四步、我的——>我的工单——>我的发布——>接受雇佣<span class="cgray f14">（设计师）</span></p>
							<img src="~/assets/images/work04.jpg" />
							<p class="step-tit">第六步、我的——>我的工单——>我的发布——>支付定金<span class="cgray f14">（雇主）</span></p>
							<img src="~/assets/images/work05.jpg" />
							<p class="step-tit">第七步、我的——>我的工单——>我的发布——>支付尾款<span class="cgray f14">（雇主）</span></p>
							<img src="~/assets/images/work06.jpg" />
							<p class="step-tit">第八步、后台结算，项目完成</p>
						</div>
					</div>
				</div>
			</div>
</div>

<div class="condition">
	<div class="cond-l">
	  	<div class="item-cond">
	  		<span class="filter-name">工单类别</span>
	  		<ul class="filter-list">
				<li> <a href="javascript:void(0)" rel="nofollow"  @click="fetchCond('category',0)" :class="{on:isActive==0}" >全部</a> </li>
	  			<li v-for="item in setting" :value="item.id" :key="item.id"> 
					<a href="javascript:void(0)" rel="nofollow"  @click="fetchCond('category',item.id)" :class="{on:isActive==item.id}">{{item.value}}</a>
				</li>
	  		</ul>
	  	</div>
	  	<div class="item-cond">
	  		<span class="filter-name">工单状态</span>
	  		<ul class="filter-list">
				<li > <a href="javascript:void(0)" rel="nofollow"  @click="fetchCond('receipt',0)" :class="{on:isActive2==0}" value="0">全部</a> </li>
	  			<li > <a href="javascript:void(0)" rel="nofollow"  @click="fetchCond('receipt',1)" :class="{on:isActive2==1}" value="1">可接工单</a> </li>
	  			<li> <a  href="javascript:void(0)" rel="nofollow"  @click="fetchCond('receipt',2)" :class="{on:isActive2==2}" value="2">其他</a> </li>
	  		</ul>
	  	</div>
	</div>
	<div class="cond-r">
		<router-link to="/task/public" class="btn-public">免费发布任务</router-link> <br />
		<a href="javascript:void(0)" @click="showRules()" class="linkrule">《任务操作流程》</a> 
	</div>
	  </div>
<ul class="ul-task" v-if="workorder.length>0">
	  	<li  v-for="item in workorder" :key="item.id">
	  		<div class=""><router-link  class="cmain f18 fw" :to="{ name: 'taskdetail', params:{ id: item.id }}" >{{item.name}}</router-link></div>
	  		<div class="work-box clearfix">
				<div class="work-item">类别&nbsp;<span class="cblack f16 fw">{{item.category_name?item.category_name:"--"}}</span></div>  
				<div class="work-item">预算&nbsp;<span class="cblack f16 fw">{{item.money}}</span></div>  
				<div class="work-item">发布日期&nbsp;<span class="cblack f16 fw">{{item.status_approved_time?item.status_approved_time:"--"}}</span></div>
				<div class="work-item">有效期&nbsp;<span class="cblack f16 fw">{{item.effective_time}}天</span></div>  
			</div>
	  		<div class="cgray mt10">项目描述：<span class="cblack">{{item.description}}</span></div>
	  	</li>
	  	
	  </ul>
<div class="nodata" v-else>
				<img src="~/assets/images/pic32.png" />
				<p>暂无工单</p>
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
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {MoPaging},
  data () {
    return {
	 isActive:0,
	 isActive2:0,
	 page:1,
	 showTaskRule:0
    }
  },
  mounted(){  
			this.fetchWorkord()
			this.fetchSet()
		},
		
 computed:{
	  ...mapState(['pageSize','countfile','workorder','setting'])
  },
  methods:{
 ...mapActions({
		  fetchWorkorder:'fetchWorkorder',
		  fetchSetting:'fetchSetting'
      }),
	  closeBigImg:function(){
			this.showTaskRule=0
		},
	showRules:function(){
			this.showTaskRule=1
		},
	  fetchCond:function(type,index){
		  if(type=='category'){
			  this.isActive = index
		  }
		  if(type=='receipt'){
			  this.isActive2 = index
		  }
      	this.fetchWorkord()
      },
	   fetchSet(){
      let formDatas = new FormData();
		  formDatas.append('type', 7);

		  this.fetchSetting(formDatas)
},
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchWorkord()
            },
fetchWorkord:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  formDatas.append('type', this.isActive);
		  formDatas.append('receipt', this.isActive2);

		  this.fetchWorkorder(formDatas)
	  }
}
}
 
</script>
<style lang="less" scoped>
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
.ul-task{margin-top: 20px;
    li{border-bottom: 1px solid #d6d6d6; padding: 30px 40px; background: #fff;width: 100%; box-sizing: border-box;} 
li:hover{background: #f9f9f9;}
li a:hover{text-decoration: underline;}
.work-box{color: var(--grayColor); margin-top: 20px;}
.work-item{float: left; margin-right: 100px;}
}
.condition{border-radius: 5px; background: #fff;padding: 20px 20px 30px; margin-top: 30px; display: flex;
.cond-l{flex: 1;}
.cond-r{width: 180px; text-align: right;}
.filter-name{background-color: transparent;  margin-right: 20px; height: 30px; line-height: 30px;}
.filter-list{flex: 1;  }
.filter-list li{float: left; margin: 0px 8px;}
.filter-list li a{background-color: transparent; color: #333;padding: 0px 15px; border-radius: 3px;  height: 30px; line-height: 30px;    display: inline-block;}
.filter-list li a.on,.filter-list li a:hover {background: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); color: #fff; }

.item-cond{ display: flex;
    margin-top: 15px;
    font-size: 14px;
}
 .btn-public{
    .btn(150px,40px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff); margin-top: 30px;
}
.btn-public:hover{opacity: 0.9;}
.linkrule{display: inline-block; color: var(--color); margin-top: 5px;}
}
.nodata{background: #fff; padding: 40px 0;}
h3.steptheme{font-size: 20px; font-weight: bold; color: var(--backColor); margin: 20px 0px 40px;}
.step-tit{font-size: 16px; color: var(--backColor); margin: 30px 0px 10px; text-align: left;}
</style>