<template>
<div>
    <webLogin></webLogin>
    <webUnvip></webUnvip>
    <div class="wrapper1505">
      <prodSearch></prodSearch>
      <impickingCond></impickingCond>
      <prodList></prodList>
    </div>
</div>
</template>

<script>
import webLogin from '~/components/layout/web-login.vue'
import webUnvip from '~/components/layout/web-unvip.vue'
import prodSearch from '~/components/product/prod-search.vue'
import impickingCond from '~/components/product/impicking-cond.vue'
import prodList from '~/components/product/prod-list.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {webLogin,webUnvip,prodSearch,impickingCond,prodList},
   data () {
    return {
		category_id:''
    }
  },
   created(){
       this.category_id=this.$route.params.id
   }

}
</script>