<template>
<div>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <div class="sjs-logo">
        <router-link to="/"><img src="~/assets/images/logo02.png"></router-link>
			</div>
      <designNav></designNav>
      <div class="desig-info clearfix">
          <designerInfo></designerInfo>
          <designerWorks></designerWorks>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designNav from '~/components/layout/design-nav.vue'
import designerInfo from '~/components/design/designer-info.vue'
import designerWorks from '~/components/design/designer-works.vue'
import {mapState} from 'vuex'
export default {
   layout: 'web-design',
   components: {webBanner,designNav,designerInfo,designerWorks},
   head(){
	   return {
			title: this.designinfo.real_name+'_图啦设计师',
			meta: [{
			hid: "description",
			name: "description",
			content:  '会员关注图啦啦消息，图啦咨询尽在掌握！！'
			},{
			hid: 'keywords',
			name: 'keywords',
			content: '图啦啦，图啦消息，图啦公告，图啦素材，图啦啦工单'
			}]
			}
  },
  computed:{
	  ...mapState(['designinfo'])
  },
    async asyncData ({ store, params}) {  //服务器渲染
    await  store.dispatch('fetchDesignInfo',{id:params.id});
    },
//   created(){
//    console.log(this.$route.params.id)
//   },

}
</script>
<style lang="less" scoped>
.desig-info{margin-top: 25px;}
</style>