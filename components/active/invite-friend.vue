<template>
<div class="active-contain">
			<div class="invite-01">
				
			</div>
			<div class="invite-02">
				
			</div>
			<div class="invite-03">
				<div class="item">
					<span> 电脑端</span> 
					<a href="javascript:void(0)" @click="copyContent()">点击复制邀请链接</a>
				</div>
				<div class="item">
					<span>手机端</span>  
					<a href="javascript:void(0)" @click="wechatCode()">点击微信扫码分享</a>
				</div>
			</div>
			<div class="invite-04"> 
				<div class="vam">
					<div>
						<div>昵称</div>
						<div>累计获得佣金</div>
						<div>成功邀请人数</div>
					</div>
					<div  v-for="item in ranklist" :key="item.id">
						<div>{{item.nickname}}</div>
						<div>{{item.total}}个图啦币</div>
						<div>{{item.invite_count}}人</div>
					</div>
				</div>
			</div>
			<div class="invite-05">
				<ol>
					<li>1、按照获得累计佣金奖励总额由高到低排列；</li>
					<li>2、邀请达人榜展示获得奖励总额的前10名，若奖励总额相同，
     					则按照获得该奖励总额的时间顺序排列；</li>
					<li>3、以上数据每日更新(节假日除外）。</li>
				</ol>
			</div>
			<div class="invite-06">
				
			</div>
			<div class="invite-07">
				
			</div>
			<div class="layer_wechat">
				<canvas id="QRCode_header"></canvas>
				<!-- <img src="~/assets/images/pic45.png" /> -->
			</div>
		</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import QRCode from 'qrcode'; 
export default {
  metaInfo: {
    title: '邀请好友-图啦啦'
  },
  data () {
    return {
    }
  },
  mounted(){  
			this.fetchInviteList()
			
		},
 computed:{
	  ...mapState(['ranklist','personInfo','baseUrl','userToken'])
  },
  methods:{
 ...mapActions({
		  fetchInviteList:'fetchInviteList'
      }),
	  wechatCode(){
		  if(!this.userToken){
			  layer.msg('你还未登录,请先登录', {icon: 2});
			  return
		  }
                let opts = {
                    errorCorrectionLevel: "H",//容错级别
                    type: "image/png",//生成的二维码类型
                    quality: 0.3,//二维码质量
                    margin: 0,//二维码留白边距
                    width: 200,//宽
                    height: 200,//高
                    text: "图啦啦邀请好友",//二维码内容
                    color: {
                        dark: "#333333",//前景色
                        light: "#fff"//背景色
                    }
                };
				let invitelink=this.baseUrl+'m/mobile-register?invite_code='+ this.personInfo.invite_code   
                let msg = document.getElementById("QRCode_header");
                // 将获取到的数据（val）画到msg（canvas）上
                QRCode.toCanvas(msg, invitelink, opts, function (error) {
                    console.log(error)
                });
            


		  layer.open({
				type: 1,
				shade: false,
				title: false, //不显示标题
				content: $('.layer_wechat'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
				});
	  },
	



	 copyContent(){ 
		  if(!this.userToken){
			  layer.msg('你还未登录,请先登录', {icon: 2});
			  return
		  }
		//创建一个input元素
      let input = document.createElement('input') 
      //给input的内容复制
      let invitelink=this.baseUrl+'user/register?invite_code='+ this.personInfo.invite_code   
      input.value = invitelink
      // 在body里面插入这个元素
      document.body.appendChild(input)   
      // 选中input里面内容
      input.select()  
      //执行document里面的复制方法
      document.execCommand("Copy") 
      // 复制之后移除这个元素
      document.body.removeChild(input)

	  layer.msg('已复制成功哦~', {icon: 1});
	  
    }
}
}
</script>
<style lang="less" scoped>

.active-contain{width: 100%; max-width: 1920px; height: auto; margin: 0 auto;}
.share-input{height: 1px; width: 1px; opacity: 0;}
.layer_wechat{width: 200px; height: 200px; display: none; padding: 12px; background: #fff;  box-shadow: #000000 0px 0px 6px; 
img{width: 100%;}
}
.invite-01{height: 522px; width: 100%; background: url(~/assets/images/invite_01.png) no-repeat top center; background-size: 100% 522px;}
.invite-02{height: 901px; width: 100%; background: url(~/assets/images/invite_02.png) no-repeat top center; background-size: 100% 901px;}
.invite-03{height: 374px; width: 100%; background: url(~/assets/images/invite_03.png) no-repeat top center; background-size: 100% 374px;}
.invite-04{height: 571px; width: 100%; background: url(~/assets/images/invite_04.png) no-repeat top center;
 background-size: 100% 571px;    padding-top: 110px; box-sizing: border-box;}
.invite-05{height: 323px; width: 100%; background: url(~/assets/images/invite_05.png) no-repeat top center; background-size: 100% 323px;}
.invite-06{height: 564px; width: 100%; background: url(~/assets/images/invite_06.png) no-repeat top center; background-size: 100% 564px;}

.invite-03{text-align: center;}
.invite-03 .item{display: inline-block; margin: 0px 25px; padding-top: 50px;}
.invite-03 .item span{font-size: 18px; color: #fff;}
.invite-03 .item a{display: block; width: 267px; height: 90px; line-height: 90px;color: #964f09; font-size: 24px;
background: url(~/assets/images/invite_08.png) no-repeat; margin-top: 10px;}
.invite-04 .vam{width: 680px;max-height: 380px;margin: 0 auto; line-height: 63px; color: #ab6906; font-size: 19px;text-align: center;}
.invite-05 ol{width: 652px; margin: 0 auto; padding-top: 50px;}
.invite-05 ol li{color: #fff; font-size: 18px; line-height: 42px; text-align: left;}
</style>