<template>
<div class="good-contain">
			<div class="vam vam-good">
				<div class="title">
					<div>商品</div>
					<div>价格</div>
					<div>数量</div>
					<div>下单时间</div>
					<div>状态</div>
				</div> 
				<div  v-for="item in goodorder" :key="item.id">
					<div>
						<div class="goodname">
						<img :src="item.detail[0].goods_image" />
						<p>
							<span class="cgray">订单编号：<span class="cblack">{{item.order_sn}}</span> </span><br />
							<span class="cblack fw">{{item.detail[0].goods_name}}</span> 
							
							</p>
						</div>
					</div>
					<div>{{item.integral}}积分</div>
					<div>{{item.detail[0].num}}</div>
					<div>{{item.created_at}}</div>
					<div class="tc">
					    <a href="javascript:;" class="btn-sure" @click="confirmReceip(item.order_sn)" v-if="item.status==20">确认收货</a>
						<a href="javascript:;" class="btn-sure disabled"  v-if="item.status==40">已收货</a>
					</div>
				</div>
		</div>
		<div class="nodata" v-if="goodorder.length==0">
				<img src="~/assets/images/pic32.png" />
				<p>暂无订单</p>
			</div>
		 <MoPaging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </MoPaging>
</div>
</template>
<script>
import {
    mapState,mapActions
} from 'vuex'
import MoPaging  from '~/components/layout/web-pagination.vue'
export default {
    data(){
	return { 
		page:1
  }
  },
  components: {MoPaging},
  computed:{
	  ...mapState(['goodorder','pageSize','countfile','userToken'])
  },
  mounted(){  
	//   import('layui-layer')
	  	this.goodOrderlist()  //商品列表
  },
  methods:{ //页面进来发送请求
	 ...mapActions({
          getGoodorder: 'getGoodorder',
		  confirmReceipt:'confirmReceipt'
      }),
     //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.goodOrderlist()
            },
	  goodOrderlist:function(){
		  let params={
				page: this.page,
				pageSize:this.pageSize,  //一页显示数量
				token:this.userToken
			}
			 this.getGoodorder(params)
	  },
	  confirmReceip:function(order_sn){
		  let formDatas = new FormData();
		    formDatas.append('token', this.userToken);	  
			formDatas.append('order_sn', order_sn);
			this.confirmReceipt(formDatas).then((data) => { 
					if(data.code==1){
						this.goodOrderlist()  //商品列表
						layer.msg('收货成功', {icon: 1});
					}
			})
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
.good-contain{padding: 40px 40px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
 .vam-good{width: 100%;}
 .vam-good>div>div{border-bottom: 1px solid var(--border); padding: 15px 15px;}
 .vam-good .title>div{font-size: 16px; color: var(--backColor);}
 .goodname{display: flex; color: var(--backColor);    align-items: center;}
 .goodname img{max-width:80px ; max-height: 80px;}
 .goodname p{margin-left: 10px;}
 .vam-good .btn-sure{.btn(100px,30px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); height: 32px; font-size: 14px;}
 .vam-good .btn-sure.disabled{background: #ddd; border: 1px solid #ddd;}
}
</style>