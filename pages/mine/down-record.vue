<template>
<div>
    <webUnvip></webUnvip>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <downRecord></downRecord>
    </div>
</div>
</template>
<script>
import webUnvip from '~/components/layout/web-unvip.vue'
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import downRecord from '~/components/person/down-record.vue'
export default {
layout: 'web',
components: {personBanner,personNav,downRecord,webUnvip},
 head(){
	   return {
			title: '下载记录-图啦啦91tula.com'
			}
  },
}
</script>
