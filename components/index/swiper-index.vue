<template>
    <div class="swiper-container">
	    <div class="swiper-wrapper">
	      <div class="swiper-slide" v-for="item in bannerUrl" :key="item.id">
	      	<a :href="item.url"> 
	      		<img :src="item.img"/>
	      	</a>
	      </div>
	    </div>
		<div class="swiper-pagination"></div>
		
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
  methods:{ //页面进来发送请求
      ...mapActions(['fetchHomeBanner']),
	  fetchBanner:function(){
		  let formDatas = new FormData();
		  formDatas.append('position', this.position);

		  this.fetchHomeBanner(formDatas).then(data => {
          this.bannerUrl=data.data
		  import('swiper')
				.then(() => {
					new Swiper('.swiper-container', {
						loop:true,
						autoplay : 5000,
						pagination: '.swiper-pagination',
        			    paginationClickable: true,
						// navigation: {
						// 	nextEl: '.swiper-button-next',
						// 	prevEl: '.swiper-button-prev',
						// },
					})
				})
        })
	  }
  },
//   asyncData ({ store, router }) {
//       return store.dispatch('fetchHomeBanner')
//   },
 
}
</script>
<style lang="less" >
 .swiper-container { width: 100%; height: 560px; position: relative;  z-index: 2;  }
.swiper-pagination .swiper-pagination-bullet{width: 10px !important; height: 10px !important;}
.swiper-pagination{bottom:70px !important;}
 .swiper-pagination .swiper-pagination-bullet-active{background: #fff !important;}
</style>