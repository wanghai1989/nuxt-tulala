<template>
  <div>
    <webBanner position='about_me'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
      <div class="about-contain">
     
      <div class="clearfix">
			<div class="team-item">
				<div class="pic">
					<img src="../../assets/images/pic20.png" />
				</div>
				<div class="info">
					<div class="name">王海</div>
					<div class="post">创始人 & CEO</div>
					<div class="txt">图啦啦致力于打造一个设计师综合服务平台</div>
				</div>
			</div>
			<div class="introduce">
			<p class="title">
				设计师关心什么？
			</p>
			<p>设计师是一个自由度非常高的职业，设计师对职业的选择也越来越倾向于自由化，兼职化。如何使设计师的价值最大化以及让设计师享受最理想的工作状态是图啦啦(91tula.com)不断思考的问题。
				每个设计师都希望自己的作品得到肯定，希望自己的工作可以保持足够的自由度，以便有足够的闲暇时间来提升自己的设计能力，设计让自己满意，让客户满意的作品。

			</p>
			<p class="title">
				设计师如何获取雇主的青睐？
			</p>
			<p>针对设计师这一诉求，图啦啦(91tula.com)专门提供了在线分享素材，在线接单的功能。设计师可以把自己满意的作品上传到图啦啦平台以此来展现自己的设计实力并获取一定的分享报酬。图啦啦会根据设计师
				上传到平台作品的数量跟质量以及设计师为雇主提供服务的客户满意度，来审核设计师的等级。设计师等级越高，能享受到越多平台的服务，比如设计师排名，平台派单等。
				 图啦啦(91tula.com)一贯秉承设计师晋升一切看作品，看实力说话的原则进行审核。避免了传统网站依靠设计师平台广告费投入，竞价排名等方式提升等级的弊端。
				 让有实力的设计师更有机会崭露头角，从而脱颖而出。相信只要凭着<span class="fw"> 诚信、积极、责任心</span>的工作态度，一定会赢得更多雇主的信赖，用设计创造更多的价值。


			</p>
			<p class="title">
				雇主如何找到心仪的设计师？
			</p>
			<p>
				最合适的才是最好的，只有最好的达到能岗匹配，在满足企业要求的同时，也能为企业节省更多的人力成本。如何筛选一名合格的设计师为自己企业所用，这也成为了企业人事最头疼的事情。图啦啦(91tula.com)
				为了解决企业这一痛点，专门制定了一套完备的设计师晋级体系。雇主除了可以直接查看图啦啦(91tula.com)对设计师的审核，还能直接查看设计师分享到平台的设计作品看看是否符合企业的用人标准并最终决定是否雇佣。
				这就在最大程度解决了企业招人难，看人更难的问题。最好的达到人岗匹配的目的。
				
			</p>
			</div>
			
			</div>
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
      <div class="role">
				<nuxt-link to="/enter" >我是设计师</nuxt-link>
				<nuxt-link to="/task/public" class="employer">我是雇主</nuxt-link>
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
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
    height: @height;
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
.team-item{ display: flex;margin-bottom: 25px;
.pic{width: 120px; height: 120px; border-radius: 60px; overflow: hidden; margin-right: 30px;}
.pic img{width: 100%;}
.info{margin-top: 10px; }
.name{font-size: 24px; color: var(--backColor); }
.post{font-size: 16px; color: var(--grayColor);  position: relative;}
.post::after{position: absolute; content: ''; display: block;     bottom: -4px; width: 60px; height: 2px; background: var(--color);}
.txt{margin-top: 15px; color: var(--backColor); font-size: 16px;}
}
.introduce{ margin-bottom: 20px;
  p{font-size: 16px; margin-bottom: 35px; line-height: 36px;}
  p.title{color: var(--color); font-weight: bold; margin-bottom: 10px;}
}
.role a{.btn(180px,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); margin-right:30px; border-radius: 21px;}
.role a:hover{opacity: 0.9;}
.role .employer{background: var(--redColor); border: 1px solid var(--redColor);}
</style>