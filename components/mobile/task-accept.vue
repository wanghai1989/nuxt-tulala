<template>
<div class="task-box">
  <h3 class="title">我的接单</h3>
	<ul class="ul-task">
    <li   v-for="item in worklist" :key="item.id">
      <div class="work-tit">
        <b>{{item.name}}<br/><em class="">工单编号&nbsp;{{item.order_sn}}</em> </b>   
      <button class="btn-join" :disabled="[1,4,5,6,8].includes(item.status)" @click="downLoad('person/my-works')">{{publicStateName[item.status]}}</button></div>
      <div class="vam vam-task">
        <div>
          <div>发布时间 <strong>{{publicTime(item.status_approved_time)}}</strong></div>
          <div>设计师 <strong>{{item.design_nickname?item.design_nickname:'暂未雇佣'}}</strong></div>
        </div>
        <div>
          <div>手机号 <strong>{{item.mobile}}</strong></div>
          <div>预算 <strong>{{item.money}}</strong></div>
        </div>
      </div>
    </li>
  </ul>
  <div class="nodata" v-if="worklist.length==0">
				<img src="~/assets/images/pic32.png" />
				<p>暂无工单</p>
			</div>
</div>
</template>
<script>
import common from '~/assets/js/common'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data () {
    return {
		page:1,
		QRCodeMsg:'',
		show_pay:0,
		workid:'',
    }
  },
  computed:{
	  ...mapState(['pageSize','countfile','worklist','userToken','publicStateName','baseUrl'])
  },
 
   mounted(){  
			this.fetchWork()
		},
   methods: {
      ...mapActions({
		  fetchWorklist:'fetchWorklist'
      }),
      publicTime:function(time){
      return common.getDateDiff(time)
    },
    fetchWork:function(){
		  let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  formDatas.append('type', 2);  // 1我的发布  2我的接单
		  this.fetchWorklist(formDatas)
	  },
    downLoad:function(url){
      let _that=this
       let fullpath=this.baseUrl+url
       layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div style="color:#333333"><div style="color:#999999">请移步电脑端操作</div>网址：'+fullpath+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    _that.copyContent(url);
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
    },
    copyContent(url){ 
		//创建一个input元素
      let input = document.createElement('input') 
      //给input的内容复制
      let invitelink=this.baseUrl+url
      input.value = invitelink
      // 在body里面插入这个元素
      document.body.appendChild(input)   
      // 选中input里面内容
      input.select()  
      //执行document里面的复制方法
      document.execCommand("Copy") 
      // 复制之后移除这个元素
      document.body.removeChild(input)

	  layer.msg('已复制成功哦~', {icon: 1});
	  
    }
   }
}

</script>
<style lang="less" scoped>
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(~/assets/images/bg-ico.png) no-repeat @x @y;
        cursor: pointer;
}
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
h3.title{color: var(--backColor); font-size: 18px; height: 50px; line-height: 50px; padding: 0px 15px;}
.task-box{background: #f2f2f2; min-height: 100vh;}
.ul-task{padding: 0px 0px 5px;
  li{background: #fff;  padding: 10px 15px; margin-bottom: 10px;}
  .btn-join{.btn(100px,32px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); font-size: 14px; border-radius: 20px;}
  .btn-join[disabled]{background: #bbb; border: 1px solid #bbb;}
  .work-tit{color: var(--color); font-size: 16px; margin-bottom: 15px;font-weight: bold; display: flex;}
  .work-tit b{flex: 1;}
  .work-tit b em{font-size: 12px;color: var(--grayColor);font-weight: normal;}
  .vam-task{color: var(--grayColor); line-height: 30px;}
  .vam-task strong{font-size: 16px; color: var(--backColor); font-weight: normal;}
} 
</style>