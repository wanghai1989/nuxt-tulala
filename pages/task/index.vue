<template>
<div>
    <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
			 <router-link to="/index"><img src="~/assets/images/logo02.png"></router-link>	
			</div>
      <designNav></designNav>
      <taskList></taskList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskList from '~/components/task/task-list.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,taskList}

}
</script>