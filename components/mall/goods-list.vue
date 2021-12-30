<template>
    <div class="shop-list">
			<div class="title">所有商品</div> 
			<ul class="ul-shop clearfix">
				<li v-for="item in goods" :key="item.id">
					<nuxt-link :to="{ name: 'mall-id', params:{ id: item.id }}">
					<div class="pic">
						<img  :src="item.goods_image" />
					</div>
					<div class=" prodname">{{item.goods_name}}</div>
					</nuxt-link>
					<div class="cgray">库存 {{item.inventory}}</div>
					<div class=" prodprice">{{item.integral}} 积分</div>
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
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import MoPaging  from '~/components/layout/web-pagination.vue'
export default {
components: {MoPaging},
    data(){
	return { 
		page:1
  }
  },
  computed:{
	  ...mapState(['goods','pageSize','countfile','condition'])
  },
  mounted(){  
	  	this.goodList()  //商品列表
  },
  methods:{ //页面进来发送请求
      ...mapActions({
          fetchGood: 'fetchGood'
      }),
		//从page组件传递过来的当前page
            pageChange:function(page) {

                this.page = page
                this.goodList()
            },
	  goodList:function(){
		  let params={
				page: this.page,
				pageSize:this.pageSize  //一页显示数量
			}

			 this.fetchGood(params)
	  }
  }
}
</script>
<style lang="less" scoped>
.shop-list{
     .title{border-left: 5px solid var(--redColor); height: 20px; line-height: 20px; text-indent: 15px; font-size: 18px; color: var(--backColor); margin: 30px 0px 25px;}
    .ul-shop{
    li{width: 220px; float: left; margin-right: 25px; height: 300px; border-top: 1px solid var(--redColor); background: #fff; padding: 25px 15px 0px;
     margin-bottom: 25px;text-align: center;    box-sizing: border-box;transition: all .2s linear; z-index: 1; }
    li:nth-child(5n){margin-right: 0;}
    li:hover{
  		z-index:2;
  	box-shadow:0 15px 30px rgba(0,0,0,.1);
  	transform:translate3d(0,-2px,0)}
    .pic{width: 140px; height: 140px; margin: 0 auto;}
    .pic img{ max-width: 100%; max-height: 100%;}
    .prodname{font-size: 18px; color: var(--backColor); margin-top: 20px; white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;}
    .prodprice{font-size: 16px; margin-top: 20px; color: var(--redColor);}
}
}


</style>