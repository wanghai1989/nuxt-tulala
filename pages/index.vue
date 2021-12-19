<template>
<div>
    <indexAnim></indexAnim>
    <webLogin></webLogin>
    <indexAnchor></indexAnchor>
    <webHeader data-class="index"></webHeader>
    <swiperIndex position='home'></swiperIndex>
    <prodSearch data-class="index"></prodSearch>
    <div class="wrapper">
        <indexAdvantage></indexAdvantage>
        <indexList></indexList>
    </div>
    <indexHandin></indexHandin>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css';
import swiperIndex from '~/components/index/swiper-index.vue'
import indexAdvantage from '~/components/index/index-advantage.vue'
import indexList from '~/components/index/index-list.vue'
import indexHandin from '~/components/index/index-handin.vue'
import indexAnchor from '~/components/index/index-anchor.vue'
import indexSearch from '~/components/index/index-search.vue'
import indexAnim from '~/components/index/index-anim.vue'
import webLogin from '~/components/layout/web-login.vue'
import prodSearch from '~/components/product/prod-search.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {swiperIndex,indexAdvantage,indexList,indexHandin,indexAnchor,indexSearch,indexAnim,webLogin,prodSearch},
   created(){
    //    console.log(localStorage.getItem("token"))
   },
   mounted(){
       
    //    alert(this.comsys.val(1));
   }

}
</script>
