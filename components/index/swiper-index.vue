<template>
	<div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"  v-for="item in homebanner" :key="item.id">
			<a :href="item.url"> 
	      		<img :src="item.img"/>
	      	</a>
		</div>
    </div>
	<div class="swiper-button-prev swiper-button-white"></div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="swiper-button-next swiper-button-white"></div><!--右箭头。如果放置在swiper外面，需要自定义样式。-->
    <!-- Add Pagination -->
    <!-- <div class="swiper-pagination"></div> -->
  </div>
	
</template>
<script>
import {
    mapState,mapActions
} from 'vuex'
export default {
	props:["position"],
	data () {
    return {
     bannerUrl: [],
    }
  },
 mounted() {
	    this.fetchBanner()			
  },
  computed:{
	  ...mapState(['homebanner'])
  },
  methods:{ //页面进来发送请求
      ...mapActions(['fetchHomeBanner']),
	 async fetchBanner(){
		  let formDatas = new FormData();
		  formDatas.append('position', this.position);
		 await this.fetchHomeBanner(formDatas);
			  new Swiper('.swiper-container', {
						// pagination: {
						// 	clickable :true,
						// 	el: '.swiper-pagination',
						// },
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
							},
						autoplay: {
								delay: 5000,
								stopOnLastSlide: false,
								disableOnInteraction: true,
								}
						});
			
	  }
  },
}
</script>
<style lang="less" scoped>
.swiper-container { width: 100%; height: 560px; position: relative;  z-index: 2; }
// .swiper-pagination{ bottom: 70px;left: 0; width: 100%;}
// .swiper-pagination-bullet{width: 10px; height: 10px; margin: 0px 4px;}
// .swiper-pagination .swiper-pagination-bullet-active{background: #fff;}

.swiper-button-next{right: 54px;}

</style>