<template>
  <div>
    <webBanner position='about_me'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
      <div class="about-contain">
        <div class="about-item">
      <h3 class="title">公司简介</h3>
      <p>图啦啦(www.91tula.com)网站隶属于深圳市辰马互联网技术服务有限公司，是一个提供图片设计素材下载、创意设计分享、设计师在线接单，在线发布设计需求等综合型设计服务平台。
      </p>
      <p>网站以用户为中心，风格简洁大气，无广告，以绿色为网页基础色，提高用户的视觉感，减少用眼疲劳;根据人们日常浏览网页习惯，设计简单易懂的操作流程，在用户体验方面赢得了
      高度评价。
      </p>
      <p>图啦啦自创办以来，一直致力于为设计师提供高品质、多品类、快更新的创意作品和服务，内容涵盖了PNG元素，背景图库，模版素材，摄影图等主流素材版块，服务于电商淘宝、装
      饰装修、网页UI、文案、产品工业等领域。</p>
      </div>
      <div class="about-item">
      <h3 class="title">服务宗旨</h3>
      <p style="line-height:30px">1、实现设计师<span class="fw cblack"> 价值最大化；</span><br/>2、为客户提供<span class="fw cblack"> 最优秀的设计服务；</span></p>
      </div>
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
h3.title{font-size: 18px;height: 18px; line-height: 18px; border-left: 4px solid var(--redColor); font-weight: bold; color: var(--backColor); margin-bottom: 15px;
text-indent: 10px;}
.about-contain {
    padding: 40px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 20px;
    min-height: 400px;
}
.about-contain p{margin-bottom: 20px;}
.about-item{margin-bottom: 50px;}
</style>