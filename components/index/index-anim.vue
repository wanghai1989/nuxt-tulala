<template>
    <div id="center_ad" class="center_adallvip center_ad" v-if="showLayer==1">
      <div class="box animated bounceIn">
        <!-- <div class="countdown"> 入驻限时赠送年VIP  2天1小时59分10秒</div> -->
        <nuxt-link to="/enter"   class="link img-box">
               <div class="receive" @click="goEnter()"  title="立即入驻">
                   <span> 立即入驻 </span> <br />
                   <em>限时送年VIP</em> 
                 </div>
                 <div class="subline"  v-html="strTime"></div> 
               <!-- <div class="downtime">入驻限时赠送年VIP   2天1小时59分10秒</div> -->
        </nuxt-link>
      <em class="close iconfont icon-close"  @click="close()"></em>
      </div>
      </div>
</template>
<script>
export default {
data () {
    return {
      showLayer:0,
      SysSecond:0,
       InterValObj:'',
       strTime:''
    //   downTime:15
    }
  },
  mounted() {
		this.setlayer()
        this.SysSecond = this.GetDateDiff('2022-3-31 0:0:0'); //这里获取倒计时的起始时间
        if(!this.getCookie("loanName"))
        {this.InterValObj = setInterval(this.SetRemainTime, 1000);} //间隔函数，1秒执行}
        
	    // this.Interval()
  },
  methods: {
    // Interval(){
    //     let time= setInterval(() => {
    //         this.downTime--
    //         if(this.downTime<0){
    //        clearInterval(time)
    //        this.showLayer=0
    //        this.setCookie("loanName","loan")
    //     }
    //     }, 1000);
        
    // },
    close(){
    this.showLayer=0
    this.setCookie("loanName","loan")
     window.clearInterval(this.SetRemainTime);
    },
    setlayer:function(){
    		if(this.getCookie("loanName")){
          this.showLayer=0
    		}else{
                this.showLayer=1
            }
    	},
     setCookie:function(cookname,value) 
      { 
          var Days = 1; 
          var exp = new Date(); 
          exp.setTime(exp.getTime() + Days*24*60*60*1000); 
          document.cookie = cookname + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
      },
     getCookie:function(cookname) 
      { 
          var arr,reg=new RegExp("(^| )"+cookname+"=([^;]*)(;|$)"); 
      　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
      },
      goEnter:function(){
          this.$router.push('/enter');
        //   this.close()
      },
     GetDateDiff:function(endTime) {
            endTime = endTime.replace(/\-/g, "/");
            var sTime = new Date();      //开始时间
            var eTime = new Date(endTime);  //结束时间
            return parseInt((eTime.getTime() - sTime.getTime()) / 1000);
        },
//将时间减去1秒，计算天、时、分、秒
 SetRemainTime:function() {
     console.log(this.SysSecond)
  if (this.SysSecond > 0) {
   this.SysSecond = this.SysSecond - 1;
   var second = Math.floor(this.SysSecond % 60);            // 计算秒     
   var minite = Math.floor((this.SysSecond / 60) % 60);      //计算分 
   var hour = Math.floor((this.SysSecond / 3600) % 24);      //计算小时
   var day = Math.floor((this.SysSecond / 3600) / 24);       //计算天 
 
   var hourDiv = "<span id='hourSpan'>"+ hour + "<em style='font-size: 16px; color: #d70908; margin: 0px 2px;'>小时</em>"+"</span>";
   var dayDiv = "<span id='daySpan'>"+ day + "<em style='font-size: 16px; color: #d70908;margin: 0px 2px;'>天</em>"+"</span>";

   this.strTime=dayDiv + hourDiv + minite + "<em style='font-size: 16px; color: #d70908;margin: 0px 2px;'>分</em>" + second + "<em style='font-size: 16px; color: #d70908;margin: 0px 2px;'>秒</em>"
 
  } else {//剩余时间小于或等于0的时候，就停止间隔函数
   window.clearInterval(this.InterValObj);
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
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
#center_ad {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0,0,0,0.4);
}
.countdown{position: absolute; right: 15px; top: 15px; width: 60px; height: 30px; line-height: 30px; background: #fff; color: var(--backColor); text-align: center;
border-radius: 4px; font-size: 16px;}
.center_ad .box {
    z-index: 9999;
    position: absolute;
    width: 560px;
    height: 560px;
    top: 50%;
    left: 50%;
    margin: -280px 0 0 -280px;
    background: url(~/assets/images/pic51.png)no-repeat center /100%;
    border-radius: 5px;
}

.center_ad .box .img-box {
    display: block;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}
.center_ad .box .img-box .receive{width: 280px; display: block; position: absolute; bottom:55px; left: 140px; line-height: 1.3; padding: 5px 0px;
background-image: linear-gradient(#ffc44f, #ffe791); text-align: center; color: #ec0b49;  border-radius: 32px;
    // animation: scaleDraw 3s linear infinite;
    span{font-size: 22px; }
    em{font-size: 14px; color: #c98400;}
}
.center_ad .box .img-box .subline {position: absolute; bottom: 20px; left: 0; width: 100%; height: 30px; line-height: 30px; text-align: center; font-size: 24px; color: #fff;}
.center_ad .box .close {
    .bg-map(40px,40px,-103px, -187px);position: absolute;top: 0px;
    right: -58px;
    cursor: pointer;
}
.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}
.bounceIn {
    animation-duration: .75s;
    animation-name: bounceIn;
}

//  @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
//             0%{
//                 transform: scale(1);  /*开始为原始大小*/
//             }
//             25%{
//                 transform: scale(1.1); /*放大1.1倍*/
//             }
//             50%{
//                 transform: scale(1);
//             }
//             75%{
//                 transform: scale(1.1);
//             }
//         }
@keyframes bounceIn{0%,20%,40%,60%,80%,
to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);
animation-timing-function:cubic-bezier(.215,.61,.355,1)}
0%{-webkit-transform:scale3d(.3,.3,.3);opacity:0;transform:scale3d(.3,.3,.3)}
20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}
40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}
60%{-webkit-transform:scale3d(1.03,1.03,1.03);opacity:1;transform:scale3d(1.03,1.03,1.03)}
80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}
to{-webkit-transform:scaleX(1);opacity:1;transform:scaleX(1)}
}

</style>