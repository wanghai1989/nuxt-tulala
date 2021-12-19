<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <myGoodorder></myGoodorder>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import myGoodorder from '~/components/person/my-goodorder.vue'
export default {
layout: 'web',
components: {personBanner,personNav,myGoodorder},
metaInfo: {
    title: '上传-图啦啦91tula.com'
  }
  
}
</script>
<style lang="less" scoped>



</style>