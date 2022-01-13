<template>
<div class="m-container">
   <activeInvite></activeInvite>
</div>
</template>
<script>
import activeInvite from '~/components/mobile/active-invite.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
components: {activeInvite},
head(){
	   return {
			title:'邀请好友-图啦啦91tula.com'
			}
  },
 mounted(){
   let shareData={
        title: '素材下载、素材分享、在线接单就上图啦啦',   // 分享时的标题
        desc:'图啦啦91tu.com，一个全方位为设计师打造的互联网平台！',
        link: 'https://www.91tula.com/m/mobile-register?invite_code=' +this.personInfo.invite_code,     // 分享时的链接
        imgUrl: 'https://www.91tula.com/img/pic55.jpg',   // 分享时的图标 
      }
      let url='https://www.91tula.com/m/mobile-invite'
      let ua = navigator.userAgent.toLowerCase();  
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.wxShare(shareData,url)
        } 
       
  },
   computed:{
      ...mapState(['personInfo'])
  },
  
}
</script>

