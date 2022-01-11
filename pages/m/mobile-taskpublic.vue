<template>
<div >
   <taskPublic></taskPublic>
</div>
</template>
<script>
import taskPublic from '~/components/mobile/task-public.vue'
export default {
    layout: 'mobile',
components: {taskPublic},
head(){
	   return {
			title:'我的发布-图啦啦91tula.com'
			}
  }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>