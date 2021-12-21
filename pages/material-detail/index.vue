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
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {webBanner,goodsList}

}
</script>