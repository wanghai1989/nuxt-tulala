<template>
<div class="state-box">
  <div class="title"><i></i> 恭喜您，{{status_content}}啦！</div> 
  <div class="part01">
	  您已成功支付  <span class="amount"><sub>¥</sub> {{money}}</span>  订单编号  {{order_sn}}
  </div>
  <div class="part02">
	  温馨提示：支付成功之后，您可以通过刷新页面查看最新订单状态
  </div>
  <div class="part03">
	  您还可以
    &nbsp;&nbsp;&nbsp;&nbsp; <nuxt-link to="/" class="back">返回首页</nuxt-link>
    &nbsp;&nbsp;&nbsp;&nbsp; <nuxt-link to="/person/my-works" class="order" v-if="type==1 || type==2">查看订单</nuxt-link> 
    &nbsp;&nbsp;&nbsp;&nbsp; <nuxt-link to="/person/vip-info" class="order" v-if="type==3">查看订单</nuxt-link> 
  </div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      type:0,  //工单定金  1   工单尾款   2   VIP支付  3

		 order_sn:'',
     money:0,
     status_content:'',
     status:0
    }
  },
  computed:{
	  ...mapState(['userToken'])
  },
   mounted(){ 
     this.type=this.$route.query.type
    this.orderInfo()
  },
  methods:{
 ...mapActions({
		  fetchWorkOrderStatus:'fetchWorkOrderStatus',  //获取订单的状态
      fetchOrderStatus:'fetchOrderStatus'
      }),
    orderInfo:function(){
      let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  formDatas.append('id', this.$route.query.id);
      formDatas.append('type', this.type);
      if(this.type==3){
        this.fetchOrderStatus(formDatas).then((data) => {
//      console.log(data)
						if(data.code==1){
//            console.log(data.data)
							if(data.data.status==1){
                  this.order_sn=data.data.order_sn
                  this.money=data.data.money
                  this.status_content=data.data.status_content
                  this.status=data.data.status
							}
						}
					})
      }else{
      this.fetchWorkOrderStatus(formDatas).then((data) => {
//      console.log(data)
						if(data.code==1){
//            console.log(data.data)
							if(data.data.status==1){
                  this.order_sn=data.data.order_sn
                  this.money=data.data.money
                  this.status_content=data.data.status_content
                  this.status=data.data.status
							}
						}
					})
        }
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
        background: url(../../assets/images/bg-ico.png) no-repeat @x @y;
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
	.state-box{ padding: 60px 40px 80px 280px; font-size: 16px; color: var(--backColor);    background: #fff;  margin-top: 40px;
	.title{font-size: 26px;  font-weight: bold;}
	.title i{.bg-map(60px,60px, -926px, -129px); margin-right: 5px;}
  .part01{margin-top: 15px;}
  .amount {font-size: 20px; font-weight: bold; color: var(--redColor); margin-right: 80px;}
  .amount sub{vertical-align: baseline; font-size: 16px;}
	.part02{color: var(--grayColor); margin-top: 5px; }
  .part03{margin-top: 50px;}
  .part03 .back{.btn(120px,40px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); }
  .part03 .order{color:var(--blueColor); }
  .part03 .order:hover{text-decoration: underline;}
	}
   
</style>