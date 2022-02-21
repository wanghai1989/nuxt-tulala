<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
		<nuxt-link to="/enter"  class="btn-apply">
		入<br data-v-505ae51c=""> 驻<br data-v-505ae51c="">图<br data-v-505ae51c="">啦<br data-v-505ae51c="">啦
		</nuxt-link>
      <designerList></designerList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designerList from '~/components/design/designer-list.vue'
export default {
   layout: 'web',
   components: {webBanner,designerList},
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
<style lang="less" scoped>
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
   line-height: calc(@height - 2px); 
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    width: @width;
    border: 1px solid @bordercolor;
    background: @background;
    color: @color;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
}
.btn-apply{.btn(48px,22px,#b23016,linear-gradient(90deg, 
        #c53a1d 0%, 
        #b23016 100%),#fff); position: fixed; top: 450px; left: 50%; margin-left: 600px; padding: 12px 0px; line-height: 22px; }
.btn-apply:hover{opacity: 0.9;}
</style>