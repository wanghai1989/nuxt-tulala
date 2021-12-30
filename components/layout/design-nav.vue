<template>
<ul class="design-nav clearfix">
	  	<li><nuxt-link to="/enter">入驻图啦啦</nuxt-link></li>
	  	<li><nuxt-link to="/designer">设计师</nuxt-link> </li>
	  	<li><nuxt-link to="/task">外包任务</nuxt-link> </li>
	  </ul>
</template>

<style lang="less" scoped>
.design-nav{margin-top: 25px; text-align: right;
 li{display: inline-block;}
 li a{padding: 0 20px; color: #333; font-size: 18px; }
 li a.nuxt-link-active, li a:hover{padding: 0 20px; color: #e60012; font-size: 18px; }
}
</style>