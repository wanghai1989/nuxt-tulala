<template>
<div>
    <webBanner position='work_order'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
			 <router-link to="/index"><img src="~/assets/images/logo02.png"></router-link>	
			</div>
      <designNav></designNav>
      <div class="task-detail mt30 clearfix">
        <taskPublic></taskPublic>
        <taskRight></taskRight>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskPublic from '~/components/task/task-public.vue'
import taskRight from '~/components/task/task-right.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,taskPublic,taskRight}

}
</script>