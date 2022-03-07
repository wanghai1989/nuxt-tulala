<template>
    <ul class="anchor-list" id="anchor">
        <li class="prod-type service"> 
            <a href="#remarks"> <i class="iconfont">&#xeb36;</i><br /> <span>精选服务</span></a>
        </li>
        <li class="prod-type png"> 
            <a href="#png"> <i class="iconfont">&#xe602;</i><br /> <span>设计素材</span></a>
        </li>
        <li class="prod-type syt"> 
            <a href="#syt"> <i class="iconfont">&#xe606;</i><br /> <span>摄影图片</span></a>
        </li>
        <li class="prod-type word"> 
            <a href="#word"> <i class="iconfont">&#xe6eb;</i><br /> <span>办公文档</span></a>
        </li>
        <li class="prod-type kbhp"> 
            <a href="#kbhp"> <i class="iconfont">&#xe673;</i><br /> <span>口碑好评</span></a>
        </li>
            <!-- <li class="prod-type" :class="item.type_class" :value="item.id" v-for="item in category" :key="item.id"> 
				<a :href="'#'+ item.type_class"> <i></i><br /> <span>{{item.name}}</span></a>
			</li> -->
		</ul>
</template>

<script>
 import {
    mapState,mapActions
} from 'vuex'
export default {
  props: ['dataClass'],
    data(){
	return { 
	
  }
  },
  computed:{
	  ...mapState(['category'])
  },
  mounted(){  
	  this.fetchCategory()
      this.showTop()
  },
  methods:{ //页面进来发送请求
      ...mapActions({
          fetchCategory: 'fetchCategory'
      }),
      showTop(){
                    window.onscroll = function () {
                        if ($(window).scrollTop()>150){
                            $("#anchor").fadeIn(800);
                            }else{
                            $("#anchor").fadeOut(800);
                            }
                    }
                },
  
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
.anchor-list {text-align: center;  display: none;
    width: 68px;
    position: fixed;
    top: 50%;
    left: 25px;
    margin-top: -279px;
    background: #fff;
    padding: 0px 8px;
        box-sizing: border-box;
    box-shadow: 0px 0 8px 0
        rgba(92, 92, 92, 0.2);
    opacity: 0.98;
    z-index: 99;
    span{font-size: 12px;}
    .prod-type {
    padding: 12px 0px;
    border-bottom: 1px solid #ddd;
    line-height: 26px;
        }
    .prod-type a{display: block; color:var(--grayColor);}
    .prod-type:last-child{border-bottom: none;}
    .prod-type i{font-size: 24px;}

    // .prod-type.service i{.bg-map(25px,25px,-461px, -236px); }
    // .prod-type.png i{.bg-map(25px,25px,-209px, -42px); }
    // .prod-type.bjtp i{.bg-map(25px,25px,-246px, -42px); }
    // .prod-type.ui i{.bg-map(25px,25px,-286px, -41px); }
    // .prod-type.mbsc i{.bg-map(25px,25px,-399px, -41px); }
    // .prod-type.word i,.prod-type.ppt i,.prod-type.excel i{.bg-map(25px,25px,-433px, -42px); }
    // .prod-type.syt i{.bg-map(25px,25px,-463px, -42px); }
    
    // .prod-type.service:hover i{.bg-map(25px,25px,-461px, -269px); }
    // .prod-type.png:hover i{.bg-map(25px,25px,-209px, -78px); }
    // .prod-type.bjtp:hover i{.bg-map(25px,25px,-246px, -79px); }
    // .prod-type.ui:hover i{.bg-map(25px,25px,-288px, -77px); }
    // .prod-type.mbsc:hover i{.bg-map(25px,25px,-399px, -75px); }
    // .prod-type.word:hover i,.prod-type.ppt:hover i,.prod-type.excel:hover i{.bg-map(25px,25px,-434px, -77px); }
    // .prod-type.syt:hover i{.bg-map(25px,25px,-464px, -76px); }

    .prod-type.service a:hover{color: var(--redColor); }
    .prod-type.png a:hover i{color: var(--color);}
    .prod-type.syt a:hover i{color: var(--colorSyt); }
    .prod-type.word a:hover i{color: var(--colorBgwd); }
    .prod-type.kbhp a:hover i{color: #ff8e12; }
    
    .prod-type:hover span{color: var(--backColor); }
    // .prod-type.png:hover span{color: var(--color); }
    // .prod-type.bjtp:hover span{color: var(--colorBjtp); }
    // .prod-type.ui:hover span{color: var(--colorUi); }
    // .prod-type.mbsc:hover span{color: var(--colorMbsc); }
    // .prod-type.word:hover span,.prod-type.ppt:hover span,.prod-type.excel:hover span{color: var(--colorBgwd); }
    // .prod-type.syt:hover span{color: var(--colorSyt);}
}

</style>