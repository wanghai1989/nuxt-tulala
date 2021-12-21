<template>
<div class="detail-box">
	<div class="detail-img">
    <div class="prod-name">
      {{productinfo.name}}
    </div>
    <div class="prod-img">
      <img :src="productinfo.detail_img_path" />
    </div>
    
  </div>

  <div class="detail-txt">
    <div class="title">
      作品详情
    </div>
    <div class="vam">
        <div>
          <div>作者 {{productinfo.nickname}}</div>
          <div>像素 {{productinfo.img_dpi}}</div>
        </div>
        <div>
          <div>格式 {{productinfo.file_formats}}</div>
          <div>上传时间 {{productinfo.created_at}}</div>
        </div>
    </div>
  </div>

  <div class="details-bottom">
      <router-link :to="{ name: 'm-material-id', params:{id: productinfo.category_id }}" class="bottom-l">返回列表</router-link>
     <a href="javascript:void(0)" class="bottom-r" @click="downLoad()">下载</a>
  </div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
	data () {
    return {
		
    }
  },
  created(){
  },
 mounted(){  
	  // import('layui-layer')
    // console.log(this.$route.params.id)
			this.fetchProdinfo(this.$route.params.id)
		},

	computed:{
	  ...mapState(['productinfo','baseUrl'])
  },
	methods:{
    ...mapActions({
		  fetchProductinfo:'fetchProductinfo'
      }),
		fetchProdinfo:function(id){
		  let formDatas = new FormData();
		  formDatas.append('id', id);
		  this.fetchProductinfo(formDatas)
	  },
    downLoad:function(){
      let _that=this
      layer.msg('请移步电脑端下载', {icon: 1});
       var index = layer.open({
                title: ['温馨提示', 'color:#fff; background: #34bc76;'],//数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                content: '<div>请移步电脑端下载 </br>网址：'+this.baseUrl+'</div>',
                btn: ['复制'],
                yes: function(index, layero){
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                    _that.copyContent()
                  }
                });
    },
    copyContent(){ 
		//创建一个input元素
      let input = document.createElement('input') 
      //给input的内容复制
      input.value =this.baseUrl
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
.m-container{display: block;}
.detail-box{padding-bottom: 70px;}
.detail-img{padding: 0px; background: #fff; 
.prod-img{display: grid;}
 .prod-img img{width: 100%;}
 .prod-name{font-size: 18px; color: var(--backColor); font-weight: bold; text-indent: 15px; height: 60px; line-height: 60px;}
}
.detail-txt{margin-top: 10px; padding: 15px 15px; background: #fff;
.title{color: var(--backColor); margin-bottom: 10px; font-size: 15px; font-weight: bold;}
.vam{line-height: 25px;}
}
.details-bottom{position: fixed; bottom: 0; left: 0; width: 100%; height: 60px; background: #fff; display: flex;
.bottom-l{flex: 1; background: var(--color); color: #fff; font-size: 16px; line-height: 60px; text-align: center;}
.bottom-r{flex: 1; background: var(--redColor); color: #fff; font-size: 16px; line-height: 60px; text-align: center;}
}
.layui-layer-btn .layui-layer-btn0{border-color: var(--color) !important;background-color:  var(--color)  !important; font-size: 14px;}
</style>