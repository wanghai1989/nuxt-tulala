<template>
 <div class="laymshade hand" v-if="showTaskRule">
			<div class="center-dialog">
				<div class="center-ctn-box">
					<div class="table-cell-box">
						<div class="Bigimg-box">
							<h2 class="steptheme">工单操作流程</h2>
							<em class="Bigimg-close-Btn" @click="closeBigImg()">×</em>
							<div class="step-cont">
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 1</em> 任务——>免费发布任务 <span class="cgray f14">（雇主）</span></h3>
							<img src="~/assets/images/work01.jpg" />
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 2</em> 任务——>任务名称——>参与竞价<span class="cgray f14">（设计师）</span></h3>
							<img src="~/assets/images/work02.jpg" />
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 3</em> 我的——>我的工单——>我的发布——>安全雇佣<span class="cgray f14">（雇主）</span></h3>
							<img src="~/assets/images/work03.jpg" />
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 4</em> 我的——>我的工单——>我的发布——>接受雇佣<span class="cgray f14">（设计师）</span></h3>
							<img src="~/assets/images/work04.jpg" />
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 5</em> 我的——>我的工单——>我的发布——>支付定金<span class="cgray f14">（雇主）</span></h3>
							<img src="~/assets/images/work05.jpg" />
							<h3 class="step-tit"><span class="icon_step"></span><em>STEP 6</em> 我的——>我的工单——>我的发布——>支付尾款<span class="cgray f14">（雇主）</span></h3>
							<img src="~/assets/images/work06.jpg" />
							<h3 class="step-tit"><em>STEP 7</em> 后台结算，项目完成</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
 computed:{
	  ...mapState(['showTaskRule'])
  },
   methods:{
	   ...mapMutations(['setTaskRule']),
	  closeBigImg:function(){
		  this.setTaskRule(0)
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
.step-cont{width: 84%; margin: 0 auto;border-left: 1px dashed #64a0de;}
.step-cont img{max-width: 90% !important; margin: 0 auto;}
h2.steptheme{font-size: 20px; font-weight: bold; color: var(--backColor); margin: 20px 0px 40px; }
.step-tit{font-size: 15px; margin: 30px 0px 10px; color:var(--backColor); text-align: left; padding-left: 37px;position: relative;}
.icon_step{.bg-map(30px,37px,-116px, -243px);    position: absolute;
    left: -16px;
    top: 0px;}
.step-tit em{font-weight: bold; margin-right: 8px; }
</style>

