<template>
    <div class="banner"> 
      <a href="#location" v-if="position=='qq_alliance'"><img :src="bannerUrl"></a>
      <img :src="bannerUrl" v-else>
		</div>
</template>
<script>
import { mapState,mapActions} from 'vuex'
export default {
	props:['position'],
  data () {
    return {
     bannerUrl: [],
     bannerLink:''
    }
  },
  created(){
    //  this.fetchBanner()
  },
   mounted() {
     this.fetchBanner()
  },
  watch :{
      '$route': function (to, from) {
		    this.fetchBanner()
      }
    },
computed:{
      ...mapState(['homebanner'])
  },
  methods:{ //页面进来发送请求
      ...mapActions(['fetchHomeBanner']),
	 async fetchBanner(){
     let formDatas = new FormData();
		 formDatas.append('position', this.position?this.position:'about_me');
		 await this.fetchHomeBanner(formDatas);
		 
      this.bannerUrl=this.homebanner[0].img
          this.bannerLink=this.homebanner[0].url
	  }
  },
 
}
</script>
<style lang="less" scoped>
.banner{max-width: 1920px; width: 100%; margin: 0 auto; display: grid; position: relative;
a{display: grid;}
img{width: 100%;}
}
</style>