<template>
<div>
    <div class="wrapper">
      <Contract></Contract>
    </div>
</div>
</template>

<script>
import Contract from '~/components/active/contract.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {Contract}

}
</script>