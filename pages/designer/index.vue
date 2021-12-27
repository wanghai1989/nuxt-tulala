<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <router-link class="sjs-logo" to="/">
				<img src="~/assets/images/logo02.png">
			</router-link>
      <designNav></designNav>
      <designerList></designerList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import designerList from '~/components/design/designer-list.vue'
export default {
   layout: 'web',
   components: {webBanner,designNav,designerList},
  head(){
	   return {
			title: '自由设计师，兼职设计师，全职设计师-图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content: '各行各业设计师在图啦啦91tula.com上传分享素材，下载素材提高工作效率，在线接单赚钱佣金，在线与优秀设计师交流分享提升专业水平！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '品牌设计师,电商设计师,UI设计师,网站设计师,插画师摄影师,室内设计师'
			}]
			}
  }
}
</script>