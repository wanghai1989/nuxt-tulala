<template>
<div>
<personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <myWorks></myWorks>
    </div>
</div>
</template>
<script>
import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import myWorks from '~/components/person/my-works.vue'
export default {
layout: 'web',
components: {personBanner,personNav,myWorks},
 head(){
	   return {
			title: '我的工单列表-图啦啦91tula.com'
			}
  },
  
}
</script>
