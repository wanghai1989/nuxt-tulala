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
  head(){
	   return {
			title: '绑定手机号-图啦啦91tula.com'
			}
  }, 
}
</script>
