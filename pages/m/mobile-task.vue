<template>
<div>
   <Task></Task>
</div>
</template>
<script>
import Task from '~/components/mobile/task.vue'
export default {
   layout: 'mobile',
components: {Task},
head(){
	   return {
			title:'工单-图啦啦91tula.com'
			}
  }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>