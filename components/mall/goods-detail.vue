<template>
<div>
  <form @submit="doSubmit">
<div class="shop-title">
			<div class="wrapper">
				 {{gooddetail.goods_name}}
			</div>
		</div>
		<div class="wrapper">
		<div class="shop-box clearfix">
			<div class="shop-l">
        <div class="good-img">
          <img :src="gooddetail.goods_image" alt=""/>
        </div>
        
				<!-- <div class="swiper-container gallery-top">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
		  <img :src="gooddetail.goods_image" alt=""/>
	  </div>
    </div>
    <div class="swiper-pagination"></div>
  </div> -->
			
			</div>
			<div class="shop-r">
				<div class="f22 cblack"> {{gooddetail.goods_name}}</div>
				<div class="mt10"> {{gooddetail.describe}}</div>
				<div class="buy-num">
					<div class="tit">兑换数量</div>
					<div class="data-num">
						<span class="reduce"  @click="reduce()"><i></i> </span>
						<input type="text" class="input" v-model="goodnum"/>
						<span class="plus" @click="add()"><i></i> </span>
					</div>
				</div>
				<div class="buy-num">
					<div class="tit">价格</div>
					<div class="f18 cred">
						{{gooddetail.integral}}积分
					</div>
				</div>
				<div class="mt40">
          <button class="btn-exchange" type="submit">立即兑换</button>
					<!-- <nuxt-link class="btn-exchange" to="integral-exchange">立即兑换</nuxt-link> -->
				</div>
			</div>
		</div>
    <div class="shop-detail">
			<h3>商品介绍</h3>
			<div class="info">
        <div v-html="gooddetail.introduce"></div>
			</div>
		</div>
	  </div>
    </form>
</div>
</template>
<script>
import {
    mapState,mapMutations,mapActions
} from 'vuex'
export default {
  // props:["prodId"],
    data(){
	return { 
    // userInfo: {},
    // id:0,
		 goodnum:1,
     maxnum:10
  }
  },
  computed:{
	  ...mapState(['gooddetail','personInfo','userToken'])
  },
  created(){
    // this.id=this.$route.params.id
  //  console.log (this.$route.params.id) 
  },
  mounted(){ 
  },
  methods:{ //页面进来发送请求
	 ...mapActions({
          placeOrder:'placeOrder'
      }),
      add:function(){
        this.goodnum++;
        if(this.goodnum>this.gooddetail.inventory){
          this.goodnum=this.gooddetail.inventory
          layer.msg('库存仅剩'+this.gooddetail.inventory, {icon: 2});
        }
      },
      reduce:function(){
        this.goodnum--;
        if(this.goodnum<1){
          this.goodnum=1
        }
      },
       doSubmit (e) {
      e.preventDefault()
       let _that=this
      if(!this.userToken){
        this.$router.replace({path:'/user/login',query:{backUrl: this.$route.path}}) ;
        return
      }
      if(!this.personInfo.is_complete_my_info){
       
			layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>您目前还未完善个人信息，寄件需要用到您的地址</div>',
                btn: ['去完善','取消'],
                yes: function(index){
                    _that.$router.push({path: '/mine/basic-info',query:{backUrl:_that.$route.path}}) 
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
              return false;
      }
      let formDatas = new FormData();
		  formDatas.append('goods_id',this.$route.params.id);
		  formDatas.append('count', this.goodnum);
      formDatas.append('token', this.userToken);
        // 调用接口
        this.placeOrder(formDatas)
          .then((data) => {
            console.log(data)
             if(data.code==0){
              layer.msg(data.msg, {icon: 2});
              return false;
            }
            if(data.code==1){
              layer.msg(data.msg, {icon: 1});
              }
          })
    }
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
.shop-title{width: 100%; max-width: 1920px; margin: 0 auto; box-shadow: 0px 3px 8px 0px  rgba(92, 92, 92, 0.2); 
height: 80px; line-height: 80px; background: #fff; font-size: 18px; color:var(--backColor); }
.shop-box{margin-top: 30px;
.shop-l{width: 440px; float: left; margin-right: 30px; min-height: 400px;
.good-img{ height: 440px;
              width: 100%; background: var(--colorInit);
			  overflow: hidden;}
.good-img img{max-width: 100%; max-height: 100%;}
// .swiper-slide {
//               background-size: cover;
//               background-position: center;
//             }
//             .gallery-top {
//               height: 440px;
//               width: 100%;
// 			  overflow: hidden;
//             }
//             .gallery-thumbs {
//               height: 80px;
//               margin-top: 10px;
//             }
//             .gallery-thumbs .swiper-slide {
//               height: 100%;
// 			  width: 80px;
//               opacity: 0.4;
//             }
//             .gallery-thumbs .swiper-slide-thumb-active {
//               opacity: 1;
//             }
}
.swiper-slide img{width: 100%;}
.shop-r{width: 730px; float: left; background: #fff; padding: 40px 40px; box-sizing: border-box;height: 440px;
.buy-num{margin-top: 35px;}
.buy-num .tit{color: var(--backColor);    margin-bottom: 5px;}
.data-num{width: 130px; height: 34px; border: 1px solid #d4d4d4; display: flex;    align-items: center;}
.data-num .input{text-align: center;  border-radius: 0;}
.reduce,.plus{width: 35px; text-align: center;}
.input{width: 58px; border:none; border-left: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4; height: 32px; line-height: 32px;}
.reduce i{.bg-map(16px,16px,-716px, -83px);}
.plus i{.bg-map(16px,16px,-752px, -80px);    vertical-align: text-bottom;}
.btn-exchange{.btn(138px,48px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff); opacity: 1;}
.btn-exchange:hover{opacity: 0.9;}
}
}
.shop-detail{width: 100%; padding: 40px 50px; background: #fff;margin-top: 30px;
    box-sizing: border-box;
h3{font-size: 20px; color: var(--backColor); height: 20px; line-height: 20px; border-left: 3px solid var(--redColor); text-indent: 10px;}
.info{margin-top: 15px; text-align: center;}
.info img{max-width: 100%;}
}


</style>