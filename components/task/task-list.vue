<template>
<div>
<taskRule></taskRule>

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
		<nuxt-link to="/task/public" class="btn-public">免费发布任务</nuxt-link> <br />
		<a href="javascript:void(0)" @click="showRules()" class="linkrule">《任务操作流程》</a> 
	</div>
	  </div>
<ul class="ul-task" v-if="workorder.length>0">
	  	<li  v-for="item in workorder" :key="item.id">
	  		<div class=""><nuxt-link  class="cmain f18 fw" :to="{ name: 'task-id', params:{ id: item.id }}" >{{item.name}}</nuxt-link></div>
	  		<div class="work-box clearfix">
				<div class="work-item">类别&nbsp;<span class="cblack f16 fw">{{item.category_name?item.category_name:"--"}}</span></div>  
				<div class="work-item">预算&nbsp;<span class="cblack f16 fw">{{item.money}}</span></div>  
				<div class="work-item">发布日期&nbsp;<span class="cblack f16 fw">{{item.status_approved_time?item.status_approved_time:"--"}}</span></div>
				<div class="work-item">有效期&nbsp;<span class="cblack f16 fw">{{item.effective_time}}</span></div>   <!-- {{endDays(item.effective_time)}}-->
				<!-- <div class="work-item">工单状态&nbsp;<span class="cblack f16 fw">{{workName[item.status]}}</span></div> -->
			</div>
	  		<div class="cgray mt10">项目描述：<span class="cblack">{{item.description}}</span></div>
	  	</li>
	  	
	  </ul>
<div class="nodata" v-else>
				<img src="~/assets/images/pic32.png" />
				<p>暂无工单</p>
			</div>
	  <mo-paging endDays(item.effective_time)
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
</div>
</template>
<script>
import common from '~/assets/js/common'
import taskRule  from '~/components/layout/task-rule.vue'
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	components: {MoPaging,taskRule},
  data () {
    return {
	 isActive:0,
	 isActive2:0,
	 page:1,
	 pageSize:10
    }
  },
  mounted(){  
			this.fetchWorkord()
			this.fetchSet()
		},
		
 computed:{
	  ...mapState(['countfile','workorder','setting','workName','showTaskRule'])
  },
  
  methods:{
	...mapMutations(['setTaskRule']),
 ...mapActions({
		  fetchWorkorder:'fetchWorkorder',
		  fetchSetting:'fetchSetting'
      }),
	showRules:function(){
		this.setTaskRule(1)
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
	  },
	endDays:function(time){
		return common.getEndDays(time)
	},
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
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
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
</style>