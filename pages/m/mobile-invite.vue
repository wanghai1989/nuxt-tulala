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
        link: 'https://www.91tula.com/m/mobile-register',     // 分享时的链接
        imgUrl: '~/assets/images/pic55.jpg',    // 分享时的图标
      }
      let url='https://www.91tula.com/m/mobile-invite'
      let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.wxShare(shareData,url)
        } 
       
  }
  
}
</script>
<style lang="less" scoped>

</style>
