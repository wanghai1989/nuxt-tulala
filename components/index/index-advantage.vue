<template>
    <div class="advantage clearfix">
        <div class="part1" title="发布需求">
            <div class="icon"><em class="iconfont">&#xec46;</em></div> 
            <router-link to="/task/public">
            <h3>发布需求</h3>
            <p>优质设计师随时待命</p>
            </router-link>
        </div>
        <div class="part2" title="在线接单">
            <div class="icon"><em class="iconfont">&#xe656;</em></div> 
            <router-link to="/task">
            <h3>在线接单 </h3>
            <p>利用闲暇时间赚外块</p>
            </router-link>
        </div>
        <div class="part3" title="分享素材">
            <div class="icon"><em class="iconfont">&#xe626;</em></div> 
            <router-link to="/mine/upload-file">
            <h3>分享素材</h3>
            <p>上传原创素材获得图啦币奖励</p>
            </router-link>
        </div>
        <div class="part4" title="搜索素材">
            <div class="icon"><em class="iconfont">&#xe608;</em></div> 
            <router-link :to="{ name: 'material-id', params:{id: 1 }}">
            <h3>搜索素材 </h3>
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
@keyframes donut-spin {
   0% {
     transform: rotate(0deg);
   }
 
   100% {
     transform: rotate(360deg);
   }
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
     >div { flex: 1; text-align: left; padding-left: 45px;position: relative; cursor: pointer; display: flex;}
    //  >div:hover { -webkit-transition: all 0.3s; -webkit-transform: translateY(-3px); }
     >div:hover .icon{animation: donut-spin 1.2s ease;}
    >div .icon{width: 52px; height: 52px; border-radius: 26px; background: var(--color);  color: #fff; text-align:center; line-height: 52px; margin-right: 15px;}
    .part1 .icon{background: #26ab06;}
    .part2 .icon{background: #00a0e9;}
    .part3 .icon{background: #ff7831;}
    .part4 .icon{background: #dd0000;}
    >div .icon em{font-size: 25px;}
    h3 { font-size: 18px; color: #333; }
     p { padding-top: 5px; font-size: 14px; line-height: 16px; color: #888888; }
    //  .part1:before { .bg-map(52px,52px,-188px, -238px); content: ""; position: absolute; top: 0px; left: 35px;}
    //  .part2:before{ .bg-map(52px,52px,-245px, -239px); content: ""; position: absolute; top: 0px; left: 35px;}
    //  .part3:before{  .bg-map(52px,52px,-301px, -240px); content: ""; position: absolute; top: 0px; left: 35px;}
    //  .part4:before{ .bg-map(52px,52px,-358px, -237px); content: ""; position: absolute; top: 0px; left: 35px;}
}
</style>