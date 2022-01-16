<template>
<div>
    <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <taskList></taskList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import taskList from '~/components/task/task-list.vue'
export default {
   layout: 'web',
   components: {webBanner,taskList},
   head(){
	   return {
			title: '任务中心_91tula.com',
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

}
</script>