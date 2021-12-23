<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <router-link class="sjs-logo" to="/">
				<img src="~/assets/images/logo02.png">
			</router-link>
      <designNav></designNav>
      <designerList></designerList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import designerList from '~/components/design/designer-list.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {webBanner,designNav,designerList}

}
</script>