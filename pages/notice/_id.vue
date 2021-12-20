<template>
<div class="wrapper newinfo">
			<div class="new-top">
				<div class="top-l">
				<h3 class="title"> {{noticedetail.title}} </h3>
				<div class="subtit">发布时间： {{noticedetail.created_at}}</div>
				</div>
				<div class="top-r">
					 <router-link to="/notice"  class="btn-back">返回</router-link>
				</div>
			</div>
			<div class="new-txt" v-html="noticedetail.content">
			</div>
	  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   metaInfo: {
    title: '公告详情-图啦啦91tula.com',
    meta: [
              {
                  name: "keywords",
                  content:'图啦啦，图啦消息，图啦公告，图啦素材，图啦啦工单'
              }, {
                  name: "description",
                  content:'会员关注图啦啦消息，图啦咨询尽在掌握！！'
              }
          ]
  },
  data () {
    return {
	 userInfo:{}
    }
  },
  mounted(){  
			this.fetchNoticeDe(this.$route.params.id)
		},
		
 computed:{
	  ...mapState(['noticedetail'])
  },
  methods:{
 ...mapActions({
		  fetchNoticeDetail:'fetchNoticeDetail'
      }),

fetchNoticeDe:function(id){
		  let formDatas = new FormData();
		  formDatas.append('id', id);
		  this.fetchNoticeDetail(formDatas)
	  }
}
}
</script>
<style lang="less" scoped>
.btn(@width,@height,@bordercolor,@background,@color){
    display: inline-block;
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
.newinfo{margin-top: 30px; background: #fff; padding: 20px 40px; min-height: 600px;
.new-list li{padding: 30px 0px; display: flex; border-bottom: 1px solid  rgba(0, 0, 0, 0.05);}
.new-list li a{flex: 1; color: var(--backColor); }
.new-list li a:hover{color: var(--color);}
.new-list li em{font-size: 12px; color: var(--grayColor);}
.new-top{display: flex;align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--border);}
.new-top .top-l{flex: 1;}
.new-top .title{font-size: 24px; color: var(--backColor); margin: 10px 0px 30px;}
.new-top .subtit{font-size: 12px; color: var(--grayColor);}
.new-top .btn-back{.btn(100px,30px,var(--color),transparent,var(--color));}
.new-top .btn-back:hover{background: var(--color); color: #fff;}
.new-txt{text-align: center; margin-top: 30px;}
}

</style>