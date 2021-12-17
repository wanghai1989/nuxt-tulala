<template>
<div>
  
</div>
</template>
<script>

export default {
  created(){
    this.$router.push('/about/about-us') // 页面加载时跳转 
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
    line-height: @height;
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

.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;

.about-tit{display: flex; border-bottom: 1px solid #d4d4d4; padding-bottom: 15px;
ul{flex: 1;}
li{float: left;width: 120px; height: 40px; line-height: 40px; text-align: left; }
li a{display: block;color:var(--backColor); font-size: 16px; }
li.focus a,li:hover a{color:var(--color);}
.btn-openvip{.btn(138px,40px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff); font-size: 16px;}
}
.tab-vip{line-height: 50px; text-align: center; margin-top: 20px;}
>.title{font-size: 24px; color: var(--backColor); text-align: center;}
p{margin-bottom: 20px; text-align: justify;}
.cert-item{display: flex; height: 45px; margin-bottom: 60px;
.i-basic{.bg-map(45px,45px, -1030px, -72px);}
.i-phone{.bg-map(45px,45px,-1089px, -73px);}
.i-realname{.bg-map(45px,45px, -1142px, -73px);}
.cert-txt{width: 400px; margin-left: 20px;}
.btn-cert{.btn(138px,45px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff); font-size: 16px;}
.state{font-size: 16px; margin-left: 75px;    line-height: 45px;}
.state em{font-style: normal;}
.i-certed{.bg-map(20px,20px,-1135px, -44px);}
}
}
</style>