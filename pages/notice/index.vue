<template>
<div>
   <Noitce></Noitce>
</div>
</template>

<script>
import Noitce from '~/components/active/noitce.vue'
export default {
   layout: 'web',
   components: {Noitce},
   head(){
	   return {
			title: '消息中心_91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '会员关注图啦啦消息，图啦咨询尽在掌握！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '图啦啦，图啦消息，图啦公告，图啦素材，图啦啦工单'
			}]
			}
  },

}
</script>