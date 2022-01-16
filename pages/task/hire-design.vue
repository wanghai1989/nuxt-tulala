<template>
<div>
    <webBanner  position='outsourcing_tasks'></webBanner>
    <div class="wrapper">
      <div class="task-detail mt30 clearfix">
        <taskJoins :taskID="id"></taskJoins>
        <taskRight></taskRight>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import taskJoins from '~/components/task/task-joins.vue'
export default {
   layout: 'web',
   components: {webBanner,taskJoins,taskRight},
   head(){
	   return {
			title: '雇佣设计师_91tula.com',
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