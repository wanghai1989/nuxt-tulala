<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <basicInfo></basicInfo>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import basicInfo from '~/components/person/basic-info.vue'
export default {
layout: 'web',
components: {personBanner,personNav,basicInfo},
 head(){
	   return {
			title: '会员基本信息-图啦啦91tula.com'
			}
  }
  
}
</script>
