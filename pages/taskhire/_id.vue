<template>
<div>
    <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
				<img src="~/assets/images/logo02.png">
			</div>
      <designNav></designNav>
      <div class="task-detail mt30 clearfix">
        <taskJoins></taskJoins>
        <taskRight></taskRight>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import taskJoins from '~/components/task/task-joins.vue'
import taskRight from '~/components/task/task-right.vue'

import {mapState} from 'vuex'
export default {
   layout: 'web-design',
    head(){
	   return {
			title: this.workinfo.name+'_图啦啦91tula.com'
			}
  },
   components: {webBanner,designNav,taskJoins,taskRight},
  async asyncData ({ store, params}) {  //服务器渲染
    await store.dispatch('fetchWorkinfo',{id:params.id});  
    },
    validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
     computed:{
	  ...mapState(['workinfo'])
  },
}
</script>