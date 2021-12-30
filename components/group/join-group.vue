<template>
<div class="qq-tips">
				<div class="title jrlm"><i></i> 加入联盟</div>
				<div class="vam vip-info">
	  				<div>
	  					<div class="l"><span class="cred">*</span>群号码</div>
	  					<div class="r">
	  						<input class="input" type="text">
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>群主QQ</div>
	  					<div class="r">
	  						<input class="input" type="text">
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>群人数</div>
	  					<div class="r">
	  						<select class="select">
	  							<option value="0">请选择</option>
	  							<option value="1">0-500</option>
	  							<option value="2">0-1000</option>
	  						</select>
	  					</div>
	  				</div>
	  				
	  				<div>
	  					<div></div>
	  					<div class="r"><a class="btn-enter" href="enter-egg.html">提交</a> </div>
	  				</div>
	  				
	  		</div>
			</div>
</template>

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
.qq-tips{border: solid 1px #eeeeee; background-color: #fafafa; padding: 30px 30px; margin-top: 15px;
 .title{font-size: 16px; color: var(--backColor);}
  .vip-info {margin: 30px auto 0; width: 820px;}
  .vip-info .l{color: var(--backColor); text-align: right; width: 185px;}
  .vip-info .r{padding: 10px 0px 10px 12px; }
  .input,.select{width: 400px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
  .btn-enter{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 4px; margin-top: 30px;}
}
</style>