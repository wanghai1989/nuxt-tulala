<template>
<div class="active-contain">
			<div class="wheel-01">
			</div>
			<div class="wheel-02">
				<div class='winnerBox'>
				    <div class="turnplate_box">
				        <canvas id="myCanvas" width="260px" height="260px">抱歉！浏览器不支持。</canvas>
				        <button id="tupBtn" class="turnplatw_btn" @click="beginDraw()">
				            <img src="~/assets/images/lottery/guding@2x.png" class="turnplatw_img">
				            <div class="goIcon"></div>
				        </button>
				    </div>
				</div>
			</div>
			<div class="wheel-03">


				<div class="title">您的总积分 <b>{{personInfo.integral}}</b> </div>
				<div class="subtit"><strong> 获取更多积分</strong> 
					每日签到+5积分&nbsp;&nbsp;&nbsp;&nbsp;
					成功邀请好友一人+100积分<nuxt-link to="/active/invite-friend">去邀请</nuxt-link> &nbsp;&nbsp;&nbsp;&nbsp;
                    成功上传牵手图啦一人+100积分<nuxt-link to="/about/handin-hand">去上传</nuxt-link> 
				</div>
			</div>
			<div class="wheel-04">
				<div class="rules">
					<h3>抽奖规则
					</h3>
					<ol>
						<li>1. 每次参与抽奖将会消耗10积分</li>
						<li>2. 积分奖励直接发放至积分账号</li>
						<li>3. VIP、优惠券中奖后及时到账</li>
						<li>4. 法律允许范围内，活动最终解释权归图啦啦所有</li>
						<li>5. 更多活动信息欢迎加入图啦啦官方群348912253，活动福利抢先知晓</li>
					</ol>
				</div>
			</div>
			
		</div>
</template>
<script>

import { mapState,mapActions} from 'vuex'
export default {
  data () {
    return {
        OnceIntegral:10,
        radius:130,
        winnerList:[
    {
        id:'1',
        name:'5积分',
        msg:'恭喜您获得5积分',
        probability:'36%',
    },{
        id:'2',
        name:'10积分',
        msg:'恭喜您获得10积分',
        probability:'5%',
    },{
        id:'3',
        name:'500满减券',
        msg:'恭喜您获得500满减券',
        probability:'5%',
    },{
        id:'4',
        name:'100满减券',
        msg:'恭喜您获得100满减券',
        probability:'6%',
    },{
        id:'5',
        name:'50满减券',
        msg:'恭喜您获得50满减券',
        probability:'7%',
    },{
        id:'6',
        name:'1天VIP',
        msg:'恭喜您获得1天VIP',
        probability:'6%',
    },{
        id:'7',
        name:'终身VIP',
        msg:'恭喜您获得终身VIP',
        probability:'0%',
    },{
        id:'8',
        name:'谢谢参与',
        msg:'谢谢参与',
        probability:'35%',
    }
]
    }
  },
  computed:{
      ...mapState(['personInfo','userToken'])
  },
  mounted(){
    import('~/assets/js/awardRotate.js')
	import('~/assets/js/lottery.js')
    this.updatePersoninfo()
  },
  methods:{
      ...mapActions({
        luckyDraw: 'luckyDraw',
        fetchPersoninfo:'fetchPersoninfo'
     }),
    bigwheel:function(id){
        let formDatas = new FormData();
		formDatas.append('token', this.userToken);
        formDatas.append('id', id+1); //奖品id=数组索引+1
        formDatas.append('integral', this.OnceIntegral);
        this.luckyDraw(formDatas).then((data) => {
                 if(data.code==1){
                    this.updatePersoninfo()
                    //  this.personInfo.integral-=this.OnceIntegral
                     layer.msg(this.winnerList[id].msg, {icon: 1});
                 }else{
                    layer.msg(data.msg, {icon: 2});
                }
             })
    },
     updatePersoninfo:function(){
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  this.fetchPersoninfo(formDatas)
	  },
    //转盘旋转
     runCup:function(i,item) {
        let _that=this
        var angles = i * (360 / _that.winnerList.length);
        console.log(angles)
        if(angles == 90 || angles == 180 || angles == 270){
            angles = angles +1
        }
        $('#myCanvas').stopRotate();
        $('#myCanvas').rotate({
            angle:0,
            animateTo:2880 - angles,
            duration:8000,
            callback:function (){
                $('#tupBtn').removeAttr("disabled", true);
                _that.bigwheel(i)
            }
        });
    },
    //点击抽奖
    beginDraw:function(){
        if(this.personInfo.integral<10){
            layer.msg('积分不足', {icon: 2});
            return
        }
        //转盘旋转过程“开始抽奖”按钮无法点击
        $('#tupBtn').attr("disabled", true);
        // 中奖率randomRate
        var randomRate = []
        $.each(this.winnerList, function (i, item) {
            randomRate.push(item.probability)
        })
        var item = this.rnd(randomRate);
          this.runCup(item,this.winnerList[item]);
    },
    
    //概率计算
     rnd:function(rate){
        var random = Math.floor(Math.random() * 100);
        var myRandom = [];
        var randomList = [];
        var randomParent = [];
        for(var i = 0; i < 100; i++){
            myRandom.push(parseInt([i]) + 1);
        }
     
        for(var i = 0; i < rate.length; i++){
            var temp = [];
            var start = 0;
            var end = 0;
            randomList.push(parseInt(rate[i].split('%')[0]));
            for(var j = 0; j < randomList.length; j++){
                start += randomList[j-1] || 0
                end += randomList[j]
            }
            temp = myRandom.slice(start, end);
            randomParent.push(temp)
        }
        for(var i = 0; i < randomParent.length; i++){
            if($.inArray(random, randomParent[i]) > 0){
                return i
            }
        }
    }

  }
}
</script>
<style lang="less" scoped>
button[disabled]{
    background: transparent!important;
    color: #fff !important;
    border: 1px solid transparent !important;
}
.active-contain{width: 100%; max-width: 1920px; height: auto; margin: 0 auto;}
.wheel-01{height: 400px; width: 100%; background: url(~/assets/images/wheel_01.png) no-repeat top center; background-size: 100% 400px;}
.wheel-02{height: 837px; width: 100%; background: url(~/assets/images/wheel_02.png) no-repeat top center; background-size: 100% 837px;}
.wheel-03{height: 250px; width: 100%; background: url(~/assets/images/wheel_03.png) no-repeat top center;
 background-size: 100% 250px; text-align: center; padding-top: 25px; box-sizing: border-box;}
.wheel-03>.title{color: #c21133; font-size:20px; margin-bottom: 30px;}
.wheel-03>.title b{font-size: 30px;}
.wheel-03 .subtit strong{font-size: 24px; font-weight: normal; display: block; margin-bottom: 5px;}
.wheel-03 .subtit{font-size: 16px; color: #fff; width: 900px; margin: 0px auto; text-align: left;}
.wheel-03 .subtit a{display: inline-block; vertical-align: middle;    font-size: 14px;
    height: 26px; line-height: 26px; color: #fff; padding: 0px 15px;
    background-color: #c21133;
    border-radius: 13px;}
.wheel-04{height: 413px; width: 100%; background: #feb05e;}
.wheel-04 .rules{width: 980px; background: #f67b42; padding: 35px 50px;    border-radius: 5px;
 box-sizing: border-box; display: flex; color: #fff; margin: 0 auto;}
.wheel-04 .rules>h3{font-size:30px; position: relative; width: 150px;height: 40px; }
.wheel-04 .rules>h3:after{content: ''; display: block; height: 4px; width: 60px; 
position: absolute; bottom: -15px; left: 0px;background: #ffd81a;}
.wheel-04 .rules>ol{flex: 1; margin-left: 30px; line-height: 42px; font-size: 16px;}
.winnerBox{
    max-width:800px;
    /*padding:30px;*/
    margin: 0px auto;
    /*height: calc(100vh - 98px);*/
    /*background-color: #fd6504 #9470fd;*/
    /*background:linear-gradient(to bottom right, #fd6504 , #9470fd)*/
}
/* 大转盘样式 */
.turnplate_box {
    width: 100%;
    background:url("~/assets/images/lottery/zhuanp@2x.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
}
.turnplate_box canvas {
    margin: 7.5%;
    width: calc(100% - 15%);
    height: calc(100% - 15%);
    /*position: absolute;*/
    border-radius: 50%;
    z-index: 10;
    flex-shrink: 0;
}
#myCanvas {
    background-color: white;
    border-radius: 100%;
    /*transition: transform 6s;*/
    -o-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    overflow: hidden;
}
.turnplatw_btn {
    width: 30%;
    height: 35%;
    left: 35%;
    top: 30.5%;
    border-radius: 100%;
    position: absolute;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    z-index: 2;
}
.turnplatw_img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.goIcon{
    color: #fff;
    font-weight: 800;
    position:absolute;
    margin-right: auto;
    margin-left: auto;
    background:url("~/assets/images/lottery/go.png")  no-repeat;
    background-size: 100% 100%;
    top:25%;
    width: 50%;
    height: 50%;
    text-align: center;
    left:25%;
}
</style>