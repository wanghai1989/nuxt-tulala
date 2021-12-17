<template>
    <div class="related-material">
		<div class="theme-title">相关素材</div>
         <materialInfo></materialInfo>
	</div>
</template>
<script>
import materialInfo from '~/components/product/material-info'
export default {
 components: {materialInfo}
}
</script>
<style lang="less" scoped>

.related-material{margin-top: 50px;}

</style>