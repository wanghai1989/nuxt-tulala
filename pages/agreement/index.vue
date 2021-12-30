<template>
<div>
    <div class="wrapper">
      <Contract></Contract>
    </div>
</div>
</template>

<script>
import Contract from '~/components/active/contract.vue'
export default {
   layout: 'web',
   components: {Contract},
  head(){
	   return {
			title:'协议-图啦啦91tula.com'
			}
  },
}
</script>