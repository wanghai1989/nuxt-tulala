<template>
<div>
    <inviteFriend></inviteFriend>
</div>
</template>
<script>
import inviteFriend from '~/components/active/invite-friend'
export default {
    layout: 'web-active',
components: {inviteFriend},
metaInfo: {
    title: '邀请好友-图啦啦91tula.com',
    meta: [
              {
                  name: "keywords",
                  content:'邀请好友，赚取佣金，图啦啦欢迎越来越多的优秀设计师加入，共建一个设计师大家庭'
              }, {
                  name: "description",
                  content:'各行业优秀的兼职、自由设计师帮您解决品牌设计、电商设计、APP设计、网站设计、插画、摄影、装修效果图、工业产品设计等需求！'
              }
          ]
  },
  mounted() {  
  }
  
}
</script>
<style lang="less" scoped>


</style>