<template>
<div class="about-contain">
	<div class="laymshade hand" v-if="show_withdraw">
			<div class="hand-box clearfix">
				<div class="hand-head">
					提现&nbsp;&nbsp;<span class="f14">图啦币总数：<em class="cred">{{platform_currency}}</em> </span> 
				</div>
				<i class="close" @click="closePay()"></i>
				<div class="coin-box">
				  <div class="coin-tip">
					温馨提示：<span class="cmain">10</span>个图啦币可兑换<span class="cmain">1</span>元，<span class="cmain">500</span>个起兑换，
					每次兑换为<span class="cmain">500</span>的倍数
				  </div>
				  <div class="coin-num">
					  <input type="text" class="input" v-model="withdraw_num"  onkeyup='this.value=this.value.replace(/\D/gi,"")' placeholder="请输入提现数量"/>
				  </div>
				  <div class="mt30">
					  <div class="error-msg tc" v-show="errorMsg">{{errorMsg}}</div>
					  <a href="javascript:void(0)" class="btn-withdraw" @click="withdraw()" >提现</a>
				  </div>
				</div>
				</div>
	</div>
			<div class="about-tit">
				<ul class="clearfix">
					<li :class="{focus:type==1}"><a href="javascript:void(0)" @click="fetchCommis(1)">积分</a> </li>
					<li :class="{focus:type==2}"><a href="javascript:void(0)"  @click="fetchCommis(2)">图啦币</a> </li>
					<li :class="{focus:type==3}"><a href="javascript:void(0)" @click="fetchVip(3)">VIP记录</a> </li>
					<li :class="{focus:type==4}"><a href="javascript:void(0)"  @click="fetchCommis(4)">优惠券</a> </li>
				</ul>
				<span v-if="type==1">积分总数 <strong>{{integral}}</strong> </span>
				<span v-else-if="type==2">图啦币总数 <strong> {{platform_currency}}</strong> <a href="javascript:void(0)" class="btn-withdraw" @click="showWithdraw()" >提现</a></span>
				 <span v-else><span v-if="type==3">到期时间 <strong>2021-11-30</strong></span> <nuxt-link class="btn-openvip" to="/user/pay-vip" >{{personInfo.is_vip?'续期VIP':'开通VIP'}}</nuxt-link></span>
			</div>

			<div class="vam vam-b tab-vip" v-if="type==1 || type==2">
				<div class="title">
					<div>获取方式</div>
					<div>数量</div>
					<div>时间</div>
				</div>
				<div  v-for="item in commission" :key="item.id">
					<div>{{item.note}} </div>
					<div>
						<span class="green" v-if="item.type==1">+{{item.num  | numFormat}}</span>
						 <span class="red" v-else>-{{item.num  | numFormat}}</span>
				</div>
					<div>{{item.created_at}}</div>
				</div>
			</div>

			<div class="vam vam-b tab-vip"  v-if="type==3">
				<div class="title">
					<div>订单号</div>
					<div>金额</div>
					<div>天数</div>
					<div>状态</div>
					<div>充值时间</div>
				</div>
				<div  v-for="item in viporder" :key="item.id">
					<div>{{item.out_trade_no}} </div>
					<div>{{item.amount | numFormat}}</div>
					<div>{{item.time_limit}}</div>
					<div>{{item.status_name}}</div>
					<div>{{item.created_at}}</div>
				</div>
			</div>
           <ul class="coupons" v-if="type==4" >
				<li  v-for="(item,index) in coupons" :key="index" :class="{'overdue':isOverdue(item.expire_date)}">
					<div class="font-box">
					<div class="font01"><strong>{{item.deduction_amount}}</strong><sub>元</sub> </div>
					<div class="font02">VIP充值满{{item.satisfaction_amount}}可用</div>
					<div class="font03">到期时间：{{dateFormat(item.expire_date)}}</div>
					</div>
				</li>
			</ul>
			<div class="nodata"  v-if="commission.length==0 &&  (type==1 || type==2)">
						<img src="~/assets/images/pic32.png" />
						<p>暂无数据</p>
					</div>
			<div class="nodata"  v-if="viporder.length==0 &&  type==3">
						<img src="~/assets/images/pic32.png" />
						<p>暂无VIP记录</p>
					</div>
			<div class="nodata"  v-if="coupons.length==0 &&  type==4">
						<img src="~/assets/images/pic32.png" />
						<p>暂无满减券</p>
					</div>
		</div>
</template>
<script>
import common from '~/assets/js/common'
import {mapState, mapActions} from 'vuex'
export default {
  metaInfo: {
    title: '积分明细-图啦啦'
  },
  data () {
    return {
	//  userInfo:{},
	show_withdraw:0,
	withdraw_num:'',
	errorMsg: '',
	 type:1
    }
  },
  mounted(){  
	  console.log('userToken',this.userToken)
			// this.userInfo=JSON.parse(window.localStorage.getItem("userInfo"))
			this.fetchCommis(1)
			this.fetchCoup()
		},
 computed:{
	  ...mapState(['commission','coupons','viporder','userToken','personInfo','integral','platform_currency'])
  },
  filters: {
				numFormat(value) {
					let realVal = Number(value).toFixed(1)
          			return Number(realVal)
				}
			},
  methods:{
 ...mapActions({
		  fetchCommission:'fetchCommission',
		  fetchVipOrder:'fetchVipOrder',
		  fetchCoupon:'fetchCoupon',
		  withDrawCoin:'withDrawCoin'
      }),
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchCommis(this.type)
            },
showWithdraw:function() {
	this.show_withdraw=1
},
withdraw:function() {
    const errMsg=this.validate()
	if (!errMsg) {
        this.errorMsg=''
		let formDatas = new FormData();
		formDatas.append('token', this.userToken);
		formDatas.append('num', this.withdraw_num);
		this.withDrawCoin(formDatas)
          .then((data) => {
			  if(data.code==1){
				  this.show_withdraw=0
				  layer.msg(data.msg, {icon: 1});
			  }else{
				   layer.msg(data.msg, {icon: 2});
			  }
		  })

	}else{
        this.errorMsg=errMsg
      }
},
 validate () {
     return common.validateWithdraw(this.withdraw_num,this.platform_currency)
  },
closePay:function(){
			this.show_withdraw=0
		},
isOverdue:function(endTime) {
		  var now =  new Date().valueOf();
		  var time=new Date(endTime).valueOf();
		  if(time<now){
			  return true
		  } 
		  else{
			   return false
		  } 
	  },
dateFormat:function(endTime) {
		let mytime=new Date(endTime)
		let myyear = mytime.getFullYear();
    let mymonth = mytime.getMonth() + 1;
    let myday = mytime.getDate();
    if (mymonth < 10) {
            mymonth = '0' + mymonth;
        }
    return myyear+'-'+mymonth+'-'+myday
	  },
fetchCoup(){
		let formDatas = new FormData();
		formDatas.append('token', this.userToken);
		formDatas.append('page', 1);
		formDatas.append('pageSize', 20);
		this.fetchCoupon(formDatas)
},

fetchCommis(species){
	this.type=species
	if(species==4){
		return
	}
	else{
		let formDatas = new FormData();
		formDatas.append('species', species);
		formDatas.append('token', this.userToken);
		this.fetchCommission(formDatas)
	}
    
},
fetchVip(species){
	this.type=species
    let formDatas = new FormData();
	formDatas.append('token', this.userToken);
	this.fetchVipOrder(formDatas)
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
.about-contain{padding: 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;

.about-tit{display: flex; border-bottom: 1px solid #d4d4d4; padding-bottom: 15px; align-items: center;
>span{ color: var(--grayColor);}
>span strong{font-size: 20px; color: var(--redColor);}
ul{flex: 1;}
li{float: left;width: 120px; height: 40px; line-height: 40px; text-align: left; }
li a{display: block;color: var(--backColor); font-size: 16px; }
li.focus a,li:hover a{color: var(--color);}
.btn-openvip{.btn(138px,40px,var(--color),linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%),#fff); font-size: 16px; vertical-align: initial;}
}
.btn-openvip:hover{opacity: 0.9;}
.btn-withdraw{.btn(138px,40px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff); font-size: 16px; vertical-align: initial;}
.btn-withdraw:hover{opacity: 0.9;}
.tab-vip{line-height: 50px; text-align: center; margin-top: 20px;}
>.title{font-size: 24px; color: var(--backColor); text-align: center;}
.green{color: green;}
.red{color: red;}
}
.coupons{ margin-top: 30px;display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
 li{width: 260px; height: 123px; background: url('~/assets/images/pic48.png') no-repeat;background-size: contain; padding: 5px 0 0 75px;
    box-sizing: border-box; color: #fff; margin:0px 26px 20px 0px;}
li:nth-child(4n){margin-right: 0px;}
li.overdue{background: url('~/assets/images/pic49.png') no-repeat;background-size: contain;}
.font-box{width: 160px; text-align: center;}
.font01 strong{font-size: 35px; font-weight: normal; line-height: 1.4; }
.font01 sub{font-size: 16px; vertical-align: baseline;}
.font02{font-size: 15px;}
.font03{width: 156px; height: 28px; line-height: 28px; background: #fbe945; color: #ff2c2c; font-size: 12px; text-align: center;}
li.overdue .font03{ background: #96948f;color: #fff; }
}

.hand-box{width: 600px;min-height: 400px; max-height: 800px;  position: fixed; top: 50%; left: 50%; margin-top: -250px; margin-left: -420px; z-index: 5; 
background: #fff; border-radius: 5px;  

.hand-head{width: 100%; height: 60px; line-height: 60px; font-size: 18px; color: var(--backColor); text-indent: 15px;
    background-color: #FAFAFA;
    border-bottom: 1px solid #EBEBEB;}
.close{.bg-map(24px,24px,-583px, -44px); position: absolute; top: 18px; right: 15px;}
.btn-submit{
    .btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);
}
.coin-box{margin-top: 30px;text-align: center;
.coin-num{margin-top: 60px;text-align: center;}
.coin-num .input{text-align: center; width: 300px;}

}
}


</style>