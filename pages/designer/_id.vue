<template>
<div>
   <nuxt-link to="/enter"  class="btn-apply">
		●<br/>立<br/>即<br/>入<br/> 驻<br/>●
		</nuxt-link>
    <webBanner position='designer'></webBanner>
    <div class="wrapper">
      <div class="desig-info clearfix">
          <designerInfo></designerInfo>
          <designerWorks></designerWorks>
      </div>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import designerInfo from '~/components/design/designer-info.vue'
import designerWorks from '~/components/design/designer-works.vue'
import {mapState} from 'vuex'
export default {
   layout: 'web',
   components: {webBanner,designerInfo,designerWorks},
   head(){
	   return {
			title: this.designinfo.identity_card_name+'_图啦设计师',
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
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
   line-height: calc(@height - 2px); 
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    width: @width;
    border: 1px solid @bordercolor;
    background: @background;
    color: @color;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
}
.desig-info{margin-top: 25px;}
.btn-apply{.btn(48px,22px,#b23016,linear-gradient(90deg, 
        #c53a1d 0%, 
        #b23016 100%),#fff); position: fixed; top: 450px; left: 50%; margin-left: 600px; padding: 5px 0px; line-height: 22px; z-index: 10; }
.btn-apply:hover{opacity: 0.9;}
</style>