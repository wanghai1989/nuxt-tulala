<template>
<div class="task-box">
  <nuxt-link to="/m/public-task" class="publictask">发布<br/>任务</nuxt-link>
  <h3 class="title">全部工单</h3>
	<ul class="ul-task">
    <li   v-for="item in workorder" :key="item.id">
      <div class="work-tit"><b>{{item.name}}</b>   <a href="javascript:void(0)" class="btn-join" @click="downLoad('task')">参与竞价</a></div>
      <div class="vam vam-task">
        <div>
          <div>类别 <strong>{{item.category_name?item.category_name:"--"}}</strong></div>
          <div>预算 <strong>{{item.money}}</strong></div>
        </div>
        <div>
          <div>发布日期 <strong>{{item.status_approved_time?item.status_approved_time:"--"}}</strong></div>
          <div>有效期 <strong>{{item.effective_time}}天</strong></div>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  computed:{
	  ...mapState(['workorder','baseUrl'])
  },
 
   mounted(){  
			this.fetchWorkord()
		},
   methods: {
      ...mapActions({
		  fetchWorkorder:'fetchWorkorder'
      }),
    fetchWorkord:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', 1);
		  formDatas.append('pageSize', 50);
		  formDatas.append('type', 0);
		  formDatas.append('receipt', 0);

		  this.fetchWorkorder(formDatas)
	  },
    downLoad:function(url){
      let _that=this
       let fullpath=this.baseUrl+url
       layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>请移步电脑端参与竞价 </br>网址：'+fullpath+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    _that.copyContent(fullpath);
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                  }
                });
    },
    copyContent(fullpath){ 
		//创建一个input元素
      let input = document.createElement('input') 
      input.value = fullpath
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
.task-box{background: #f2f2f2;  min-height: 100vh; }
.ul-task{padding: 0px 0px 5px;
  li{background: #fff;   padding: 10px 15px;
    margin-bottom: 10px;}
  .btn-join{.btn(100px,32px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff); font-size: 14px; border-radius: 20px;}
  .work-tit{color: var(--color); font-size: 16px; margin-bottom: 15px;font-weight: bold; display: flex;}
  .work-tit b{flex: 1;}
  .vam-task{color: var(--grayColor); line-height: 30px;}
  .vam-task strong{font-size: 16px; color: var(--backColor); font-weight: normal;}
} 
.publictask{position: fixed; right: 15px; top: 42%; display: block; width: 50px; height: 50px;  border-radius: 25px;
text-align: center; background: var(--color);color: #fff; font-size: 12px; line-height: 16px; padding-top: 9px; box-sizing: border-box;}
</style>