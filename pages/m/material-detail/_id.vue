<template>
<div class="m-container">
   <productDetail></productDetail>
</div>
</template>
<script>
import productDetail from '~/components/mobile/product-detail.vue'
import {mapState} from 'vuex'
export default {
components: {productDetail},
computed:{
	  ...mapState(['productinfo'])
  },
  head(){
	   return {
			title: this.productinfo.meta_title
			}
  },
  async asyncData ({ store, params}) {  //服务器渲染
	await  store.dispatch('fetchProductinfo',{id:params.id});
  }
}
</script>
<style lang="less" scoped>

</style>