<template>
<div>
    <personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <uploadFile></uploadFile>
    </div>
</div>
</template>
<script>

import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import uploadFile from '~/components/person/upload-file.vue'
export default {
layout: 'web',
components: {personBanner,personNav,uploadFile},
 head(){
	   return {
			title: '上传素材-图啦啦91tula.com'
			}
  },
}
</script>
