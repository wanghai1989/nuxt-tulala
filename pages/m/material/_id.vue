<template>
<div>
   <productList></productList>
</div>
</template>
<script>
import productList from '~/components/mobile/product-list.vue'
export default {
   layout: 'mobile',
components: {productList},
metaInfo: {
   title: '素材中心-图啦啦'
  }
  
}
</script>
<style lang="less" scoped>
</style>