<template>
<div>
<div class="order-info">
		<div class="f18 cblack mt25">确认订单信息</div>
		<h3 class="title mt15">收货人信息</h3>
		<ul class="ul-address clearfix">
			<li>
				<div class="title">
					<span> 张三</span><span class="tr">15919483122</span>
				</div>
				<div class="cont">
					<div class="cblack">
						广东省 深圳市 福田区 车公庙NEO大厦B栋3202
					</div>
					<div class="oprate">
						<span class="oprate01">
							<i class="icon"></i>设为默认
						</span>
						<span class="oprate02">
							<i class="icon"></i>编辑
						</span>
						<span class="oprate03">
							<i class="icon"></i>删除
						</span>
					</div>
				</div>
			</li>
			<li>
				<div class="title">
					<span> 张三</span><span class="tr">15919483122</span>
				</div>
				<div class="cont">
					<div class="cblack">
						广东省 深圳市 福田区 车公庙NEO大厦B栋3202
					</div>
					<div class="oprate">
						<span class="oprate01">
							<i class="icon"></i>设为默认
						</span>
						<span class="oprate02">
							<i class="icon"></i>编辑
						</span>
						<span class="oprate03">
							<i class="icon"></i>删除
						</span>
					</div>
				</div>
			</li>
			<li class="add">
				<i></i><div class="f18 cblack mt10">添加地址</div>
			</li>
		</ul>
		<h3 class="title mt25">商品信息</h3>
		<div class="vam order-vam">
			<div class="title">
				<div class="d1">图片</div>
				<div class="d2">商品名称</div>
				<div class="d3">数量</div>
				<div class="d4">运费(元)</div>
				<div class="d5">价格(元)</div>
				<div class="d6"></div>
			</div>
			<div>
				<div class="d1"> <img src="~/assets/images/pic13.png" /> </div>
				<div class="d2">
					<div class="cblack">iPhone 11</div>
					<div class="cgray">128GB 绿色 移动联通电信4G手机 双卡双待</div>
				</div>
				<div class="d3"> 1 </div>
				<div class="d4"><span class="cred">0.00</span>  </div>
				<div class="d5"><span class="cred">7 积分</span>  </div>
				<div class="d6"> <a href="#">删除</a> </div>
			</div>
			
		</div>
		<div class="tr mt10">
			<a href="#" class="btn-exchange">立即兑换</a>
		</div>
		
	     </div>
</div>
</template>
<script>
export default {

  
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
.order-info{
    h3.title {
    border: 1px solid #e7e7e7;
    color:var(--redColor);
    font-size: 18px;
    border-left: 4px solid var(--redColor);
    background: #fff;
    text-indent: 10px;
    height: 36px;
    line-height: 34px;
}
.order-vam{width: 100%;  text-align: center; background: #fff;
.title{height: 48px; line-height: 48px; background: #f2f2f2;}
.d1{width: 115px;}
.d1 img{width: 70px; height: 70px;}
.d2{width: 430px; text-align: left;}
.d3{width: 160px;}
.d4{width: 160px;}
.d5{width: 160px;}
}
.order-vam>div>div{border-bottom: 1px solid #e6e7e7; padding: 20px 0px;}
.btn-exchange{
    .btn(137px,48px,transparent,transparent,#fff); background: #d5001b;
}
}
.ul-address{margin-top: 20px;
   li{width: 280px; height: 200px; float: left; margin-right: 30px; border: 1px solid #ececec; margin-bottom: 30px;} 
   li:nth-child(3n){margin-right: 0px;}
   .title{height: 40px; line-height: 40px; border-bottom: 1px solid #ececec; display: flex;padding: 0px 15px;background: #f0f0f1;}
   .title span{flex: 1; color: var(--backColor); font-size: 18px;  }
   .cont{padding: 15px 15px; background: #fff; position: relative; height: 158px;}
   .oprate{position: absolute; bottom: 15px; left: 0; width: 100%; display: flex; padding: 0px 15px;}
   .oprate .oprate01{flex: 2;}
   .oprate .oprate02,.oprate .oprate03{flex: 1;}
   .oprate .oprate01 i{.bg-map(16px,16px,-815px, -42px);  margin-right: 4px; margin-top: -2px;}
   .oprate .oprate01 i.focus{.bg-map(16px,16px,-815px, -68px); margin-right: 4px; margin-top: -2px;}
   .oprate .oprate02 i{.bg-map(16px,16px,-844px, -43px); margin-right: 4px; margin-top: -2px;}
   .oprate .oprate03 i{.bg-map(16px,16px,-843px, -68px); margin-right: 4px; margin-top: -2px;}
   li.add{width: 162px; background: #fff; padding-top: 70px; text-align: center;    height: 230px;
    box-sizing: border-box;}
   li.add i{.bg-map(46px,46px,-870px, -43px);}
}
</style>