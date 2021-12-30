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
metaInfo: {
    title: '工单-我的接单'
  },

 methods: {
 }
}
</script>
<style lang="less" scoped>
.active-link{color: var(--color);}
</style>