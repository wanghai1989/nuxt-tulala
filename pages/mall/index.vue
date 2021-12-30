<template>
<div>
    <webBanner position='points_mall'></webBanner>
    <div class="wrapper">
      <goodsList></goodsList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import goodsList from '~/components/mall/goods-list.vue'
export default {
   layout: 'web',
   components: {webBanner,goodsList},
   head(){
	   return {
			title: '积分商城_会员专区_图啦啦91tula.com'
			}
}
}
</script>