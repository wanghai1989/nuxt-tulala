<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <mobileBind></mobileBind>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import mobileBind from '~/components/person/mobile-bind.vue'
export default {
layout: 'web',
components: {personBanner,personNav,mobileBind},
metaInfo: {
    title: '上传-图啦啦91tula.com'
  }
  
}
</script>
<style lang="less" scoped>



</style>