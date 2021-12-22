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
						平面设计
					</div>
					<div class="f16"> Graphic  Design </div>
					<div class="mt10"><img src="~/assets/images/pic19.png"> </div>
						<div class="cblack fw mt20">职位要求</div>
						<div class="mt10">1、从事.net编程工作3年以上，有大型网站开发经
						验、大数据操作经验者优先；<br>
						2、优秀的数据库设计和优化能力，精通Mysql数据
						库应用；<br>
						3. 有优秀的逻辑分析能力，能够对业务逻辑进行
						合理的抽象和拆分；<br>
						4、积极主动，有较强的责任心和团队合作意识；</div>
				</div>
			</div>
			<div class="job-item mt50">
				<div class="job-pic">
					<img src="~/assets/images/pic18.png">
				</div>
				<div class="job-info">
					<div class="title">
						PHP 工程师
					</div>
					<div class="f16"> Graphic  Design </div>
					<div class="mt10"><img src="~/assets/images/pic19.png"> </div>
						<div class="cblack fw mt20">职位要求</div>
						<div class="mt10">1、从事.net编程工作3年以上，有大型网站开发经
						验、大数据操作经验者优先；<br>
						2、优秀的数据库设计和优化能力，精通Mysql数据
						库应用；<br>
						3. 有优秀的逻辑分析能力，能够对业务逻辑进行
						合理的抽象和拆分；<br>
						4、积极主动，有较强的责任心和团队合作意识；</div>
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


