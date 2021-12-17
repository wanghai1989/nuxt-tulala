<template>
<div>

<ul class="advice-list" v-if="advices.length>0">
	
	   	 <li  v-for="item in advices" :key="item.id">
	   	 	<div class="pic">
	   	 		<img :src="item.avatar" />
	   	 	</div>
	   	 	<div class="info">
	   	 		<div class="cred f18">{{item.nickname}}</div>
	   	 		<div class="f12 cgray">发布时间：{{item.created_at}}</div>
	   	 		<div class="mt15 cblack">建议：{{item.content}}</div>
	   	 		<div class="reply">
	   	 			<div class="official-pic">
	   	 				<img src="~/assets/images/pic23.png" />
	   	 			</div>
	   	 			<div class="official-info">
	   	 				<div class="cgray">图啦啦回复</div>
	   	 				<div class="cblack mt5">{{item.reply}}</div>
	   	 			</div>
	   	 		</div>
	   	 	</div>
	   	 </li>
	   </ul>
	   <div class="noadvice" v-else>
	<div class="nodata" >
				<img src="~/assets/images/pic32.png" />
				<p>还没有人提交建议哦！！</p>
			</div>
   </div>	
	    <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
	
</div>
</template>
<script>
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {MoPaging},

  data () {
    return {
    }
  },
  mounted(){  
			// import('layui-layer')
			// this.userInfo=JSON.parse(window.localStorage.getItem("userInfo"))
			this.fetchAdvic()
		},
		
 computed:{
	  ...mapState(['page','pageSize','countfile','advices'])
  },
  methods:{
 ...mapActions({
		  fetchAdvices:'fetchAdvices'
      }),
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchEvaluat()
            },
fetchAdvic:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);

		  this.fetchAdvices(formDatas)
	  }
}
}

	 
</script>
<style lang="less" scoped>
.advice-list{margin-top: 25px;
li{border-bottom: 1px solid #d4d4d4; background: #fff; padding: 35px 40px 35px; display: flex;}
.pic,.official-pic{width: 45px; height: 45px; border-radius: 25px; margin-right: 15px; text-align: center; overflow: hidden; background: #f1f1f1;}
.pic img,.official-pic img{max-width: 100%;}
.info,.official-info{flex: 1;}
.reply{display: flex; margin-top: 35px;}
}
.noadvice{padding: 50px 0; background: #fff; margin-top: 25px;}
</style>