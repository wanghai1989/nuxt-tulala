<template>
<div class="container">
<webHeader></webHeader>
<webPendant></webPendant>
  <nuxt />
  <loginFooter></loginFooter>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import webPendant from '~/components/layout/web-pendant.vue'
import webHeader from '~/components/layout/web-header.vue'
import loginFooter from '~/components/layout/login-footer.vue'
export default {
components:{webHeader,loginFooter,webPendant}
}
</script>
  <style lang="less" scoped>

  </style>