<template>
    <div class="condition">
	  	<div class="main-cond clearfix"   v-if="JSON.stringify(condition.scenarios)!='[]'">
	  		<span class="filter-name ">场景</span>
	  		<ul class="filter-list ">
				<li > <a href="javascript:void(0)" :class="{on:!query.scenarios_id}"  rel="nofollow" @click="doSearch('scenarios',0)">全部</a> </li>
	  			<li v-for="item in condition.scenarios"  :key="item.id"> 
					  <a href="javascript:void(0)" rel="nofollow" :class="{on:item.id==query.scenarios_id}"  @click="doSearch('scenarios',item.id)">{{item.name}}</a> 
				</li>
	  		</ul>
	  	</div>
	  	<div class="item-cond" v-if="JSON.stringify(condition.file_formats)!='[]'">
	  		<span class="filter-name">格式</span>
	  		<ul class="filter-list">
				 <li > <a href="javascript:void(0)"  :class="{on:!query.format_id}" rel="nofollow" @click="doSearch('formats',0)">全部</a> </li>
	  			<li v-for="item in condition.file_formats"  :key="item.id"> 
					  <a href="javascript:void(0)" rel="nofollow" :class="{on:item.id==query.format_id}"  @click="doSearch('formats',item.id)">{{item.name}}</a> 
				</li>
	  		</ul>
	  	</div>
		  <div class="item-cond"  v-if="JSON.stringify(condition.shape)!='[]'">
	  		<span class="filter-name">版式</span>
	  		<ul class="filter-list">
				<li > <a href="javascript:void(0)"   :class="{on:!query.shape_id}" rel="nofollow" @click="doSearch('shape',0)">全部</a> </li>
	  			<li class="on" v-for="item in condition.shape"  :key="item.id"> 
					  <a href="javascript:void(0)" rel="nofollow" :class="{on:item.id==query.shape_id}"   @click="doSearch('shape',item.id)">{{item.name}}</a> 
				</li>
	  		</ul>
	  	</div>
	  	<div class="item-cond">
	  		<span class="filter-name">排序</span>
	  		<ul class="filter-list">
				<li> <a href="javascript:void(0)" rel="nofollow"   :class="{on:!query.sort_id}"   @click="doSearch('sort',0)">默认</a> </li>
	  			<li> <a href="javascript:void(0)" rel="nofollow"  :class="{on:1==query.sort_id}" @click="doSearch('sort',1)">昨日热门</a> </li>
	  			<li> <a href="javascript:void(0)" rel="nofollow"  :class="{on:2==query.sort_id}" @click="doSearch('sort',2)">热门收藏</a> </li>
	  			<li> <a href="javascript:void(0)" rel="nofollow"  :class="{on:3==query.sort_id}" @click="doSearch('sort',3)">最新上传</a> </li>
	  		</ul>
	  	</div>
	  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
// props:["categoryId"],
 data () {
    return {
	  query:{},
	  scenarios_id:0,
	  format_id:0,
	  shape_id:0,
	  sort_id:0,
	  categoryId:0,
	  keyword:''
    }
  },
  watch :{
      '$route': function (to, from) {
		  this.categoryId= this.$route.params.id
		   this.fetchCond(this.categoryId)
      }
    },
  created(){
	  this.categoryId= this.$route.params.id
  },
  mounted(){  
	this.fetchCond(this.categoryId)
		},
		
 computed:{
	  ...mapState(['condition'])
  },
  methods:{
 ...mapActions({
		  fetchCondition:'fetchCondition'
      }),
	doSearch(type,val){
        if(type=='scenarios'){this.scenarios_id=val}
		if(type=='formats'){this.format_id=val}
		if(type=='shape'){this.shape_id=val}
		if(type=='sort'){this.sort_id=val}
		
		this.query.scenarios_id=this.scenarios_id
		this.query.format_id=this.format_id
		this.query.shape_id=this.shape_id
		this.query.sort_id=this.sort_id
		this.keyword=this.$route.query.keyword
		if(this.keyword){
			this.query.keyword=this.this.keyword
		}
		this.$router.push({name: this.$route.name,params:{id:this.categoryId},query:this.query});
        
      },
fetchCond:function(category_id){
		  let formDatas = new FormData();
		  formDatas.append('category_id', category_id);  //如果
		  this.fetchCondition(formDatas)
	  }
}
} 
</script>
<style lang="less" scoped>
.condition{border-radius: 5px; background: #fff;padding: 20px 20px 20px; margin-top: 30px;
.filter-name{background-color: transparent;  margin-right: 20px; height: 30px; line-height: 30px;}
// .all-type{   padding: 0px 15px; border-radius: 3px; height: 30px; line-height: 30px;}
// .all-type.on{    color: #fff;
//     background: linear-gradient(90deg, 
//         #2dc61d 0%, 
//         #26b216 100%);}
.filter-list{flex: 1;  }
.filter-list li{float: left; margin: 0px 8px;}
.filter-list li a{background-color: transparent; color: #333;padding: 0px 15px; border-radius: 3px;  height: 30px; line-height: 30px;    display: inline-block;}
.filter-list li a.on,.filter-list li a:hover {background: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); color: #fff; }
.main-cond{display: flex;
        padding: 0px 200px 10px 0px; border-bottom: 1px solid var(--border);
    font-size: 14px;
    .filter-list li a{font-size: 14px;}
}
.item-cond{ display: flex;
    margin: 5px 0px;
    font-size: 14px;
}
}
.condition.task{border-top: 2px solid #3ebb2b; padding: 10px 25px 30px; border-radius: 0; }
</style>