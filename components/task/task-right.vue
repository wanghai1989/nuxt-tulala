<template>
<div class="task-r">
                <router-link  class="btn-public"  to="/task/public">免费发布任务</router-link>
		 		<div class="cblack mt15 fw">关于雇主</div>
		 		<div class="mt10">已发布过<span class="cblack fw"> {{personInfo.work_order_count}}</span> 个任务 <br/>注册时间<span class="cblack fw"> {{personInfo.created_at}}</span> </div>
		 		<div class="newtask">
		 			<div class="title">最新任务</div>
		 			<ul class="ul-list mt10">
		 				<li v-for="item in workorder" :key="item.id"><router-link  :to="{ name: 'task-id', params:{ id: item.id }}" >{{item.name}}</router-link> </li>
		 			</ul>
		 		</div>
		 	</div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
	 userInfo:{}
    }
  },
  mounted(){  
			this.fetchWorkord()
		},
		
 computed:{
	  ...mapState(['page','pageSize','workorder','personInfo'])
  },
  methods:{
 ...mapActions({
		  fetchWorkorder:'fetchWorkorder'
      }),
fetchWorkord:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', 1);
		  formDatas.append('pageSize', 8);

		  this.fetchWorkorder(formDatas)
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
.task-r{float: left; width: 280px; padding: 20px 15px; box-sizing: border-box; background: #fff; border-top: 5px solid var(--redColor);
    .btn-public{.btn(100%,42px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff);}
    .newtask{padding-top: 20px; border-top: 1px solid #d4d4d4;    margin-top: 15px;}
    .title{color: var(--backColor);font-weight: bold; }
    li {height: 25px; line-height: 25px;}
    li a{color: var(--color); font-size: 15px;  }
    li a:hover{text-decoration: underline;}
    }
</style>