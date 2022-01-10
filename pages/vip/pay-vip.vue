<template>
<div>
  <webLogin></webLogin>
    <div class="vip-box wrapper">
        <div>
                <img src="~/assets/images/banner07.png" />
        </div>
        <div class="vip-info">
                <div class="cgray mt20">赞助账号：<span class="cblack">好小子</span>（ 普通会员 ）</div>
                <div class="vip-type">
                        <div class="item"  v-for="item in viptype" :key="item.id" @click="payVip(item.type,item.activity_price)" :class="{chose:item.type==nowid}">
                                <em class="design" v-if="item.type==3">入驻设计师专享</em>
                                <div class="type">{{item.content}}</div>
                                <span class="qian"><em>￥</em>{{item.activity_price}}<b>原价{{item.original_price}}</b></span>
                                <div class="tips">全站<span class="cred">任意下载</span></div>
                        </div>
                </div>
                <div class="vip-amount">
                        <i class="i-sheng" v-show="couponAmount">{{couponAmount}}元满减券</i> 
                        支付金额：<span class="cred f24 fw">{{orderPrice}} </span>元</div>
                <div class="pay-style">
                        <div class="wechat">
                                <div class="box" :class="{'unlogin':!this.userToken}">
                                        <a href="javascript:void(0)" v-show="!this.userToken" @click="gologin()">
                                                点击登录
                                        </a>


                                        <canvas id="QRCode_header"></canvas>
                                        <!-- <img src="../assets/images/pic26.png" /> -->
                                </div>
                                <div class="txt">
                                        <i></i>&nbsp;微信扫码支付
                                </div>
                        </div>
                        <div class="alipay" style="display:none;">
                                <div class="box">
                                        <img src="~/assets/images/pic27.png" />
                                        <p>暂未开放</p>
                                </div>
                                <div class="txt">
                                        支付宝扫码支付&nbsp;<i></i>
                                </div>
                        </div>
                </div>
                <div class="pay-limits">
                        <div class="item item01">
                                <div class="title">天天上新</div>
                                <div class="txt">元素+背景+UI+电商+平面素材</div>
                        </div>
                        <div class="item item02">
                                <div class="title">无限下载</div>
                                <div class="txt">无限下载提高工作效率</div>
                        </div>
                        <div class="item item03">
                                <div class="title">审核筛选</div>
                                <div class="txt">专业审核把控作品质量</div>
                        </div>
                        <div class="item item04">
                                <div class="title">星级服务</div>
                                <div class="txt">专业客服全天候在线</div>
                        </div>
                </div>
        </div>
</div>
	</div>
</template>

<script>
import QRCode from 'qrcode'; 
import webLogin from '~/components/layout/web-login.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {webLogin},
metaInfo: {
    title: 'VIP会员支付中心-图啦啦91tula.com'
  },
 data () {
    return {
      nowid:0,
      orderId:0,
      orderPrice:0,  //订单价格=优惠价-满减券额
      couponAmount:0,//可用满减券金额
      requestStatue:{},
      QRCodeMsg:''
    }
  },
  mounted(){  
       
        this.fetchVipType()
        let interVip=  setInterval(() => { 
                if(JSON.stringify(this.firstVip) != "{}"){
                this.payVip(this.firstVip.type,this.firstVip.activity_price) 
                clearInterval(interVip)
                }  
        }, 200);
        if(this.userToken){
            this.payStatue()
        }
	 },
 watch:{ //弹出登录框登录成功触发
	  '$store.state.showLogin'(){
		  setTimeout(() => { //获取到数据到浏览器渲染需要时间
			 this.payVip(this.nowid)
		  },200)
      }
    },
computed:{
      ...mapState(['userToken','viptype','showLogin','firstVip','personInfo'])
  },	
  methods:{
  ...mapMutations(['setShowLogin']),
 ...mapActions({
		  payVipQd:'payVipQd',
                  fetchVipType:'fetchVipType',
                  fetchOrderStatus:'fetchOrderStatus'
      }),
gologin:function(){
        if(!this.userToken){
                        this.setShowLogin(1)
                        return
                }
},
payStatue:function(){
         this.requestStatue=setInterval(() => { 
                if(this.orderId==0){
                        return
                }else{
         let formDatas = new FormData();
        formDatas.append('token', this.userToken);
        formDatas.append('id', this.orderId);
    this.fetchOrderStatus(formDatas).then((data) => {
        if(data.code==1){
        if(data.data.status==1){
           this.$router.push({path:'/pay-state',query:{'type':3,'id':this.orderId}}) 
        }
        }
     })  }
     }, 3000);
    
},

	  
payVip:function(type,price){
        if(type==3 && this.personInfo.designer_status!=102){
              layer.msg('此类型会员只针对图啦设计师开放！！', {icon: 2});
              return
        }
        this.nowid=type
        let formDatas = new FormData();
        formDatas.append('type', type);
        formDatas.append('token', this.userToken);
        this.payVipQd(formDatas).then((data) => {
                // console.log(data)
                this.orderId=data.data.orderId
                 this.QRCodeMsg = data.data.payUrl; 
                 this.couponAmount=data.data.memberCouponTotal
                 this.orderPrice=price-data.data.memberCouponTotal
                 this.getQRCode()
        })
	  },
        
  getQRCode() {
                let opts = {
                    errorCorrectionLevel: "H",//容错级别
                    type: "image/png",//生成的二维码类型
                    quality: 0.3,//二维码质量
                    margin: 0,//二维码留白边距
                    width: 140,//宽
                    height: 140,//高
                    text: "图啦啦会员支付",//二维码内容
                    color: {
                        dark: "#333333",//前景色
                        light: "#fff"//背景色
                    }
                };
                let msg = document.getElementById("QRCode_header");
                // 将获取到的数据（val）画到msg（canvas）上
                QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
                //     console.log(error)
                });
            }
        },
        beforeDestroy() {
                clearInterval(this.requestStatue)
        }   

}
</script>
<style lang="less" scoped>
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
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
    display: inline-block;
    vertical-align: middle;
    width: @width;
    height: @height;
    position: relative;
    background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
    cursor: pointer;
}

.vip-box{background-color: #ffffff; box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.19); border-radius: 5px;    margin-top: 25px;
.vip-info{padding:0 40px 60px; width: 900px; margin: 0 auto;}
    .vip-type{display: flex; justify-content: center;    margin-top: 20px;}
    .vip-amount{font-size: 16px; color: var(--grayColor); margin-top: 22px; padding-top: 30px; border-top: 1px dashed rgba(0, 0, 0, 0.15);}
    .vip-type .item{ width: 265px;border: solid 2px #d4d4d4; margin: 0 6px; height: 160px; box-sizing: border-box;text-align: center; border-radius: 4px;
     padding: 18px 15px 0px;position: relative; cursor: pointer;
     em.design{position: absolute;
    height: 28px;
    line-height: 28px;
    display: block;
    background: var(--redColor);
    color: #fff;
    width: 110px;
    left: -6px;
    top: -14px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;}
     .type{font-size: 18px; color: var(--backColor); font-weight: bold;}
     .tips{margin-top: 5px; color: var(--grayColor); border-top: 1px dashed #c8c9cc; line-height: 38px;}
     }

    .item.chose{border: solid 2px var(--redColor);  background: #fff2f4;}
    .item.chose:after{content: "";  bottom: 0; right: 0; display: block; .bg-map(34px,34px, -294px, -125px); position: absolute;}
    .i-sheng{.bg-map(120px,24px, -256px, -191px); color: #fff; text-align: center; line-height: 24px; font-size: 13px; vertical-align: top; margin: 10px 15px 0 0;}
     .qian{
    display: block;
    font-size: 40px;
    font-family: Arial;
    font-weight: 700;
    color: var(--redColor);
    text-align: center;
}
.qian em{
        display: inline-block;
    font-size: 16px;
    color: var(--redColor);
    vertical-align: 17px;
    font-weight: 100;
    font-style: normal;
    text-align: center;
}
 .qian b{
    font-size: 16px;
    font-weight: 100;
    color: #666;
    text-decoration: line-through;
}
.pay-style{margin-top: 60px;text-align: center;display: flex;    justify-content: center;
.wechat,.alipay{width: 166px;margin: 0px 15px; }
.wechat .box{width: 164px; height: 164px; background-color: #ffffff; border-radius: 4px; border: solid 1px #34bc76; justify-content: center;  align-items: center;
    display: flex; }
.wechat .box.unlogin{background: #eee;    display: block;
    line-height: 166px;
    text-decoration: underline;
    font-size: 18px;}
.alipay .box{width: 164px; height: 164px; background-color: #ffffff; border-radius: 4px; border: solid 1px #00a0e9;justify-content: center;  align-items: center;
    display: flex;}
.wechat .txt{ height: 36px; line-height: 36px; margin-top: 12px;}
.wechat .txt i{.bg-map(30px,26px, -346px, -133px);}
.alipay .txt{width: 100%; height: 36px; background: #00a0e9; line-height: 36px; color: #fff; font-size: 16px; color: #fff; border-radius: 4px; margin-top: 12px;}
.alipay .txt i{.bg-map(9px,15px, -484px, -140px);}
}
    }
.pay-limits{display: flex; margin-top: 30px; padding-top: 30px;  border-top: 1px dashed rgba(0, 0, 0, 0.15); justify-content: space-between; }
.pay-limits>.item{flex: 1; margin: 0px 15px; padding: 10px 15px; border-radius: 4px; text-align: left;}
.pay-limits>.item01{background: linear-gradient(180deg, #ffcdaa, #ffa27f 98%);}
.pay-limits>.item02{background: linear-gradient(180deg, #febbb0, #ff88a3);}
.pay-limits>.item03{background: linear-gradient(180deg, #d47bee, #a483ff);}
.pay-limits>.item04{background: linear-gradient(180deg, #7cb1fe, #a292ff);}
.pay-limits .title{font-size: 18px; color: #fff;}
.pay-limits .txt{font-size: 14px; color: #fff; line-height: 1.2; margin-top: 6px;}
</style>