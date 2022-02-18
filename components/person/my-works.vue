<template>
<div class="file-contain">
	<div class="laymshade hand" v-if="show_pay">
			<div class="hand-box clearfix">
				<div class="hand-head">
					{{publicStateName[titState]}}
				</div>
				<i class="close" @click="closePay()"></i>
				<div class="pay-style">
				  <div class="pay-txt">
					  <strong>微信支付</strong>  二维码有效时长为5分钟，请尽快支付
				  </div>
				  <div class="wechat">
					<div class="box">
							<canvas id="QRCode_header"></canvas>
							<!-- <img src="../assets/images/pic26.png" /> -->
					</div>
					<div class="txt">
							<i></i>&nbsp;微信扫码支付
					</div>
				</div>
				</div>
				</div>
	</div>
	<div class="work-tit">
		<ul class="categary-nav">
			<li :class="{'focus':worktype==1}" ><a href="javascript:void(0);" @click="fetchWork(1)">我的发布</a></li>
			<li :class="{'focus':worktype==2}"><a href="javascript:void(0)"  @click="fetchWork(2)">我的接单</a> </li>
		</ul>
		<nuxt-link to="/task/public"  class="btn-withdraw">免费发布任务</nuxt-link>
	</div>
			<ul class="ul-task" v-if="worktype==1">
				<li  v-for="item in worklist" :key="item.id">
					<div class="task-l">
						<div>
							<nuxt-link class="cmain fw f16" :to="{ name: 'task-id', params:{ id: item.id }}" >{{item.name}}</nuxt-link>
							<p class="f12 cgray">发布时间&nbsp;{{publicTime(item.status_approved_time)}} </p>
						</div>
				  		<div class="cgray mt20">
						 <span class="worktxt">工单编号&nbsp;<b class="cblack f15">{{item.order_sn}}</b></span>
						 <span class="worktxt">雇佣设计师&nbsp;<nuxt-link  :to="{ name: 'designer-id', params:{ id: item.design_id }}"> <b class="cblack f15"> {{item.design_nickname}}</b></nuxt-link></span>
						  <span class="worktxt">手机号&nbsp;<b class="cblack f15">{{item.mobile}}</b></span>
						  <span class="worktxt">预算&nbsp;<b class="cblack f15">{{item.money}}</b></span>
						  <span class="worktxt">有效期&nbsp;<b class="cblack f15">{{endDays(item.effective_time)}} </b></span>
						</div>
				  		<div class="mt20 cgray">项目描述&nbsp;<span class="cblack">{{item.description}}</span></div>
					</div>
					<div class="task-r">
						<button  class="btn-public"  :disabled="[0,2,3,6,7,8].includes(item.status)"  @click="payOrd(item.id,item.status)">{{publicStateName[item.status]}}</button>
						
						<div class="cgray mt5" v-if="item.status==1">已有<span class="cmain" >{{item.apply_count}}人</span>报价</div>
						<div class="cgray mt5" v-if="item.status==4"><span class="cmain" >{{item.subscription}}</span>元</div>
						<div class="cgray mt5" v-if="item.status==5">工单进行中，待付<span class="cmain" >{{item.balance_payment}}</span>元</div>
					</div>
				</li>
			</ul>

			<ul class="ul-task"  v-if="worktype==2">
				<li  v-for="item in worklist" :key="item.id">
					<div class="task-l">
						<div>
							<nuxt-link class="cmain fw f16" :to="{ name: 'designer-id', params:{ id: item.id }}" >{{item.name}}</nuxt-link> 
							<p class="f12 cgray">发布时间&nbsp;{{publicTime(item.status_approved_time)}} </p>
						</div>
				  		<div class="cgray mt20">
						<span class="worktxt">工单编号&nbsp;<b class="cblack f15">{{item.order_sn}}</b></span>
						  <span class="worktxt">手机号&nbsp;<b class="cblack f15">{{item.mobile}}</b></span>
						  <span class="worktxt">确认金额&nbsp;<b class="cblack f15">{{item.real_money}}</b></span>
						  <span class="worktxt">有效期&nbsp;<b class="cblack f15">{{endDays(item.effective_time)}}</b></span>
						  </div>
				  		<div class="mt20 cgray">项目描述&nbsp;<span class="cblack">{{item.description}}</span></div>
					</div>
					<div class="task-r">
						<button  class="btn-public" @click="confirmOrd(item.id,item.status)" :disabled="[1,4,5,6,8].includes(item.status)" >{{acceptStateName[item.status]}}</button>
						<div class="mt5"><a href="javascript:void(0)" v-if="item.status==3" class="cmain" @click="downContracFile(item.id,item.name)" title="点击下载">《项目协议条款》</a>  </div>
						<div class="cgray mt5" v-if="item.status==4 || item.status==5">待收{{item.status==4?"定金" :"尾款"}}<span class="cmain" >{{item.status==4?item.subscription:item.balance_payment}}</span>元</div>
						<div class="mt5" v-if="item.status==6"><span class="cmain" >1-2</span>个工作日完成结算</div>
					</div>
				</li>
			</ul>

			<div class="nodata" v-if="worklist.length==0">
				<img src="~/assets/images/pic32.png" />
				<p>暂无工单</p>
			</div>
			<mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
		</div>
</template>
<script>
import common from '~/assets/js/common'
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
import QRCode from 'qrcode'; 
export default {
	components: {MoPaging},
  metaInfo: {
    title: '我的工单-图啦啦'
  },
  data () {
    return {
		worktype:1,
		page:1,
		pageSize:10,
		QRCodeMsg:'',
		show_pay:0,
		workid:'',
		titState:0, //4支付定金，5支付尾款
		requestStatue:{},
		TimerSwitch:true
	//  userInfo:{}
    }
  },
  mounted(){  
			this.fetchWork(this.worktype)
		},
 computed:{
	  ...mapState(['countfile','worklist','userToken','publicStateName','acceptStateName'])
  },
  methods:{
 ...mapActions({
		  fetchWorklist:'fetchWorklist',
		  confirmOrder:'confirmOrder',
		  customerPays:'customerPays',
		  balancePaymentPays:'balancePaymentPays',
		  fetchWorkOrderStatus:'fetchWorkOrderStatus',  //获取订单的状态
		  downContract:'downContract'
      }),
	  downContracFile(id,name){
		let param={
				token: this.userToken,
				id:id //素材类型
			}
		 this.downContract(param).then((res) => {
			 this.download(res,name);
          })
	},
	download:function(data,fileName) {
　　　　　　if (!data.size) {
			   layer.msg('没有可下载文件', {icon: 2});
　　　　　　　　return
　　　　　　}
			
			let blob = new Blob([data], {type: "application/msword"});
		
		if (typeof window.navigator.msSaveBlob !== "undefined") {
			window.navigator.msSaveBlob(blob, fileName);
		} else {
			var blobURL = window.URL.createObjectURL(blob);
			// 创建隐藏<a>标签进行下载
			var tempLink = document.createElement("a");
			tempLink.style.display = "none";
			tempLink.href = blobURL;
			tempLink.setAttribute("download", '《'+fileName+'项目协议条款》');
			if (typeof tempLink.download === "undefined") {
			tempLink.setAttribute("target", "_blank");
			}
			document.body.appendChild(tempLink);
			tempLink.click();
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(blobURL);
		}
　　　　　　},
	  closePay:function(){
			this.show_pay=0
			this.TimerSwitch=false
		},
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchWork(this.worktype)
            },
    publicTime:function(time){
		return common.getDateDiff(time)
	},
	endDays:function(time){
		return common.getEndDays(time)
	},
	confirmOrd:function(id,status){
		if(status==3){
			let _that=this
			layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>确定表示同意此项目协议条款</div>',
                btn: ['确定','取消'],
                yes: function(index){
					let formDatas = new FormData();
						formDatas.append('token', _that.userToken);
						formDatas.append('id', id);
						
						_that.confirmOrder(formDatas)
						.then((data) => {
							if(data.code==0){
							layer.msg(data.msg, {icon: 2});
							}
							if(data.code==1){
								_that.fetchWork(2)
							layer.msg(data.msg, {icon: 1});
							}
						})
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
		  }else{
			  return
		  }
	},
	payOrd:function(id,status){
		this.TimerSwitch=true   //点击支付打开计时器
		this.titState=status
		this.workid=id
		 let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  formDatas.append('id', id);
		  if(status==1){
			  this.$router.push({name: 'taskhire-id', params:{ id: id}})
			  return
		  }
		  if(status==4){
		 this.customerPays(formDatas)
          .then((data) => {
			if(data.code==0){
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
				this.show_pay=1
				this.QRCodeMsg = data.data; 
				setTimeout(() => {
					this.getQRCode()
				}, 100);
				formDatas.append('type', 1);
				 this.requestStatue=setInterval(() => { 
					if(!this.TimerSwitch){
						clearInterval(this.requestStatue)
					}
				this.fetchWorkOrderStatus(formDatas).then((data) => {
						if(data.code==1){
							if(data.data.status==1){
								clearInterval(this.requestStatue)
								this.$router.push({path:'/pay-state',query:{'type':1,'id':id}}) 
							}
						}
					})
			}, 3000);
			}
          })
		  return
		  }if(status==5){
			  this.balancePaymentPays(formDatas)
				.then((data) => {
				if(data.code==0){
				layer.msg(data.msg, {icon: 2});
				}
				if(data.code==1){
				this.show_pay=1
				this.QRCodeMsg = data.data; 
				setTimeout(() => {
					this.getQRCode()
				}, 100);
				formDatas.append('type', 2);
				this.requestStatue=setInterval(() => { 
					if(!this.TimerSwitch){
						clearInterval(this.requestStatue)
					}
				this.fetchWorkOrderStatus(formDatas).then((data) => {
						if(data.code==1){
							if(data.data.status==1){
								clearInterval(this.requestStatue)
								this.$router.push({path:'/pay-state',query:{'type':2,'id':id}}) 
							}
						}
					})
			}, 3000);
				}
          })
		  return
		  }
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
                        dark: "#333",//前景色
                        light: "#fff"//背景色
                    }
                };
                let msg = document.getElementById("QRCode_header");
                // 将获取到的数据（val）画到msg（canvas）上
                QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
                    // console.log(error)
                });
            },
fetchWork:function(obj){
		  let formDatas = new FormData();
		  this.worktype=obj
		  formDatas.append('token', this.userToken);
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  formDatas.append('type',this.worktype);
		  this.fetchWorklist(formDatas)
	  },
},
beforeDestroy() {
                clearInterval(this.requestStatue)
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
.file-contain{padding: 10px 0px 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
.work-tit{border-bottom: 1px solid #d4d4d4;padding-bottom: 15px;align-items: center; display: flex;padding: 0 15px;}
.categary-nav{margin-top: 0;  flex: 1; border-bottom: none;}
.btn-withdraw{.btn(138px,40px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff); font-size: 16px; vertical-align: initial;}
.btn-withdraw:hover{opacity: 0.9;}
.ul-task{ 
li{display: flex;padding: 25px 30px; border-bottom: 1px solid #ddd; }
li a:hover{text-decoration: underline;}
li:hover{background: #fbfbfb;}
.task-l{ flex: 1; }
.task-l .worktxt{display: inline-block; margin-right: 40px;}
.task-r{width: 200px; text-align: right;}
.btn-public{.btn(138px,40px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
.btn-public.disabled{background: #bbb; border: 1px solid #bbb;}
.btn-public[disabled]{background: #bbb; border: 1px solid #bbb;}
}

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
.pay-style{margin-top: 30px;text-align: center;
.pay-txt{font-size: 16px; color: var(--grayColor); text-align: center;    margin: 0px auto 20px;}
.pay-txt strong{font-size: 20px;  color: var(--backColor);}
.wechat,.alipay{width: 166px; margin: 0px auto;}
.wechat .box{width: 164px; height: 164px; background-color: #ffffff; border-radius: 4px; border: solid 1px #34bc76; justify-content: center;  align-items: center;
    display: flex; }
.alipay .box{width: 164px; height: 164px; background-color: #ffffff; border-radius: 4px; border: solid 1px #00a0e9;justify-content: center;  align-items: center;
    display: flex;}
.wechat .txt{ height: 36px; line-height: 36px; margin-top: 12px;}
.wechat .txt i{.bg-map(32px,26px, -344px, -133px);}
.alipay .txt{width: 100%; height: 36px; background: #00a0e9; line-height: 36px; color: #fff; font-size: 16px; color: #fff; border-radius: 4px; margin-top: 12px;}
.alipay .txt i{.bg-map(9px,15px, -484px, -140px);}
}
}
</style>