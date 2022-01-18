<template>
<div>
   <Publictask></Publictask>
</div>
</template>
<script>
import Publictask from '~/components/mobile/public-task.vue'
export default {
   layout: 'mobile',
components: {Publictask},
head(){
	   return {
			title:'发布工单-图啦啦91tula.com'
			}
  }
}
</script>
<style lang="less" scoped>

</style>