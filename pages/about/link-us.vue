<template>
<div>
    <webBanner position='contact_us'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
       <div class="about-contain">
     <h3 class="title">联系我们</h3>
      <p>地址：深圳市福田区天安数码城创新科技广场一期B座808B</p>
      <p>邮箱：邮箱:tulalawx@163.com</p>
      <p>客服微信: <img src="~/assets/images/pic01.png" class="publicNo"/></p>
     
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
.publicNo{width: 120px; border: 1px solid #eee; vertical-align: middle;}
</style>