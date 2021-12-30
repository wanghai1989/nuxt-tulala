<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <vipInfo></vipInfo>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import vipInfo from '~/components/person/vip-info.vue'
export default {
layout: 'web',
components: {personBanner,personNav,vipInfo},
 head(){
	   return {
			title: '会员信息、会员记录-图啦啦91tula.com'
			}
  },
}
</script>
