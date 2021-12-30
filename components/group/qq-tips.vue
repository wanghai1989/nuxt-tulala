<template>
<div class="qq-tips">
				<div class="title lmfl"><i></i> 联盟福利</div>
				<div class="mt10">定期赠送图啦终身VIP，1年VIP, 月VIP。福利人人有，群主，群员皆可获取图啦啦VIP会员</div>
				<div class="title sqtj  mt40"><i></i> 申请条件</div>
				<div class="mt10">1：群成员必须已达到500人以上，群活跃度大于等于LV4； <br />
									2：群类型必须为设计相关类型；<br />
									3：认同图啦啦网站的理念，维护图啦啦声誉和利益，前两个月QQ群协助图啦啦活动宣传（至少1次）；<br />
									4：QQ群自愿修改群名称，带有图啦啦字样。</div>
				<div class="title jmjl mt40"><i></i> 加盟奖励</div>
				<div class="mt10">1：500个人以上“群主获得3年素材VIP，赠送3个活跃用户1年素材VIP” <br />
								2：1000个人以上“群主获得5年素材VIP，赠送5个活跃用户1年素材VIP”
				</div>
			</div>
</template>

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
.qq-tips{border: solid 1px #eeeeee; background-color: #fafafa; padding: 30px 30px; margin-top: 15px;
 .title{font-size: 16px; color:var(--backColor);}
 .lmfl i{.bg-map(20px,20px,-933px, -40px); margin-right: 5px;}
 .sqtj i{.bg-map(20px,20px,-935px, -69px); margin-right: 5px;}
 .jmjl i{.bg-map(20px,20px,-968px, -41px); margin-right: 5px;}
 .jrlm i{.bg-map(20px,20px,-973px, -73px); margin-right: 5px;}
  
}
</style>