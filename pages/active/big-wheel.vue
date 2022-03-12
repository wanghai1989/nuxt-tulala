<template>
<div>
	<webLogin></webLogin>
    <bigWheel></bigWheel>
</div>
</template>
<script>
import bigWheel from '~/components/active/big-wheel'
import webLogin from '~/components/layout/web-login.vue'
export default {
    layout: 'web-active',
components: {bigWheel,webLogin},
head(){
	   return {
			title:'大转盘-图啦啦91tula.com',
			meta: [{
			hid: "description",
			name: "description",
			content:  '大转盘活动，抽奖，有机会赢取大额满减券，大额积分，积分可当钱花，兑换优质礼品！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '大转盘活动，抽奖活动，优惠大放送，礼品，图啦啦会员'
			}]
			}
  },

}
</script>