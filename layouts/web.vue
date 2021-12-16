<template>
<div>
  
<webHeader></webHeader>
  <nuxt />
  <webFooter></webFooter>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import webHeader from '~/components/layout/web-header.vue'
import webFooter from '~/components/layout/web-footer.vue'

export default {
components:{webHeader,webFooter}
}
</script>
  <style lang="less" scoped>

  </style>