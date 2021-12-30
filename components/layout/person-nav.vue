<template>
<div class="about-nav"> 
        <ul class="wrapper clearfix">
                <li><nuxt-link to="/mine/upload-file">上传作品</nuxt-link></li>
                <li><nuxt-link to="/mine/my-file">我的作品</nuxt-link></li>
                <li><nuxt-link to="/mine/my-collect">我的收藏</nuxt-link></li>
                <li><nuxt-link to="/mine/down-record">下载记录</nuxt-link></li>
                <li><nuxt-link to="/mine/my-works">我的工单</nuxt-link></li>
                <li><nuxt-link to="/mine/my-goodorder">商城订单</nuxt-link></li>
                <li><nuxt-link to="/mine">个人信息</nuxt-link></li>
                <li><nuxt-link to="/mine/vip-info">会员信息</nuxt-link></li>
                
        </ul>
</div>
</template>
<style lang="less" scoped>
.about-nav{height: 80px; background: #fff;  box-shadow: 0px 3px 8px 0px rgba(92, 92, 92, 0.2);
ul li{height: 80px; width: 112px; text-align: center; float: left; margin: 0px 10px;}
ul li a{display: block; height: 80px; line-height: 80px; border-bottom: 3px solid transparent; color: #333; box-sizing: border-box; font-size: 16px;}
ul li a.nuxt-link-exact-active,  ul li a:hover{color: var(--color);  border-bottom: 3px solid var(--color);}
}
</style>