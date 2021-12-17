<template>
    <footer class="navbar-fixed-bottom clearfix">
			<div class="col-4 file focus">
			<router-link to="/m/product-list/1">
				<h3><i class="iconfont">&#xe603;</i>作品</h3>
			</router-link>
		</div>
		<div class="col-4 task ">
			<router-link to="/m/mobile-task">
			<h3><i class="iconfont">&#xe656;</i>任务</h3>
			</router-link>
		</div>
		<div class="col-4 mine ">
			<router-link to="/m/mobile-mine">
			<h3><i class="iconfont">&#xe601;</i>我的</h3>
			</router-link>
		</div>
	</footer>
</template>
<style lang="less" scoped>
.bg-map(@width:25px,@height:25px,@x:0px,@y:0px){
        display: inline-block;
        vertical-align: middle;
        width: @width;
        height: @height;
        position: relative;
        background: url(../../assets/images/bg-ico.png) no-repeat @x @y;
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
.navbar-fixed-bottom {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    z-index: 1;
}
.navbar-fixed-bottom h3 {
    text-align: center;
    line-height: 1;
    padding: .1rem 0rem;
    font-size: .14rem;
}
.navbar-fixed-bottom > div a h3 {
    color: var(--grayColor);
}
.navbar-fixed-bottom > div a h3 i{font-size: 24px; line-height: 1; color: #888888;display: block !important; margin: 0 auto 6px;}
.navbar-fixed-bottom > div a.active-link h3 {
    color: var(--color);
}
.navbar-fixed-bottom > div a.active-link h3 i{font-size: 24px; line-height: 1; color: var(--color)}
</style>