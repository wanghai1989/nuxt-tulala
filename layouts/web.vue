<template>
<div class="container">
<webHeader></webHeader>
<div id="loading" v-show="loading">
      <loading></loading>
    </div>
<webPendant></webPendant>
  <nuxt />
  <webFooter></webFooter>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import webHeader from '~/components/layout/web-header.vue'
import webFooter from '~/components/layout/web-footer.vue'
import webPendant from '~/components/layout/web-pendant.vue'
import Loading from '~/components/layout/loading.vue'
import {mapState} from 'vuex'
export default {
components:{webHeader,webFooter,webPendant,Loading},
 computed:{
	  ...mapState(['loading'])
  },
}
</script>
<style lang="less" scoped>
#loading{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>