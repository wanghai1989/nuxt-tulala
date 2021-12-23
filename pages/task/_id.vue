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
import {mapState} from 'vuex'
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskInfo from '~/components/task/task-info.vue'
import taskRight from '~/components/task/task-right.vue'

export default {
   layout: 'web-design',
   components: {webBanner,designNav,taskInfo,taskRight},
   head(){
	   return {
			title: this.workinfo.name+'_图啦啦91tula.com'
			}
  },
   async asyncData ({ store, params}) {  //服务器渲染
    await store.dispatch('fetchWorkinfo',{id:params.id});  
    },
     computed:{
	  ...mapState(['workinfo'])
  },
}
</script>