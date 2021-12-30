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
metaInfo: {
    title: '工单-我的发布'
  },

 methods: {
 }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>