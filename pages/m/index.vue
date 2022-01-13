<template>
<div>
   <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
			<img src="~/assets/images/mbanner01.jpg" />
		</div>
      <div class="swiper-slide">
			<img src="~/assets/images/mbanner02.jpg" />
		</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
  <div class="index-cont">
     <h3 class="item-tit first">
        全站素材
     </h3>
  </div>
  <ul class="ul-category clearfix">
     <li  v-for="item in category" :key="item.id">
        <nuxt-link :to="{ name:'m-material-id', params:{id: item.id }}" >
        <em :class="item.type_class">
           <i class="iconfont" v-if="item.type_class=='png'">&#xe602;</i>
           <i class="iconfont" v-if="item.type_class=='bjtp'">&#xe605;</i>
           <i class="iconfont" v-if="item.type_class=='ui'">&#xe604;</i>
           <i class="iconfont" v-if="item.type_class=='mbsc'">&#xe676;</i>
           <i class="iconfont" v-if="item.type_class=='syt'">&#xe606;</i>
           <i class="iconfont" v-if="item.type_class=='word'">&#xe6eb;</i>
           <i class="iconfont" v-if="item.type_class=='ppt'">&#xe6ea;</i>
           <i class="iconfont" v-if="item.type_class=='excel'">&#xe609;</i>
        </em> <br />
        <span>
           {{item.name}}
        </span>
        </nuxt-link>
     </li>
  </ul>
  <div class="index-cont">
  <div class="item-cont">
     <h3 class="item-tit">
        热点导航
     </h3>
     <div class="hot-nav">
        <nuxt-link  :to="{ name: 'm-material-id', params:{id:1 }}">
           <img src="~/assets/images/mbanner03.jpg"/>
        </nuxt-link>
        <nuxt-link to="/m/mobile-task">
           <img src="~/assets/images/mbanner04.jpg"/>
        </nuxt-link>
     </div>
  </div>
  </div>
</div>
</template>
<script>
import {
    mapState,mapActions
} from 'vuex'
export default {
	props:["position"],
   layout: 'mobile',
	data () {
    return {
     bannerUrl: [],
    }
  },
  head(){
	   return {
			title:'首页-图啦啦91tula.com'
			}
  },
 mounted() {
	    this.fetchBanner()		
       this.fetchCategory()	
  },
  computed:{
	  ...mapState(['homebanner','category'])
  },
  methods:{ //页面进来发送请求
      ...mapActions(['fetchHomeBanner','fetchCategory']),
	 async fetchBanner(){
		  let formDatas = new FormData();
		  formDatas.append('position', this.position);
		 await this.fetchHomeBanner(formDatas);
			  new Swiper('.swiper-container', {
						pagination: {
							clickable :true,
							el: '.swiper-pagination',
						},
						autoplay:true
						});
			
	  }
  },
}
</script>
<style lang="less" >
.swiper-container { width: 100%; height: 1.9rem; position: relative;  z-index: 2;  }
.swiper-container img{width: 100%;}
.swiper-container .swiper-pagination{ bottom: 0px;left: 0; width: 100%;}
.swiper-pagination-bullet{width: 8px; height: 8px; margin: 0px 4px;}
.swiper-pagination .swiper-pagination-bullet-active{background: #fff;}
.index-cont{padding: 0px 10px;}
.ul-category li{float: left; width: 25%; text-align: center; margin-top: 15px;
em{display: inline-block; width: 40px; height: 40px; line-height: 40px; border-radius: 20px; background: #34bc76; color: #fff;}
em.png{background: #34bc76;}
em.bjtp{background: #3738ff;}
em.ui{background: #9e3bff;}
em.mbsc{background: #cc1e00;}
em.syt{background: #39aeff;}
em.word{background: #5195fd;}
em.ppt{background: #5195fd;}
em.excel{background: #5195fd;}
em i.iconfont{font-size: 18px;}
span{font-size: 12px;}
}
.item-cont{margin-top: 25px;}
h3.item-tit{font-size: 15px; font-weight: bold; color: var(--color); border-left: 4px solid var(--color); 
text-indent: 8px; height: 15px; line-height: 15px;margin-bottom: 15px;}
h3.item-tit.first{margin-bottom: 0px; margin-top: 20px;}
.hot-nav{display: flex; justify-content: space-between;}
.hot-nav a{flex: 1;    display: grid;
    border-radius: 6px;
    overflow: hidden;
}
.hot-nav a:first-child{margin-right: 10px;}
.hot-nav a img{width: 100%;}
</style>