<template>
<div>
  <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
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
import taskInfo from '~/components/task/task-info.vue'
import taskRight from '~/components/task/task-right.vue'

export default {
   layout: 'web',
   components: {webBanner,taskInfo,taskRight},
   head(){
	   return {
			title: this.workinfo.name+'_图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '客户通过发布任务，快速寻找并匹配适合的设计师，图啦啦设计师只等你来！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '外包任务，图啦任务，项目外包，找设计师，发布需求，自由工作'
			}]
			}
   },
   validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
   async asyncData ({ store, params}) {  //服务器渲染
    await store.dispatch('fetchWorkinfo',{id:params.id});  
    },
     computed:{
	  ...mapState(['workinfo'])
  },
}
</script>