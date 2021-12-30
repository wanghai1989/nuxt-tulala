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
metaInfo: {
    title: '工单'
  },

 methods: {
 }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>