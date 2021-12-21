<template>
<div class="container">
<designHeader></designHeader>
<webPendant></webPendant>
  <nuxt />
  <webFooter></webFooter>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import designHeader from '~/components/layout/design-header.vue'
import webFooter from '~/components/layout/web-footer.vue'
import webPendant from '~/components/layout/web-pendant.vue'
export default {
components:{designHeader,webFooter,webPendant}
}
</script>
