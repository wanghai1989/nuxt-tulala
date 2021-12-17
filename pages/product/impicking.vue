<template>
<div>
    <webLogin></webLogin>
    <webUnvip></webUnvip>
    <div class="wrapper1505">
      <prodSearch></prodSearch>
      <impickingCond></impickingCond>
      <prodList :typeClass="type_class"></prodList>
    </div>
</div>
</template>
<script>
import webLogin from '~/components/layout/web-login.vue'
import webUnvip from '~/components/layout/web-unvip.vue'
import prodSearch from '~/components/product/prod-search.vue'
import impickingCond from '~/components/product/impicking-cond'
import prodList from '~/components/product/prod-list.vue'
export default {
components: {webLogin,prodSearch,impickingCond,prodList,webUnvip},
layout: 'web',
props:["id"],
data () {
    return {
		type_class:''
    }
  },
  created(){

  },
   watch :{
      '$route': function (to, from) {
		   this.type_class=this.$route.name
      }
    },
  mounted() {
     this.type_class=this.$route.name

//   console.log('id1'+this.id,'type_class'+this.type_class)
  }
  
}
</script>
<style lang="less" scoped>

</style>