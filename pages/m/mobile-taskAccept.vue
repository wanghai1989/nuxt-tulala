<template>
<div>
   <taskAccept></taskAccept>
</div>
</template>
<script>
import taskAccept from '~/components/mobile/task-accept'
export default {
   layout: 'mobile',
components: {taskAccept},
head(){
	   return {
			title:'我的接单-图啦啦91tula.com'
			}
  }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>