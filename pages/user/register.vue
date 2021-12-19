<template>
    <div class="banner login">
                <div class="wrapper clearfix">
                <div class="login-box2 fr">
                        <h3>会员注册</h3>
                        <Register></Register>
                </div>
                </div>
        </div>
</template>
<script>

import Register from '~/components/person/register.vue'
export default {
layout: 'web-login',
components: {Register}
  
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
.banner.login{width: 100%; max-width: 1920px; margin: 0 auto; height:694px; box-sizing: border-box; 
background: url(~/assets/images/banner-login.jpg) no-repeat center center; background-size: cover;
}

.login-box2{width: 500px; padding: 40px 90px 40px;margin: 50px 0px 0px 0px; box-sizing: border-box; background: rgba(255, 255, 255); border-radius: 5px; 
h3{font-size: 20px; color: #333;    font-weight: bold;}
}

</style>




