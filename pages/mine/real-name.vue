<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <realName></realName>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import realName from '~/components/person/real-name.vue'
export default {
layout: 'web',
components: {personBanner,personNav,realName},
 head(){
	   return {
			title: '实名认证-图啦啦91tula.com'
			}
  },
}
</script>
