<template>
<div>
    <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
				<img src="~/assets/images/logo02.png">
			</div>
      <designNav></designNav>
      <div class="task-detail mt30 clearfix">
        <taskJoins :taskID="id"></taskJoins>
        <taskRight></taskRight>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskJoins from '~/components/task/task-joins.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,taskJoins,taskRight}

}
</script>