<template>
<div>
  
</div>
</template>
<script>

export default {
  created(){
    this.$router.push('/about/about-us') // 页面加载时跳转 
 },
<<<<<<< HEAD
 mounted(){
         console.log(22)
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
=======

>>>>>>> 6f174cd68cb76d5c3220dfaf2da753d7e679f0c0
}


</script>
