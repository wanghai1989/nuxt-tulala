<template>
<div>
    <webBanner position='corporate_team'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
       <div class="about-contain">
			<div class="clearfix">
			<div class="team-item">
				<div class="pic">
					<img src="../../assets/images/pic20.png" />
				</div>
				<div class="info">
				<div class="name">
					<div class="f30 cblack">王海</div>
					<div class="cgray f16">创始人 & CEO</div>
				</div>
				<div class="mt15">
					中山大学岭南学院EMBA，15年 连续创业、投资经验，擅长战略 格局构建及风险管理，对现代化 企业管理有独到见解和丰富的 管理经验。
				</div>
				</div>
			</div>
			
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
  props:['position'],
  head(){
	   return {
			title:'企业团队_图啦啦91tula.com'
			}
  },
components: {webBanner,aboutNav},
}

  

</script>
<style lang="less" scoped>
.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
}
.team-item{width: 50%; float: left; display: flex;margin-bottom: 25px;
.pic{width: 213px; margin-right: 30px;}
.pic img{width: 100%;}
.info{width: 197px; }
.name{padding-bottom: 15px; border-bottom: 1px solid #d4d4d4;}
}
</style>










