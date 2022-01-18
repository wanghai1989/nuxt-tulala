<template>
<div>
    <webBanner position='company_recruitment'></webBanner>
    <aboutNav></aboutNav>
    <div class="wrapper">
       <div class="about-contain">
			<div class="job-item">
				<div class="job-pic">
					<img src="~/assets/images/pic17.png">
				</div>
				<div class="job-info">
					<div class="title">
						设计师
					</div>
					<div class="f16"> Designer </div>
					<div class="mt10"><img src="~/assets/images/pic19.png"> </div>
						<div class="cblack fw mt20">职位要求</div>
						<div class="mt10">
						1、熟练使用PS、AI、Sketch、CDR等设计软件；<br>
						2、较好的审美和设计能力;<br>
						3. 有两年以上设计工作经验；<br>
						4、积极主动，有较强的责任心和团队合作意识；<br>
						5、本科及以上学历，设计相关专业优先；
					</div>
				</div>
			</div>
			<div class="job-item mt50">
				<div class="job-pic">
					<img src="~/assets/images/pic18.png">
				</div>
				<div class="job-info">
					<div class="title">
						运营
					</div>
					<div class="f16"> Graphic  Design </div>
					<div class="mt10"><img src="~/assets/images/pic19.png"> </div>
						<div class="cblack fw mt20">职位要求</div>
						<div class="mt10">
							1、负责网站推广管理，包含谷歌广告投放，关键词优化，sns 运营等；完成销售目标；<br>
						2、文案功底强，数据处理和分析能力突出，会使用数据处理工具的优先；<br>
						3、思维开阔，创新能力强；<br>
						4、两年以上工作经验。</div>
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
			title:'招聘设计师_轻松兼职在家也能拿高薪__图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '图啦啦招聘优秀设计师！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '品牌设计师,电商设计师,UI设计师,网站设计师,插画师摄影师,室内设计师'
			}]
			}
  },
components: {webBanner,aboutNav},
  data () {
    return {
      pageName: '',
      pageKeyword:'',
      pageDesc:'',
    }
  },
 
mounted(){
}
}

  

</script>
<style lang="less" scoped>
.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
}
</style>


