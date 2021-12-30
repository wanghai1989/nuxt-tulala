<template>
    <div class="handin wrapper">
	  	<div class="nav">
			  <nuxt-link to="/about/handin-hand" class="focus">口碑好评</nuxt-link>
	  		&nbsp;&nbsp;/&nbsp;&nbsp;<nuxt-link to="/about/qq-group">QQ联盟</nuxt-link>&nbsp;&nbsp;/&nbsp;&nbsp;<nuxt-link to="/about/enterprise-team">团队介绍</nuxt-link>
	  	</div>
	  	<div class="title">心系图啦啦●晒图啦合影，获全站会员&nbsp;&nbsp;  <nuxt-link to="/about/handin-hand" class="btn-upload">我也要上传<i></i></nuxt-link> </div>
	  	<div class="swiper-xxtl">
		    <div class="swiper-wrapper">
		      <div class="swiper-slide clearfix"  v-for="item in evaluation" :key="item.id" >
		      	<img :src="item.url" />
		      	<div class="swiper-txt">
		      		<div class="username">
		      			<img :src="personInfo.avatar" v-if="personInfo.avatar" />
                        <img src='~/assets/images/defaultVip.png' v-else /> 
		      			{{item.nickname}} </div>
		      		<div class="font">
		      			{{item.content}}
		      		</div>
		      	</div>
		      </div>
		    </div>
		  </div>
	  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  mounted() {
	    this.fetchEvaluat()
  },
   computed:{
	  ...mapState(['evaluation'])
  },
  methods:{
 ...mapActions({
		  fetchEvaluation:'fetchEvaluation'
      }),
	 async fetchEvaluat(){
		 let params={
       is_show_index:1,
				page:1,  //当前页
				pageSize:10  //一页显示数量
			}
			await this.fetchEvaluation(params)
      new Swiper('.swiper-xxtl', {
                                  slidesPerView: 2,
                                  spaceBetween: -100,
                                  centeredSlides: true,
                                  loop: true,
                  autoplay:3000
                                  });
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
.handin{background: #fff; padding: 35px 45px; margin-top: 50px; overflow: hidden;box-sizing: border-box;
.nav a{font-size: 18px; color: #333;}
.nav a:hover,.nav a.focus{color:var(--color);}
.title{color: #333;font-size: 24px; text-align: center; margin-top: 45px;}
.btn-upload{.btn(220px,48px,var(--color),var(--color),#fff); background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%); border-radius: 24px; font-size: 16px;}
.btn-upload i{.bg-map(16px,14px,-764px, -6px); margin: -3px 0px 0px 10px;}
.btn-upload:hover{opacity: 0.9;}
}

.swiper-xxtl {
      width: 1100px;
      height: 253px;
          overflow: hidden;
      margin: 50px auto 15px;

 .swiper-slide {
      text-align: center;
      font-size: 18px;
      width: 530px;
      padding: 40px 25px;
      height: 253px;
      box-sizing: border-box;
    background-image: linear-gradient(-180deg, 
        #bfc8c0 0%, 
        #777777 100%);
      transition: 300ms;
      transform: scale(0.8);
      border-radius: 6px;
      
    }
.swiper-slide img{ width: 55%; height: 174px; float: left; border-radius: 5px;}
.swiper-txt{ float: left; width: 41%; margin-left: 4%; padding-top: 20px;}
 .swiper-txt .username{
        color: #fff; font-size: 18px; height: 40px; line-height: 40px; text-align: left;
        img{height: 38px; width: 38px; border: 2px solid #fff; border-radius: 22px; background: #fff; margin-right: 10px;}
    }
 .swiper-txt .font{font-size: 14px; color: #fff; line-height: 28px; text-align: left; margin-top: 20px;}
    
.swiper-slide-active,.swiper-xxtl .swiper-slide-duplicate-active{
    background-image: linear-gradient(-180deg, 
        #729c74 0%, 
        #418436 100%);
        width: 530px;
      transform: scale(1);
      position: relative;
      z-index: 22;
    }
}
</style>