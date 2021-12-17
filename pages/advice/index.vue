<template>
<div>
    <webBanner position='submit_suggestions'></webBanner>
    <div class="wrapper">
      <adviceForm></adviceForm>
      <adviceList></adviceList>
    </div>
</div>
</template>

<script>
import webBanner from '~/components/layout/web-banner.vue'
import adviceForm from '~/components/advice/advice-form.vue'
import adviceList from '~/components/advice/advice-list.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {adviceForm,adviceList,webBanner}

}
</script>