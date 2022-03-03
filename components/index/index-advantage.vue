<template>
    <div class="advantage clearfix">
        <div class="part1">
            <router-link to="/task/public">
            <h3>发布需求</h3>
            <p>大量设计师随时待命</p>
            </router-link>
        </div>
        <div class="part2">
            <router-link to="/task">
            <h3>在线接单 </h3>
            <p>利用闲暇时间赚外块</p>
            </router-link>
        </div>
        <div class="part3">
            <router-link to="/mine/upload-file">
            <h3>分享素材</h3>
            <p>原创素材分享让作品价值最大化</p>
            </router-link>
        </div>
        <div class="part4">
            <router-link :to="{ name: 'material-id', params:{id: 1 }}">
            <h3>下载素材 </h3>
            <p>各种设计素材无限下载</p>
            </router-link>
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
     .part1:before { .bg-map(52px,52px,-188px, -238px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part2:before{ .bg-map(52px,52px,-245px, -239px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part3:before{  .bg-map(52px,52px,-301px, -240px); content: ""; position: absolute; top: 0px; left: 35px;}
     .part4:before{ .bg-map(52px,52px,-358px, -237px); content: ""; position: absolute; top: 0px; left: 35px;}
}
</style>