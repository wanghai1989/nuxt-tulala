<template>
<div>
    <webBanner position='points_mall'></webBanner>
    <goodsDetail></goodsDetail>
</div>
</template>

<script>
import {mapState} from 'vuex'
import webBanner from '~/components/layout/web-banner.vue'
import goodsDetail from '~/components/mall/goods-detail.vue'
export default {
components: {webBanner,goodsDetail},
   layout: 'web',
   head(){
	   return {
			title: this.gooddetail.goods_name+'_图啦啦91tula.com'
			}
  },
   components: {webBanner,goodsDetail},
    async asyncData ({ store, params}) {  //服务器渲染
	await  store.dispatch('fetchGoodDetail',{goods_id:params.id});
  },
  computed:{
	  ...mapState(['gooddetail'])
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },

}
</script>