<template>
<div class="m-container">
   <Login></Login>
</div>
</template>
<script>
import Login from '~/components/mobile/login.vue'
export default {
components: {Login},
head(){
	   return {
			title:'用户登录-图啦啦91tula.com'
			}
  }
}
</script>
