<template>
<div class="m-container">
   <nuxt />
   <mFooter></mFooter>
</div>
</template>
<script>
import mFooter from '~/components/layout/m-footer.vue'
export default {
components: {mFooter},
metaInfo: {
   title: '素材中心-图啦啦'
  }
  
}
</script>

<style lang="less">
  @import "~/assets/font/iconfont.css";
</style>