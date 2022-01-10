<template>
<div>
   这是我的首页
</div>
</template>
<script>

export default {
   layout: 'mobile',
   data(){
     return{
        
     }
   },
mounted(){
   let shareData={
        title: '这是标题',   // 分享时的标题
        desc:'小标签',
        link: 'https://www.91tula.com/m/mobile-register',     // 分享时的链接
        imgUrl: 'https://www.91tula.com/_nuxt/img/logo02.8cf787f.png',    // 分享时的图标
      }
      let url='https://www.91tula.com'
      let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.wxShare(shareData,url)
        } 
       
  }
 }
</script>
<style lang="less" scoped>
</style>