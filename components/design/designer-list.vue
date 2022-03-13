<template>
<div>
<ul class="design-list clearfix">
	  	<li   v-for="item in designer" :key="item.id">
			<nuxt-link  :to="{ name: 'designer-id', params:{ id: item.member_id }}">
	  		<div class="pic">
	  			<img :src="item.designer_img" v-if="item.designer_img"/>
                <img src="~/assets/images/defaultDesign.png" v-else />
	  		</div>
	  		<div class="f18 cblack mt15">
	  			{{item.real_name}}
	  		</div>
	  		</nuxt-link>
	  		<div class="cgray">{{designlevel[item.designer_level]}}</div>
	  		<div class="mt15">
	  			<!-- <i class="i-heart"></i> -->
	  			<div><span class="cgray">作品数</span>&nbsp; <span class="cblack f16">{{item.products_count}}</span> <br/>
                  <nuxt-link class="btnDetail"  :to="{ name: 'designer-id', params:{ id: item.member_id }}">查看资料</nuxt-link> 
                  <div class="cgray f12 mt5" v-if="item.city"> <i class="iconfont">&#xe61f;</i>{{item.city}}</div>
                   </div>
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
    page: 1,
    pageSize:10
    }
  },
  mounted(){  
			this.fetchDesign()
		},
		
 computed:{
	  ...mapState(['countfile','designer','designlevel'])
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
.design-list{margin-top: 40px;
    li{width: 180px;height: 370px; float: left; margin-right: 75px;border-radius:90px; background: #fff;text-align: center;    padding: 5px;
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
    .btnDetail{.btn(100%,30px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); margin-top: 2px; font-size: 14px; border-radius: 20px; width: 70%;}
    .btnDetail:hover{opacity: 0.9;}
}
</style>