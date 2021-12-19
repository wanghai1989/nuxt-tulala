<template>
<div>
<webUnvip></webUnvip>
    <personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <myFile></myFile>
    </div>
</div>
</template>
<script>
import webUnvip from '~/components/layout/web-unvip.vue'
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import myFile from '~/components/person/my-file.vue'
export default {
layout: 'web',
components: {personBanner,personNav,myFile,webUnvip},
metaInfo: {
    title: '上传-图啦啦91tula.com'
  }
  
}
</script>
<style lang="less" scoped>



</style>