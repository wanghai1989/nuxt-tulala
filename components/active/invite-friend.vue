<template>
<div class="active-contain">
			<div class="invite-01">
				<!-- <img src="~/assets/images/invite_01.jpg" /> -->
			</div>
			<div class="invite-02">
				<img src="~/assets/images/invite-06.png" class="invite-reward"/>
				<div class="link-box">
						<input type="text" v-model="invitelink"/>
						<a href="javascript:void(0)" @click="copyContent()">点击复制邀请链接</a>
						<a href="javascript:void(0)" @click="getPromote()">下载邀请海报</a>
				</div>
			</div>
			<div class="invite-03">
				<!-- <img src="~/assets/images/invite_03.jpg" /> -->
				<div class="invite-data">
				<div class="vam-box">
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
				
				</div>
				<dl class="invite-rule">
					<dt>排名规则：</dt>
					<dd>1、按照获得累计佣金奖励总额由高到低排列；</dd>
					<dd>2、邀请达人榜展示获得奖励总额的前10名，若奖励总额相同，
     					则按照获得该奖励总额的时间顺序排列；</dd>
					<dd>3、以上数据每日更新。</dd>
				</dl>
			</div>
			<div class="invite-04"> 
				<!-- <img src="~/assets/images/invite_04.png" /> -->
				
			</div>
			<div class="invite-05">
				
			</div>
			<!-- <div class="invite-06">
				
			</div>
			<div class="invite-07">
				
			</div> -->
			<div class="layer_wechat">
				<canvas id="QRCode_header"></canvas>
				<!-- <img src="~/assets/images/pic45.png" /> -->
			</div>
		</div>
</template>
<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import QRCode from 'qrcode'; 
import processImg from '~/assets/js/processimg'
export default {

  data () {
    return {
		invitelink:'',
    }
  },
  watch :{
	  '$store.state.personInfo'(){
		   this.invitelink=this.baseUrl+'user/register?invite_code='+ this.personInfo.invite_code 
	   }
	  },
  mounted(){  
			this.fetchInviteList()
			this.invitelink=this.baseUrl+'user/register?invite_code='+ this.personInfo.invite_code 
		},
 computed:{
	  ...mapState(['ranklist','personInfo','baseUrl','basemUrl','userToken'])
  },
  methods:{
	  ...mapMutations(['setShowLogin']),
 ...mapActions({
		  fetchInviteList:'fetchInviteList'
		//   fetchPersoninfo:'fetchPersoninfo'
      }),
	//   updatePersoninfo:function(){
	// 	  let formDatas = new FormData();
	// 	  formDatas.append('token', this.userToken);
	// 	  this.fetchPersoninfo(formDatas).then((data) => { 
	// 		  this.invitelink=this.baseUrl+'/user/register?invite_code='+ this.personInfo.invite_code 
	// 	  })
	//   },
	   getPromote:function(){
		   if(!this.userToken){
			this.setShowLogin(1)
			return
		}
        // if(!this.userToken){
			
		// 	  layer.msg('你还未登录,请先登录', {icon: 2});
		// 	  setTimeout(() => {
		// 		  this.$router.push({path: '/user/login',query:{backUrl:this.$route.path}}) 
		// 	  }, 1500);
		// 	  return
		//   }
          let invitelink=this.basemUrl+'mobile-register?invite_code='+ this.personInfo.invite_code 


          QRCode.toDataURL(invitelink, {
                    type: "image/png", //类型
                    quality: 0.8, //图片质量A Number between 0 and 1
                    width: 140, //高度
                    height: 140, //宽度
                    errorCorrectionLevel: "L", //容错率
                    margin: 2, //外边距
                    color: {
                      dark: "#000000", //前景色
                      light: "#ffffff" //背景色
                    }
                  }).then(imgData => {
                    processImg.drawAndShareImage('/img/personInvite.jpg',imgData) //合成海报
                  })
      },
	//   wechatCode(){
	// 	  if(!this.userToken){
	// 		  setTimeout(() => {
	// 			  layer.msg('你还未登录,请先登录', {icon: 2});
	// 			  this.$router.push({path: '/user/login',query:{backUrl:this.$route.path}}) 
	// 		  }, 1500);
	// 		  return
	// 	  }
    //             let opts = {
    //                 errorCorrectionLevel: "H",//容错级别
    //                 type: "image/png",//生成的二维码类型
    //                 quality: 0.3,//二维码质量
    //                 margin: 0,//二维码留白边距
    //                 width: 200,//宽
    //                 height: 200,//高
    //                 text: "图啦啦邀请好友",//二维码内容
    //                 color: {
    //                     dark: "#333333",//前景色
    //                     light: "#fff"//背景色
    //                 }
    //             };
	// 			let invitelink=this.baseUrl+'m/mobile-register?invite_code='+ this.personInfo.invite_code   
    //             let msg = document.getElementById("QRCode_header");
    //             // 将获取到的数据（val）画到msg（canvas）上
    //             QRCode.toCanvas(msg, invitelink, opts, function (error) {
    //                 console.log(error)
    //             });
            


	// 	  layer.open({
	// 			type: 1,
	// 			shade: false,
	// 			title: false, //不显示标题
	// 			content: $('.layer_wechat'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
	// 			});
	//   },
	 copyContent(){ 
		//   if(!this.userToken){
		// 	  layer.msg('你还未登录,请先登录', {icon: 2});
		// 	  setTimeout(() => {
		// 		  this.$router.push({path: '/user/login',query:{backUrl:this.$route.path}}) 
		// 	  }, 1500);
		// 	  return
		//   }
		  if(!this.userToken){
			this.setShowLogin(1)
			return
		}
		//创建一个input元素
      let input = document.createElement('input') 
      input.value = this.invitelink
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
.invite-01{height: 511px; width: 100%; background: url(~/assets/images/invite_01.jpg) no-repeat top center; background-size: cover;}
.invite-02{height: 812px; width: 100%; background: url(~/assets/images/invite_02.jpg) no-repeat top center; background-size: cover;
text-align: center;
    padding-top: 164px;
    box-sizing: border-box;}
.invite-03{height: 945px; width: 100%; background: url(~/assets/images/invite_03.jpg) no-repeat top center; background-size: cover;}
.invite-04{height: 536px; width: 100%; background: url(~/assets/images/invite_04.png) no-repeat top center;
 background-size: cover;    padding-top: 110px; box-sizing: border-box;}
 .invite-reward{width: 665px;}
// .invite-05{height: 323px; width: 100%; background: url(~/assets/images/invite_05.png) no-repeat top center; background-size: 100% 323px;}
// .invite-06{height: 564px; width: 100%; background: url(~/assets/images/invite_06.png) no-repeat top center; background-size: 100% 564px;}

// .invite-03{text-align: center;}
// .invite-03 .item{display: inline-block; margin: 0px 25px; padding-top: 50px;}
// .invite-03 .item span{font-size: 18px; color: #fff;}
// .invite-03 .item a{display: block; width: 267px; height: 90px; line-height: 90px;color: #964f09; font-size: 24px;
// background: url(~/assets/images/invite_08.png) no-repeat; margin-top: 10px;}
.invite-03,.invite-02{position: relative;}
.link-box{display: flex; width: 1100px; position: absolute; bottom: 30px; left: 50%; margin-left: -550px;}
.link-box input{height: 90px; flex: 3; border: 12px solid #d1d1d1; background: #fff; border-radius: 5px; color: #999; box-sizing: border-box;    font-size: 18px;
    text-indent: 20px;}
.link-box a{flex: 1; margin-left: 12px; border: 12px solid #f2dc7a;  background: #feeb94; color: #966409; border-radius: 5px; text-align: center;
height: 90px; box-sizing: border-box; font-size: 22px; line-height: 66px; border-radius: 5px;}

.invite-data{position: absolute; left: 50%; top: 80px; margin-left: -400px; width: 800px; height: 539px; background: url(~/assets/images/invite-05.png) no-repeat;
 background-size: contain;}
 .vam-box{width: 600px; margin: 100px auto 0; text-align: center;  height: 384px;  overflow: hidden;}
.vam{line-height: 64px; }
.vam>div>div{border-bottom: 1px solid #ead57b; font-size: 18px; color: #ab8106;}

.invite-rule{position: absolute; left: 50%; top: 655px; margin-left: -400px; width: 800px; height: 539px;}
.invite-rule dt{width: 122px; height: 35px; background: #feeb94;    font-size: 18px;
    color: #ab8106; border: 2px solid #ab8106; border-radius: 8px; line-height: 35px; text-align: center; margin-bottom: 15px;}
.invite-rule dd{font-size: 18px; line-height: 30px; margin-bottom: 5px; color: #fff;}
// .invite-04 .vam{width: 680px;max-height: 380px;margin: 0 auto; line-height: 63px; color: #ab6906; font-size: 19px;text-align: center;}
// .invite-05 ol{width: 652px; margin: 0 auto; padding-top: 50px;}
// .invite-05 ol li{color: #fff; font-size: 18px; line-height: 42px; text-align: left;}
</style>