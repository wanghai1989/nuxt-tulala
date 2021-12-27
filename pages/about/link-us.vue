<template>
<div>
    <webBanner position='contact_us'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
       <div class="about-contain">
     <p>联系我们
	</p>
    </div>
    </div>
    
</div>
</template>
<script>

import webBanner from '~/components/layout/web-banner'
import aboutNav from '~/components/layout/about-nav'
export default {
  layout: 'web',
  props:['position'],
  head(){
	   return {
			title:'联系我们_图啦啦91tula.com'
			}
  },
components: {webBanner,aboutNav}

}
</script>
<style lang="less" scoped>
.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
}
</style>