<template>
<div>
    <webBanner position='submit_suggestions'></webBanner>
    <div class="wrapper">
      <adviceForm></adviceForm>
      <adviceList></adviceList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import adviceForm from '~/components/advice/advice-form.vue'
import adviceList from '~/components/advice/advice-list.vue'
export default {
   layout: 'web',
   head(){
	   return {
			title:'提交建议-图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '建议一经采纳有机会活动官方神秘大礼，欢迎大家踊跃提交建议'
			}]
			}
  },
   components: {adviceForm,adviceList,webBanner}

}
</script>