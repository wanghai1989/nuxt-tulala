<template>
    <div class="footer">
	  	<div class="friend-link">
	  		<div class="wrapper"> 
					友情链接： 
					<a href="https://588ku.com/" target="_bank">千库网</a>  
					<a href="https://699pic.com/" target="_bank">摄图网</a>  
					<a href="https://www.tukuppt.com/" target="_bank">熊猫办公</a>  
					<a href="https://www.nipic.com/" target="_bank">昵图网</a>  
			</div>
		</div>
			<div class="wrapper">
			  <div class="footer-links clearfix">
				<dl class="col-links">
					<dt><i class="icon i-aboutus"></i> 了解我们</dt> 
					<dd><nuxt-link to="/about/about-us">关于图啦啦</nuxt-link></dd> 
					<dd><nuxt-link to="/about/find-job">招兵买马</nuxt-link></dd>
					<dd><nuxt-link to="/about/handin-hand">牵手图啦</nuxt-link></dd>
				</dl>
				<dl class="col-links">
					<dt><i class="icon i-agreement"></i>服务协议</dt> 
					<dd><nuxt-link to="/enter?#question"> 任务帮助中心</nuxt-link></dd>
					<dd><nuxt-link :to="{ path:'/agreement', query:{id:1}}"> 用户协议</nuxt-link></dd> 
					<dd><nuxt-link :to="{ path:'/agreement', query:{id:2}}"> 版权声明</nuxt-link></dd>
					<dd><nuxt-link :to="{ path:'/agreement', query:{id:5}}"> 常见问题</nuxt-link></dd> 
					
				</dl>
				<dl class="col-links">
					<dt><i class="icon i-map"></i>网站地图</dt> 
					<dd><nuxt-link to="/mall">积分商城</nuxt-link></dd> 
					<dd><nuxt-link to="/task">任务列表</nuxt-link></dd>
					<dd><nuxt-link to="/enter">设计师入驻</nuxt-link></dd> 
				</dl>
				<div class="qrcode">
					<div class="item">
						<img src="~/assets/images/pic01.png"  alt=""/>
						<p>客服微信</p>
					</div>
					<div class="item">
						<img src="~/assets/images/pic02.jpg"   alt="">
						<p>图啦啦公众号</p>
					</div>
					
				</div>
				<div class="col-contact">
					<p class="phone">400-100-5678</p>
					<div class="time">周一至周日 8：30-18:00<br>邮箱:feedback@itulala.com</div>
					<a target="_blank" class="btn btn-onkey">人工客服</a>
					
				</div>
				</div>
				
				<div class="foot-record">
					Copyright © 2021  &nbsp;&nbsp;&nbsp;&nbsp;深圳市辰马互联网技术服务有限公司  <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021149388号</a> <br />
					免责声明：图啦啦所有图片素材资源由用户分享产生，如有侵犯您的权益，请联系我们删除
				</div>
			</div>
		</div>
</template>
<style lang="less" scoped>
.footer{ padding: 0px 0 40px;background: #212427; color: #9fa3a7; margin-top: 55px;
    .friend-link{background: #fff; height: 50px; line-height: 50px;  color: #333;
        a{margin-right: 20px; font-size: 12px; color: #999;}
        a:hover{ text-decoration: underline;}
    }
    .foot-record{font-size: 12px; color: #999; text-align: center; line-height: 26px;
    margin-top: 50px; border-top: 1px solid #3d3f40; padding-top: 15px;}
    .footer-links {padding-top: 40px;
.col-links { float: left; width: 175px; height: 112px; margin: 0; }
 .col-links dt { margin: -1px 0 10px; font-size: 18px; color: #fff; }
  .col-links dd { margin: 5px 0 0 35px; }
  .col-links dd a:hover{color:#e81324; }
  dd a:hover{color:#e81324; }
   .i-aboutus{width: 20px; height: 20px; background-position: -638px -4px; margin-right: 6px;}
.i-agreement{width: 20px; height: 20px; background-position: -669px -6px; margin-right: 6px;}
 .i-map{width: 20px; height: 20px; background-position: -605px -5px; margin-right: 6px;}
.col-contact{float: left; width: 295px;  text-align: right;}

.phone{font-size: 24px; color: #fff; }
 .btn-onkey{width: 171px; height: 36px;line-height: 34px; border: 1px solid var(--colorMbsc); background: var(--colorMbsc); color: #fff; margin-top: 15px;}
 .time{margin-top: 10px; font-size: 12px; list-style: 20px;}
.qrcode{width: 300px; float: left; margin: 0px 40px;
 .item{width: 100px; display: inline-block; margin: 0px 20px; text-align: center;}
    .item img{width: 100%;}
}
}
}
</style>