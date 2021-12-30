<template>
    <div class="advantage clearfix">
        <div class="part1">
            <h3>天天上新 </h3>
            <p>元素+背景+UI+电商+平面素材</p>
        </div>
        <div class="part2">
            <h3>无限下载 </h3>
            <p>无限下载提高工作效率</p>
        </div>
        <div class="part3">
            <h3>审核筛选 </h3>
            <p>专业审核把控作品质量</p>
        </div>

        <div class="part4">
            <h3>星级服务</h3>
            <p>专业客服全天候在线</p>
        </div>
     </div>
</template>

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
.advantage {
    padding: 42px 0;
    background: #fff;
    font-size: 0;
    z-index: 2;
    margin-top: 45px;
    position: relative;
    box-shadow: -3px 0px 8px 0px 
        rgba(92, 92, 92, 0.2);
    display: flex;
     >div { flex: 1; text-align: left; padding-left: 95px;position: relative; cursor: pointer; }
     >div:hover { -webkit-transition: all 0.3s; -webkit-transform: translateY(-3px); }
     h3 { font-size: 18px; color: #333; }
     p { padding-top: 5px; font-size: 14px; line-height: 16px; color: #888888; }
     .part1:before { .bg-map(45px,52px,0px,-2px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part2:before{ .bg-map(45px,52px,-49px, -2px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part3:before{  .bg-map(45px,52px,-97px, -2px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part4:before{ .bg-map(45px,52px,-150px, -2px); content: ""; position: absolute; top: 0px; left: 35px;}
}
</style>