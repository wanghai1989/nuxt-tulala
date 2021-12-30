<template>
<div>
    <personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <personInfo></personInfo>
    </div>
</div>
</template>
<script>

import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import personInfo from '~/components/person/person-info.vue'
export default {
layout: 'web',
components: {personBanner,personNav,personInfo},
 head(){
	   return {
			title: '会员基本信息-图啦啦91tula.com'
			}
  },
}
</script>