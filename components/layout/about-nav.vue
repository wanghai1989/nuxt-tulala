<template>
 <div class="about-nav">
			<ul class="wrapper clearfix">
				<li><nuxt-link to="/about/about-us">关于我们</nuxt-link></li>
				<li><nuxt-link to="/about/link-us">联系我们</nuxt-link></li>
				<li><nuxt-link to="/about/find-job">公司招聘</nuxt-link></li>
				<li><nuxt-link to="/about/enterprise-team">企业团队</nuxt-link></li>
			  <li><nuxt-link to="/about/handin-hand">牵手图啦</nuxt-link></li>
			  <li><nuxt-link to="/about/qq-group">qq联盟</nuxt-link></li>
			</ul>
		</div>
</template>
<style lang="less" scoped>
.about-nav{height: 80px; background: #fff;  box-shadow: 0px 3px 8px 0px rgba(92, 92, 92, 0.2);
ul li{height: 80px; width: 112px; text-align: center; float: left; margin: 0px 10px;}
ul li a{display: block; height: 80px; line-height: 80px; border-bottom: 3px solid transparent; color: #333; box-sizing: border-box; font-size: 16px;}
ul li.focus a,ul li a:hover,ul li a.nuxt-link-exact-active{color: var(--color);  border-bottom: 3px solid var(--color);}
}
</style>

