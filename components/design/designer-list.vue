<template>
<div>
<ul class="design-list clearfix">
	  	<li   v-for="item in designer" :key="item.id">
			<router-link  :to="{ name: 'designer-id', params:{ id: item.member_id }}">
	  		<div class="pic">
	  			<img :src="item.avatar" />
	  		</div>
	  		<div class="f18 cblack mt25">
	  			{{item.real_name}}
	  		</div>
	  		</router-link>
	  		<div class="cgray">资深设计师</div>
	  		<div class="mt15">
	  			<i class="i-heart"></i>
	  			<div>{{item.products_count}}</div>
	  		</div>
	  	</li>
	  
	  </ul>
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
    page: 1
    }
  },
  mounted(){  
			this.fetchDesign()
		},
		
 computed:{
	  ...mapState(['pageSize','countfile','designer'])
  },
  methods:{
 ...mapActions({
		  fetchDesigner:'fetchDesigner'
      }),
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchDesign()
            },
fetchDesign:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);

		  this.fetchDesigner(formDatas)
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
.design-list{margin-top: 40px;
    li{width: 180px;height: 357px; float: left; margin-right: 75px;border-radius:90px; background: #fff;text-align: center;    padding: 5px;
    box-sizing: border-box; margin-bottom: 20px;}
    li:nth-child(5n){margin-right: 0;}
    .pic{width: 170px; height: 170px; border-radius:85px; border-bottom-left-radius: 0; overflow: hidden;}
    .pic img{width: 100%;}
    .i-heart{.bg-map(42px,36px,-760px, -36px);}
    li:hover{
        display: block;
        -webkit-transition: all 0.2s;
    -webkit-transform: translateY(-3px);
    box-shadow:2px 2px 8px rgba(0,0,0,0.1);
    }
}
</style>