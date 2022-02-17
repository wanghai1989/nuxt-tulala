<template>
    <div id="center_ad" class="center_adallvip center_ad" v-if="showLayer==1">
      <div class="box animated bounceIn">
        <nuxt-link to="/enter"  target="_blank" class="link img-box">
               <span class="receive">强势入驻</span>
        </nuxt-link>
      <em class="close iconfont icon-close"  @click="close()"></em>
      </div>
      </div>
</template>
<script>
export default {
  mounted() {
		this.setlayer()
	   
  },
  data () {
    return {
      showLayer:0
    }
  },
  methods: {
    close(){
    this.showLayer=0
    this.setCookie("loanName","loan")
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
.center_ad .box {
    z-index: 9999;
    position: absolute;
    width: 560px;
    height: 560px;
    top: 50%;
    left: 50%;
    margin: -280px 0 0 -280px;
    background: url(~/assets/images/pic51.png)no-repeat center /100%;
}

.center_ad .box .img-box {
    display: block;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}
.center_ad .box .img-box .receive{height: 42px; line-height: 42px; width: 200px; display: block; position: absolute; bottom: 30px; left: 181px; 
background-image: linear-gradient(#ffc44f, #ffe791); text-align: center; color: #ec0b49; font-size: 20px;  border-radius: 24px;
    animation: scaleDraw 3s linear infinite;
}
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

 @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
            0%{
                transform: scale(1);  /*开始为原始大小*/
            }
            25%{
                transform: scale(1.1); /*放大1.1倍*/
            }
            50%{
                transform: scale(1);
            }
            75%{
                transform: scale(1.1);
            }
        }
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