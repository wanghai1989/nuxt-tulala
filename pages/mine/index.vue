<template>
<div>
    <personBanner></personBanner>
    <personNav></personNav>
    <div class="wrapper">
        <personInfo></personInfo>
    </div>
</div>
</template>
<script>

import personBanner from '~/components/layout/person-banner.vue'
import personNav from '~/components/layout/person-nav.vue'
import personInfo from '~/components/person/person-info.vue'
export default {
layout: 'web',
components: {personBanner,personNav,personInfo},
metaInfo: {
    title: '会员基本信息-图啦啦91tula.com'
  }
  
}
</script>
<style lang="less" scoped>
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
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


</style>