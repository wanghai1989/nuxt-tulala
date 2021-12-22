<template>
<div class="container"> 
    <webPendant></webPendant>
    <indexAnim></indexAnim>
    <webLogin></webLogin>
    <indexAnchor></indexAnchor>
    <webHeader pageclass="index"></webHeader>
    <swiperIndex position='home'></swiperIndex>
    <prodSearch pageclass="index"></prodSearch>
    <div class="wrapper">
        <indexAdvantage></indexAdvantage>
        <indexList></indexList>
    </div>
    <indexHandin></indexHandin>
    <webFooter></webFooter>
    
</div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css';
import webHeader from '~/components/layout/web-header.vue'
import webFooter from '~/components/layout/web-footer.vue'
import webPendant from '~/components/layout/web-pendant.vue'
import swiperIndex from '~/components/index/swiper-index.vue'
import indexAdvantage from '~/components/index/index-advantage.vue'
import indexList from '~/components/index/index-list.vue'
import indexHandin from '~/components/index/index-handin.vue'
import indexAnchor from '~/components/index/index-anchor.vue'
import indexSearch from '~/components/index/index-search.vue'
import indexAnim from '~/components/index/index-anim.vue'
import webLogin from '~/components/layout/web-login.vue'
import prodSearch from '~/components/product/prod-search.vue'
export default {
   components: {webHeader,webFooter,webPendant,swiperIndex,indexAdvantage,indexList,indexHandin,indexAnchor,indexSearch,indexAnim,webLogin,prodSearch}, 

}
</script>
