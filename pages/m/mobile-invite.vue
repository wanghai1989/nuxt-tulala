<template>
<div class="m-container">
   <activeInvite></activeInvite>
</div>
</template>
<script>
import activeInvite from '~/components/mobile/active-invite.vue'
export default {
components: {activeInvite},
 mounted(){
   let shareData={
        title: '这是标题',   // 分享时的标题
        desc:'小标签',
        link: 'http://www.91tula.com/m/mobile-register',     // 分享时的链接
        imgUrl: 'http://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
      }
      let url='http://www.91tula.com:3333'
      let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.wxShare(shareData,url)
        } 
       
  }
  
}
</script>
<style lang="less" scoped>

</style>
