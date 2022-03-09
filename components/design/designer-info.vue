<template>
<div class="desig-l">
	 <div id="designRule" class="vam vam-rule" style="display:none">
		 <div class="title">
			 <div>晋级方式</div>
			 <div>设计师</div>
			 <div>资深设计师</div>
			 <div>设计指导</div>
		 </div>
		 <div>
			 <div>作品总数</div>
			 <div>10</div>
			 <div>85</div>
			 <div>160</div>
		 </div>
		 <div>
			 <div>优秀作品</div>
			 <div>5</div>
			 <div>25</div>
			 <div>45</div>
		 </div>
		 <div>
			 <div>主推</div>
			 <div>3</div>
			 <div>5</div>
			 <div>4</div>
		 </div>
	 </div>
	  		<div class="pic">
	  			<img :src="designinfo.designer_img" v-if="designinfo.designer_img" />
                <img src='~/assets/images/defaultVip.png' v-else /> 
	  		</div>
	  		<div class="f20 cblack">
	  			{{designinfo.identity_card_name}}
	  		</div>
{{designinfo}}
	  		<div class="cgray">{{designlevel[designinfo.designer_level]}}<i class="i-tip" @click="designRule()"></i> </div>
			  <div class="design-target" v-if="designinfo.designer_target">
				  <a href="javascript:void(0)"  v-for="(item,index) in splitTarget(designinfo.designer_target)" :key="index" >{{item}}</a>
			  </div>
			  <div class="mt5">
			<!-- <a href="#" class="btn-attention">关注 8</a> -->
	  		<a href="javascript:void(0)" class="btn-entrust" @click="entrust()">委托设计</a>
			  </div>
	  		<div class="vam vam-person">
				<div>
	  				<div class="vam-l">个人资料</div>
	  				<div class="vam-r">
						  <i class="i-certi" title="已完善" v-if="designinfo.is_complete_my_info"></i>
						  <i class="i-certi no" title="未完善" v-else></i>
					</div>
	  			</div>
	  			<div>
	  				<div class="vam-l">实名认证</div>
	  				<div class="vam-r">
						<i class="i-certi" title="已认证" v-if="designinfo.certification"></i> 
						<i class="i-certi no"  title="未认证" v-else></i> 
					</div>
	  			</div>
	  			<div>
	  				<div class="vam-l">手机认证</div>
	  				<div class="vam-r">
						<i class="i-certi"  title="已认证" v-if="designinfo.is_binding_mobile"></i>
						<i class="i-certi no"  title="未认证" v-else></i>
					</div>
	  			</div>
	  			<!-- <div>
	  				<div class="vam-l">设计师级别</div>
	  				<div class="vam-r">{{designlevel[designinfo.designer_level]}}<i class="i-tip" @click="designRule()"></i> </div>
	  			</div> -->
	  			<div>
	  				<div class="vam-l">上传作品数</div>
	  				<div class="vam-r">{{designinfo.products_count}}</div>
	  			</div>
	  			<div>
	  				<div class="vam-l">累计下载数</div>
	  				<div class="vam-r">{{designinfo.download_counts}}</div>
	  			</div>
	  			<div>
	  				<div class="vam-l">累计收藏数</div>
	  				<div class="vam-r">{{designinfo.collect_counts}}</div>
	  			</div>
	  		</div>
	  		<div class="person-evaluate">
	  			{{designinfo.introduction?designinfo.introduction:'主人太懒了，什么都没留下！！！'}}
	  		</div>

	  	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
		showRule:0,
		designer_target:["网站设计师",'UI设计师','UI设计师','UI设计师']
		// id:''
    }
  },
  mounted(){  
	//   this.id=this.$route.params.id
	// 		this.fetchDesign(this.id)
		},
 
 computed:{
	  ...mapState(['designinfo','personInfo','designlevel'])
  },
  methods:{
//  ...mapActions({
// 		  fetchDesignInfo:'fetchDesignInfo'
//       }),
	entrust:function(){
		layer.msg('此功能即将开放，敬请期待！！！', {icon: 6});
	},
	 designRule:function() {
		  layer.open({
				type: 1,
				area: ['560px', '212px'],
				title: '设计师晋级规则', //不显示标题
				shade: 0.6 ,//遮罩透明度
				content:$('#designRule') , //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
				});
	 },
	 splitTarget:function(obj){
		let targets=obj.split("，") 
	   return	targets 
	 }
// fetchDesign:function(id){
	
// 		  let formDatas = new FormData();
// 		  formDatas.append('member_id', id);
// 		  this.fetchDesignInfo(formDatas)
// 	  }
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
.desig-l{float: left; width: 280px; margin-right: 25px; background: #fff; border-top: 5px solid #e60012; padding: 30px 20px 20px; text-align: center;box-sizing: border-box;
.pic{width: 88px; height: 88px; border-radius: 44px;overflow: hidden;    margin: 0 auto; }
.pic img{width: 100%;}
.btn-attention{.btn(100%,40px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); margin-top: 20px;}
.btn-attention:hover{opacity: 0.9;}
.btn-entrust{.btn(100%,40px,var(--redColor),linear-gradient(90deg, #c53a1d 0%, #b23016 100%),#fff);}
.btn-entrust:hover{opacity: 0.9;}
.vam-person{line-height: 28px; margin-top: 15px;}
.vam-person .vam-l{color: var(--grayColor);text-align: left;}
.vam-person .vam-r{color: var(--backColor); text-align: right;}
.person-evaluate{line-height: 28px; padding-top: 15px; border-top: 1px solid #d6d6d6; text-align: left; margin-top: 15px; text-align: justify;}
.i-certi{.bg-map(18px,18px, -658px, -80px);}
.i-certi.no{.bg-map(18px,18px, -1046px, -156px);}
.i-tip{.bg-map(16px,16px, -999px, -44px); vertical-align: text-top;margin:2px 0 0 5px;}
.design-target{margin-top: 25px;}
.design-target a{background: #d6ebd4; display: inline-block; height: 24px; line-height: 24px; padding: 0px 10px; border-radius: 12px; margin: 3px 3px; cursor: auto;}
.vam-rule{line-height: 40px; 
 >div:nth-child(2n){background: #f8f9fa;}
  >div>div{padding-left: 10px;}
 .title{background: #e0e8eb;}
}
.layui-layer-title{text-align: left; font-weight: bold;}
}

</style>