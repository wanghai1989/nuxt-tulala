<template>
    <ul class="anchor-list">
            <li class="prod-type" :class="item.type_class" :value="item.id" v-for="item in category" :key="item.id"> 
				<a :href="'#'+ item.type_class"> <i></i><br /> <span>{{item.name}}</span></a>
			</li>
		</ul>
</template>
<script>
 import {
    mapState,mapMutations,mapActions
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
  },
  methods:{ //页面进来发送请求
      ...mapActions({
          fetchCategory: 'fetchCategory'
      })
  
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
.anchor-list {text-align: center; 
    width: 68px;
    position: fixed;
    top: 50%;
    left: 50px;
    margin-top: -279px;
    background: #fff;
    padding: 0px 8px;
        box-sizing: border-box;
    box-shadow: 0px 0 8px 0
        rgba(92, 92, 92, 0.2);
    opacity: 0.98;
    z-index: 99;
    span{font-size: 12px;     display: inline-block; line-height: 1.2;
    margin-top: 5px;}
    .prod-type {
    padding: 15px 0px;
    border-bottom: 1px solid #ddd;
        }
    .prod-type a{display: block;}
    .prod-type:last-child{border-bottom: none;}
    .prod-type.png i{.bg-map(25px,25px,-209px, -42px); }
    .prod-type.bjtp i{.bg-map(25px,25px,-246px, -42px); }
    .prod-type.ui i{.bg-map(25px,25px,-286px, -41px); }
    .prod-type.mbsc i{.bg-map(25px,25px,-399px, -41px); }
    .prod-type.word i,.prod-type.ppt i,.prod-type.excel i{.bg-map(25px,25px,-433px, -42px); }
    .prod-type.syt i{.bg-map(25px,25px,-463px, -42px); }
    
    .prod-type.png:hover i{.bg-map(25px,25px,-209px, -78px); }
    .prod-type.bjtp:hover i{.bg-map(25px,25px,-246px, -79px); }
    .prod-type.ui:hover i{.bg-map(25px,25px,-288px, -77px); }
    .prod-type.mbsc:hover i{.bg-map(25px,25px,-399px, -75px); }
    .prod-type.word:hover i,.prod-type.ppt:hover i,.prod-type.excel:hover i{.bg-map(25px,25px,-434px, -77px); }
    .prod-type.syt:hover i{.bg-map(25px,25px,-464px, -76px); }
    
    .prod-type.png:hover span{color: var(--color); }
    .prod-type.bjtp:hover span{color: var(--colorBjtp); }
    .prod-type.ui:hover span{color: var(--colorUi); }
    .prod-type.mbsc:hover span{color: var(--colorMbsc); }
    .prod-type.word:hover span,.prod-type.ppt:hover span,.prod-type.excel:hover span{color: var(--colorBgwd); }
    .prod-type.syt:hover span{color: var(--colorSyt);}
}

</style>