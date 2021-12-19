<template>
<div>
  <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
				<img src="~/assets/images/logo02.png">
			</div>
      <designNav></designNav>
      <div class="task-detail mt30 clearfix">
        <taskInfo></taskInfo>
        <taskRight></taskRight>
      </div>
    </div>
    
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskInfo from '~/components/task/task-info.vue'
import taskRight from '~/components/task/task-right.vue'

import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,taskInfo,taskRight}

}
</script>