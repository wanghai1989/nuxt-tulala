<template>
<div class="container"> 
    <webPendant></webPendant>
    <indexAnim></indexAnim>
    <webLogin></webLogin>
    <webUnvip></webUnvip>
    <indexAnchor></indexAnchor>
    <webHeader pageclass="index"></webHeader>
    <swiperIndex position='home'></swiperIndex>
    <prodSearch pageclass="index"></prodSearch>
    <div class="wrapper">
        <indexAdvantage></indexAdvantage>
        <indexTask></indexTask>
        <indexList></indexList>
    </div>
    <indexHandin></indexHandin>
    <webFooter></webFooter>
    
</div>
</template>

<script>
import webUnvip from '~/components/layout/web-unvip.vue'
import webHeader from '~/components/layout/web-header.vue'
import webFooter from '~/components/layout/web-footer.vue'
import webPendant from '~/components/layout/web-pendant.vue'
import swiperIndex from '~/components/index/swiper-index.vue'
import indexAdvantage from '~/components/index/index-advantage.vue'
import indexTask from '~/components/index/index-task.vue'
import indexList from '~/components/index/index-list.vue'
import indexHandin from '~/components/index/index-handin.vue'
import indexAnchor from '~/components/index/index-anchor.vue'
import indexAnim from '~/components/index/index-anim.vue'
import webLogin from '~/components/layout/web-login.vue'
import prodSearch from '~/components/product/prod-search.vue'
import {mapActions,mapMutations} from 'vuex'
export default {
   components: {webHeader,webFooter,webPendant,swiperIndex,indexAdvantage,indexTask,indexList,indexHandin,indexAnchor,indexAnim,webLogin,prodSearch,webUnvip},
   created(){
    // if(this.$route.query.code){
    //     let param={
    //         code:this.$route.query.code
    //     }
    //     console.log(param)
    //     this.wechatSubmit(param);
    // }
  },
  beforeMount(){
      if(this.$route.query.code){
        let param={
            code:this.$route.query.code
        }
        this.wechatSubmit(param);
    }
  },
  
  mounted(){
    
  },
   methods: {
        ...mapMutations(['setToken']),
       ...mapActions(['wechatlogin',,'fetchPersoninfo']),
       wechatSubmit(param){
        this.wechatlogin(param)
          .then((data) => {
            if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              this.setToken(data.data.token)
              let formDatas = new FormData();
              formDatas.append('token', data.data.token);
              this.fetchPersoninfo(formDatas)
              this.$router.push('/') 
            }
          })
    }
   }
   
}
</script>
