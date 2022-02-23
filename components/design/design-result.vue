<template>
    <div class="step-cont"> 
        <div v-if="designcode=='101'">
	  		<div class="result-img">
                <img src="../../assets/images/pic29.png" />
            </div>
            <div class="result-tit">您的申请已受理</div>
            <div class="result-subtit">非常荣幸收到您的入驻申请，审核人员将在1-2个工作日完成审核</div>
            <div class="result-operat">
            	<nuxt-link to="/">返回首页</nuxt-link>
            </div>
        </div>
        <div v-if="designcode=='102'">
	  		<div class="result-img">
                <img src="../../assets/images/pic28.png" />
            </div>
            <div class="result-tit">您的申请已通过</div>
            <div class="result-subtit">恭喜您成为图啦啦设计师团队的一员，您可以去上传您的作品啦</div>
            <div class="result-operat">
                <nuxt-link class="home" to="/">返回首页</nuxt-link>
                <nuxt-link to="/mine/upload-file">上传作品</nuxt-link>
            </div>
        </div>
        <div v-if="designcode=='103'">
	  		<div class="result-img">
                <img src="../../assets/images/pic30.png" />
            </div>
            <div class="result-tit">您的申请被拒绝</div>
            <div class="result-subtit">非常抱歉您的申请未能通过，您可以尝试重新提交您的作品再次申请</div>
            <div class="result-operat">
                <nuxt-link to="/enter/design-egg">重新提交作品</nuxt-link>
            </div>
        </div>
	  </div>
</template>
<script>
import { mapState,mapActions} from 'vuex'
export default {
  data () {
    return {
      // designer_status: ''
    }
  },
  computed:{
      ...mapState(['personInfo','designcode','userToken'])
  },
 mounted(){
     this.fetchStatus()
  },
  methods: {
    ...mapActions({
        fetchDesignerStatus: 'fetchDesignerStatus'

     }),
  fetchStatus:function(){
      let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
          this.fetchDesignerStatus(formDatas)
  }
 }
}
</script>
<style lang="less" scoped>
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
    height: @height;
    line-height: calc(@height - 2px); 
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
.step-cont{padding: 50px 0px;}
   .result-img{text-align: center; }
//    .result-img img{width: 230px;}
   .result-tit{font-size: 28px; color: var(--backColor); text-align: center; margin-top: 40px; font-weight: bold;}
   .result-subtit{font-size: 18px; color: var(--grayColor); text-align: center; margin-top: 5px;}
   .result-operat{text-align: center; margin-top: 60px;}
   .result-operat a{.btn(214px,49px,#d0d0d0,transparent,var(--backColor));}
   .result-operat a.home{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
   .result-operat a:hover{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
</style>