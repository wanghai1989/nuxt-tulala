<template>
<div>
    <webBanner position='points_mall'></webBanner>
    <goodsDetail></goodsDetail>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import goodsDetail from '~/components/mall/goods-detail.vue'
export default {
components: {webBanner,goodsDetail},
   layout: 'web',
   components: {webBanner,goodsDetail},
//   created(){
//    console.log(this.$route.params.id)
//   },

}
</script>