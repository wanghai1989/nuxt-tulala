<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
        <router-link to="/index"><img src="~/assets/images/logo02.png"></router-link>
			</div>
      <designNav></designNav>
      <div class="desig-info clearfix">
          <designerInfo></designerInfo>
          <designerWorks></designerWorks>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import designerInfo from '~/components/design/designer-info.vue'
import designerWorks from '~/components/design/designer-works.vue'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,designerInfo,designerWorks},
//   created(){
//    console.log(this.$route.params.id)
//   },

}
</script>
<style lang="less" scoped>
.desig-info{margin-top: 25px;}
</style>