<template>
	<div class="prod-box">
	<div class="nav-left">
    <ul>
		<li  v-for="item in category"  :key="item.id" :class="{focus:item.id==categoryId}">
			<nuxt-link :to="{ name:'m-material-id', params:{id: item.id }}" >{{item.name}}</nuxt-link>
		</li>
	</ul>
	</div>
	<div class="nav-right">
    <ul class="waterfall-col"  v-if="productlist.length>0">
			<li class="item"  v-for="item in productlist" :key="item.id" >
				<nuxt-link :to="{ name: 'm-material-detail-id', params:{ id: item.id }}">
				<div class="prod-img"  :style="'background:#f2f2f2'">
				  <img :src="item.list_img_path">
				</div>
				<!-- <div class="prod-name signline">{{item.name + item.id}}</div> -->
				</nuxt-link>
			</li>
		</ul>
	</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
	data () {
    return {
		categoryId:0
    }
  },
  created(){
  },
  watch :{
      '$route': function (to, from) {
		   this.query=this.$route.query
           this.fetchProduct()
      },
	  '$store.state.productlist'(){
		  setTimeout(() => { //获取到数据到浏览器渲染需要时间
			 this.columnOnload()
		  },1000)
      }

    },
mounted(){
	// import('layui-layer')
	this.query=this.$route.query
	this.fetchCategory()
	this.fetchProduct()
  },

	computed:{
	  ...mapState(['productlist','personInfo','userToken','category'])
  },
	methods:{
		...mapActions({
		  fetchProductlist:'fetchProductlist',
		  fetchCategory: 'fetchCategory'
      }),
	
	 fetchProduct:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', 1);
		  formDatas.append('pageSize', 20);
		  this.categoryId=this.$route.params.id;
		  
		  formDatas.append('category_id', this.categoryId);
		  
		  this.fetchProductlist(formDatas);
	  },
	 columnOnload:function(){
		 if(this.productlist.length==0){
			 return
		 }
			var boxArr = $(".waterfall-col li"),
					num = Math.floor($(".waterfall-col").width() / boxArr.eq(0).outerWidth(true)),
					columnHeightArr = [];
					columnHeightArr.length = num;
					boxArr.each(function (index, item) {
						if (index < num) {
							columnHeightArr[index] = $(item).outerHeight(true);
			
						} else {
							
							var minHeight = Math.min.apply(null, columnHeightArr),
								minHeightIndex = $.inArray(minHeight, columnHeightArr);
			            //    console.log('aa',minHeightIndex)
							$(item).css({
								position: 'absolute',
								top: minHeight,
								left: boxArr.eq(minHeightIndex).position().left
							});
							columnHeightArr[minHeightIndex] += $(item).outerHeight(true);

							// console.log('bb',columnHeightArr[minHeightIndex])
						}
					});
					
					$(".waterfall-col").height(Math.max.apply(null, columnHeightArr));

		}
	},
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
html,body{background: #fff;}
.prod-box{display: flex;}
.nav-left{flex: 3; background: #f8f8f8; overflow-y: scroll; margin-right: 10px;
  li{height: 48px; line-height: 48px; padding: 0px 10px; text-align: center;}
  li>a{display: block; border-bottom: 1px solid #eee;}
  li.focus { color: var(--color); background-color: #fff;}

}
.nav-right{flex: 10; position: relative; height: 100vh; overflow-y: scroll;
li.item{width: 47%; float: left; margin-right: 3%; margin-top: 10px;}
li.item a{display: block;}
.prod-img{display: grid; padding: 6px; border-radius: 4px; overflow: hidden;}
.prod-img img{ max-width: 100%;}
.prod-name{display: grid; height: 30px; line-height: 30px; text-align: center;}
}
</style>