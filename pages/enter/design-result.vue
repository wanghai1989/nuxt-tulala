<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <div class="theme-title enter">申请成为签约设计师</div>
      <div class="enter-box">
        <div class="step-tit">
	  			<ul class="clearfix">
	  				<li>填写<br>基础信息</li>
	  				<li>设计<br>作品上传</li>
	  				<li class="focus" >审核<br>结果</li>
	  			</ul>
	  		</div>
        <div class="step-line"></div>
        <designResult></designResult>
      </div>
    </div>
  </div>
</template>
<script>
import webBanner from '~/components/layout/web-banner.vue'
import designResult from '~/components/design/design-result.vue'
export default {
  layout: 'web',
  components: {webBanner,designResult},
  data () {
    return {
    }
  },
 mounted(){
  },
head(){
	   return {
			title: '招聘优秀设计师-图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content: '各行各业设计在图啦啦91tula.com上传分享素材，下载素材提高工作效率，在线接单赚钱佣金，在线与优秀设计师交流分享提升专业水平！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '网站设计,小程序设计,电商设计,包装设计,logo设计,插画,摄影,室内设计,工业设计,淘宝美工,图啦啦！'
			}]
			}
  }
}
</script>
<style lang="less" scoped>
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
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
.theme-title{font-size: 20px; color: #333; width: 126px; position: relative; height: 20px; line-height: 20px; margin: 0 auto; text-align: center;}
.theme-title:before{content: ""; display: inline-block;.bg-map(127px,15px, 0px, -99px); position: absolute;top: 5px; left: -127px;}
.theme-title:after{content: ""; display: inline-block;.bg-map(127px,15px,-0px, -72px); position: absolute;top: 5px; right: -127px;}
.theme-title.enter{width: 212px;margin-top: 40px; }

.enter-box{width: 100%; background: #fff;margin-top: 30px;
.step-tit{ padding: 25px;text-align: center;
     ul{width: 820px; height: 158px; background: url(~/assets/images/pic10.png) no-repeat center; font-size: 20px; padding-top: 47px; 
      margin: 0 auto; box-sizing: border-box;}
     ul li{float: left; width: 120px;  margin-left: 77px;}
     ul li.focus{color: var(--color);}
}
.step-line {
    width: 100%; height: 6px; background-image: linear-gradient(180deg, #f5f5f5 0%, #fff 100%);
}
}
</style>