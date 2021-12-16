<template>
    <div class="footer-login">
			<div class="maplink">
				<router-link to="/about/about-us">关于图啦啦</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link to="/about/handin-hand">牵手图啦</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link :to="{ path:'/agreement', query:{id:5}}">常见问题</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link to="/task">招兵买马</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link to="/integral-mall">任务列表</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link to="/enter">设计师入驻</router-link>
			</div>
			<div class="copyright">
				Copyright © 2021 91tula.com All Rights Reserved　版权所有·深圳市辰马互联网技术服务有限公司  <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021149388号</a> 
			</div>
		</div>
</template>
<style lang="less" scoped>
.footer-login{
    padding: 30px 0px;
    .maplink{text-align: center;}
    .maplink a{color: #666; font-size: 14px;}
    .maplink a:hover{text-decoration: underline;}
    .copyright{color: #666; font-size: 14px; margin-top: 10px; text-align: center;}
}

</style>