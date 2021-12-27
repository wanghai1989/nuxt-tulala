<template>
  <div>
    <webBanner position='about_me'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
      <div class="about-contain">
      <p>图啦啦(www.itulala.com)网站隶属于深圳市图啦网络科技有限公司，是一个提供图片设计素材下载及创意设计分享的网络平台。
      </p>
      <p>网站以用户为中心，风格简洁大气，无广告，以绿色为网页基础色，提高用户的视觉感，减少用眼疲劳;根据人们日常浏览网页习惯，设计简单易懂的操作流程，在用户体验方面赢得了
      高度评价。
      </p>
      <p>图啦啦自创办以来，一直致力于为设计师提供高品质、多品类、快更新的创意作品和服务，内容涵盖了PNG元素，背景图库，模版素材，摄影图等主流素材版块，服务于电商淘宝、装
      饰装修、网页UI、文案、产品工业等领域。</p>
    </div>
    </div>
</div>

       
</template>
<script>
import webBanner from '~/components/layout/web-banner'
import aboutNav from '~/components/layout/about-nav'
export default {
layout: 'web',
components: {webBanner,aboutNav},
head(){
	   return {
			title:'关于我们_图啦啦91tula.com'
			}
  },
}

  

</script>
<style lang="less" scoped>
.about-contain {
    padding: 40px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 20px;
    min-height: 400px;
}
</style>