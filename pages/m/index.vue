<template>
<div>
   <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
         <a href="javascript:void(0)" @click="enter('enter')">
			<img src="~/assets/images/mbanner01.jpg" />
         </a>
		</div>
      <div class="swiper-slide">
         <nuxt-link to="/m/mobile-invite">
			<img src="~/assets/images/mbanner07.jpg" />
         </nuxt-link>
		</div>
      <div class="swiper-slide">
         <nuxt-link to="/m/mobile-invite">
			<img src="~/assets/images/mbanner02.jpg" />
         </nuxt-link>
		</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
  <div class="index-cont">
  <div class="item-cont">
     <h3 class="item-tit">
        精选服务
     </h3>
     <div class="hot-nav clearfix">
        <a href="javascript:void(0)" @click="enter('enter')">
           <img src="~/assets/images/mbanner03.jpg"/>
           <h3>入驻图啦</h3>
           <p>上传作品、在线接单赚取酬金</p>
        </a>
        <nuxt-link to="/m/public-task">
           <img src="~/assets/images/mbanner04.jpg"/>
           <h3>灵活雇佣</h3>
           <p>节省企业50%人力成本</p>
        </nuxt-link>
        <nuxt-link to="/m/mobile-invite">
           <img src="~/assets/images/mbanner05.jpg"/>
           <h3>邀请好友</h3>
           <p>坐享平台收益20%</p>
        </nuxt-link>
        <a href="javascript:void(0)"  @click="enter('/material/1')">
           <img src="~/assets/images/mbanner06.jpg"/>
           <h3>高效办公</h3>
           <p>六大品类素材持续上新</p>
        </a>
     </div>
  </div>
  </div>
  <div class="index-cont">
     <h3 class="item-tit first">
        全站素材
     </h3>
  
  <ul class="ul-category clearfix">
     <li  v-for="item in category" :key="item.id">
        <nuxt-link :to="{ name:'m-material-id', params:{id: item.id }}" >
        <em :class="item.type_class">
           <i class="iconfont" v-if="item.type_class=='png'">&#xe602;</i>
           <i class="iconfont" v-if="item.type_class=='bjtp'">&#xe605;</i>
           <i class="iconfont" v-if="item.type_class=='ui'">&#xe604;</i>
           <i class="iconfont" v-if="item.type_class=='mbsc'">&#xe676;</i>
           <i class="iconfont" v-if="item.type_class=='syt'">&#xe606;</i>
           <i class="iconfont" v-if="item.type_class=='word'">&#xe6eb;</i>
           <i class="iconfont" v-if="item.type_class=='ppt'">&#xe6ea;</i>
           <i class="iconfont" v-if="item.type_class=='excel'">&#xe609;</i>
        </em> <br />
        <span>
           {{item.name}}
        </span>
        </nuxt-link>
     </li>
  </ul>
  </div>
</div>
</template>
<script>
import { mapState,mapActions} from 'vuex'
export default {
	props:["position"],
   layout: 'mobile',
	data () {
    return {
     bannerUrl: [],
    }
  },
  head(){
	   return {
			title:'首页-图啦啦91tula.com'
			}
  },
 mounted() {
	    this.fetchBanner()		
       this.fetchCategory()	
  },
  computed:{
	  ...mapState(['homebanner','category','baseUrl'])
  },
  methods:{ //页面进来发送请求
      ...mapActions(['fetchHomeBanner','fetchCategory']),
      
      enter(url){
         let _that=this
         let fullpath=this.baseUrl+url
         layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>请移步电脑端访问 </br>网址：'+fullpath+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    _that.copyContent(fullpath);
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
      },
      copyContent(fullpath){ 
		//创建一个input元素
      let input = document.createElement('input') 
      input.value = fullpath
      // 在body里面插入这个元素
      document.body.appendChild(input)   
      // 选中input里面内容
      input.select()  
      //执行document里面的复制方法
      document.execCommand("Copy") 
      // 复制之后移除这个元素
      document.body.removeChild(input)

	  layer.msg('已复制成功哦~', {icon: 1});
	  
    },
	 async fetchBanner(){
		  let formDatas = new FormData();
		  formDatas.append('position', this.position);
		 await this.fetchHomeBanner(formDatas);
			  new Swiper('.swiper-container', {
						pagination: {
							clickable :true,
							el: '.swiper-pagination',
						},
						autoplay:true
						});
			
	  }
  },
}
</script>
<style lang="less" scoped>
.swiper-container { width: 100%; height: 1.9rem; min-height: 190px; position: relative;  z-index: 2;  }
.swiper-container img{width: 100%;}
.swiper-container .swiper-pagination{ bottom: 0px;left: 0; width: 100%;}
.swiper-pagination-bullet{width: 8px; height: 8px; margin: 0px 4px;}
.swiper-pagination .swiper-pagination-bullet-active{background: #fff;}
.index-cont{padding: 0px 10px;}
.ul-category li{float: left; width: 25%; text-align: center; margin-top: 15px;
em{display: inline-block; width: 40px; height: 40px; line-height: 40px; border-radius: 20px; background: #34bc76; color: #fff;}
em.png{background: #34bc76;}
em.bjtp{background: #3738ff;}
em.ui{background: #9e3bff;}
em.mbsc{background: #cc1e00;}
em.syt{background: #39aeff;}
em.word{background: #5195fd;}
em.ppt{background: #5195fd;}
em.excel{background: #5195fd;}
em i.iconfont{font-size: 18px;}
span{font-size: 12px;}
}
.item-cont{margin-top: 25px;}
h3.item-tit{font-size: 15px; font-weight: bold; color: var(--color); border-left: 4px solid var(--color); 
text-indent: 8px; height: 15px; line-height: 15px;margin-bottom: 15px;}
h3.item-tit.first{margin-bottom: 0px; margin-top: 20px;}
.hot-nav a{ display: grid;
    border-radius: 6px;
    width: 49%; position: relative;
    overflow: hidden; float: left; margin-bottom: 10px;
}
.hot-nav a:nth-child(2n+1){margin-right: 2%;}
.hot-nav a img{width: 100%;}
.hot-nav a h3{position: absolute; bottom: 30px; color: #fff; font-size: 18px; font-weight: bold; text-indent: 10px;}
.hot-nav a p{position: absolute; bottom: 10px; line-height: 20px; color: #fff; text-indent: 10px; font-size: 13px;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
word-wrap: break-word;}

</style>