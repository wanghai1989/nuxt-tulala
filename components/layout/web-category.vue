<template>
<div class="direction">
<a href="javascript:;" @click="categoryClick(item.id)" :class="{focus:item.id==isFocus}"  v-for="item in category"  :value="item.id" :key="item.id">{{item.name}}</a>
</div>
</template>
<script>
import {
mapState,mapActions
} from 'vuex'
export default {
  data () {
      return {
      	isActive:1
      }
    },
    computed:{
      ...mapState(['category'])
      // ...mapState(['navigation'])
  },
    methods: {
    	...mapActions({
        fetchCategory: 'fetchCategory'
     }),
    	categoryClick: function (index) {
                    this.isFocus = index
                }
    },
    asyncData ({ store,route}) {
      return store.dispatch('fetchCategory')
  }
}
</script>
<style lang="less">
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
   line-height: calc(@height - 2px); 
    line-height: @height;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    width: @width;
    border: 1px solid @bordercolor;
    background: @background;
    color: @color;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
}
.direction a{.btn(120px,42px,#d0d0d0,transparent,#333);}
.direction a.focus,direction a:hover{border: 1px solid var(--color); color: var(--color);}
</style>