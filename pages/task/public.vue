<template>
<div>
	<webLogin></webLogin>
    <webBanner position='work_order'></webBanner>
    <div class="wrapper">
      <div class="task-detail mt30 clearfix">
        <taskPublic></taskPublic>
        <taskRight></taskRight>
      </div>
    </div>
</div>
</template>

<script>
import webLogin from '~/components/layout/web-login.vue'
import webBanner from '~/components/layout/web-banner.vue'
import taskPublic from '~/components/task/task-public.vue'
import taskRight from '~/components/task/task-right.vue'
export default {
   layout: 'web',
   components: {webBanner,taskPublic,taskRight,webLogin},
   head(){
	   return {
			title: '发布任务_91tula.com',
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