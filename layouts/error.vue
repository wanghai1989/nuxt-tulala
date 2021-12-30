<template>
<div class="container">
<webHeader></webHeader>
<webPendant></webPendant>
  <div class="error_info">
              <img src="~/assets/images/pic47.png" />
        </div>
  <loginFooter></loginFooter>
</div>
</template>
<script>
// mapActions 页面进来时发送请求
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import webHeader from '~/components/layout/web-header.vue'
import loginFooter from '~/components/layout/login-footer.vue'
import webPendant from '~/components/layout/web-pendant.vue'
export default {
components:{webHeader,loginFooter,webPendant}
}
</script>
  <style lang="less" scoped>
.error_info{background: #fff1d3; width: 100%; height: 700px; display: flex; justify-items: center;    justify-content: center;}
  </style>

