<template>
			<div class="qq-list clearfix">
				<div class="qq-item">
					<div class="top">
						<div class="pic">
							<img src="~/assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack">图啦啦官方交流群1</div>
							<div class="mt5"><span class="f12 cgray">群号 8556885</span><em>500人</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a href="#" class="btn-join">加入QQ群</a>
					</div>
				</div>
				<div class="qq-item">
					<div class="top">
						<div class="pic">
							<img src="~/assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack">图啦啦官方交流群1</div>
							<div class="mt5"><span class="f12 cgray">群号 8556885</span><em>500人</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a href="#" class="btn-join">加入QQ群</a>
					</div>
				</div>
				<div class="qq-item">
					<div class="top">
						<div class="pic">
							<img src="~/assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack">图啦啦官方交流群1</div>
							<div class="mt5"><span class="f12 cgray">群号 8556885</span><em>500人</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a href="#" class="btn-join">加入QQ群</a>
					</div>
				</div>
				<div class="qq-item">
					<div class="top">
						<div class="pic">
							<img src="~/assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack">图啦啦官方交流群1</div>
							<div class="mt5"><span class="f12 cgray">群号 8556885</span><em>500人</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a href="#" class="btn-join">加入QQ群</a>
					</div>
				</div>
				<div class="qq-item">
					<div class="top">
						<div class="pic">
							<img src="~/assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack">图啦啦官方交流群1</div>
							<div class="mt5"><span class="f12 cgray">群号 8556885</span><em>500人</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a href="#" class="btn-join">加入QQ群</a>
					</div>
				</div>
			</div>
			
</template>
<script>
export default {
  
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
.qq-item{float: left; padding: 25px 30px; width: 280px; border: 1px solid #eee; box-sizing: border-box; background: #fff; margin-right: 16px;margin-bottom: 16px; 
.qq-item:nth-child(4n){margin-right: 0;}
.top{display: flex; height: 48px;}
.pic{width: 60px; height: 48px; overflow: hidden; }
.pic img{width: 100%;}
.name{flex: 1;text-align: right;}
.name em{font-style: normal; line-height: 1; padding: 2px 5px; border: 1px solid #01b3f5; color: #01b3f5; font-size: 12px; margin-left: 3px;}
.btn-join{.btn(100%,40px,#01b3f5,linear-gradient(90deg, 
        #1d92c6 0%, 
        #1683b2 100%),#fff); font-size: 16px;}
}
</style>