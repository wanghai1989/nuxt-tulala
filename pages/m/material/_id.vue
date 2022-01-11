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
head(){
	   return {
			title:'素材中心-图啦啦91tula.com'
			}
  }
}
</script>
<style lang="less" scoped>
</style>