<template>
<div>
   <Noitce></Noitce>
</div>
</template>

<script>
import Noitce from '~/components/active/noitce.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {Noitce}

}
</script>