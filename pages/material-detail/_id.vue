<template>
<div>
    <webLogin></webLogin>
    <webUnvip></webUnvip>
    <div class="wrapper">
        <div class="location">
	  	<i class="icon i-location"></i> <router-link to="/">图啦啦</router-link> &nbsp;/&nbsp;
		  <router-link :to="{ name: 'material-id', params:{id: productinfo.category_id }}">{{idName[productinfo.category_id]}}</router-link>
		  &nbsp;/&nbsp;{{productinfo.name}}
	  </div>
    <div class="material-info clearfix">
		<div class="material-l"> 
			<div class="name">
				<h3>{{productinfo.name}}</h3>
				<a href="javascript:void(0);"  @click.prevent="collect(productinfo.id)">
					<i class="i-heart" :class="{'on':isCollect==2}" ></i> 收藏
				</a>
			</div>
			<div class="pic">
				<img :src="productinfo.detail_img_path" />
			</div>
			<div class="statement">
				<span>[声明] 本站图片来自用户分享，如损害你的权益请联系客服QQ：349103751给予处理。</span>
				<!-- <em><i class="i-report"></i>举报 </em> -->
			</div>
			<div class="related-search">
				<div class="title">相关搜索</div>
				<div class="keyword">
					<a href="javascript:void(0)"  v-for="(item,index) in productinfo.tage" :key="index" @click="doSearch(item)">{{item}}</a>
				</div>
			</div>
		</div>
		<div class="material-r">
			<div class="part01">
			<!-- <a class="downimg">下载PNG</a> -->
			<a class="downfile"  @click.prevent="downSourceFile(productinfo.id,productinfo.name)">下载PSD</a>
			<div class="operat">
				<span>
					<i class="i-down"></i> {{productinfo.download_counts}}
				</span>
				<span>
					<i class="i-heart"></i> {{productinfo.download_counts}}
				</span>
				<span>
					<i class="i-eye"></i> {{productinfo.visit_counts}}
				</span>
			</div>
			<div class="vam material-txt">
				<div>
					<div><span class="cblack">软件</span> </div>
					<div class="tr"><span class="cgray">{{softName[productinfo.file_formats]}}</span></div>
				</div>
				<div>
					<div><span class="cblack">像素</span></div>
					<div class="tr"><span class="cgray">{{productinfo.img_dpi}}</span></div>
				</div>
				<div>
					<div><span class="cblack">格式</span></div>
					<div class="tr"><span class="cgray">{{productinfo.file_formats}}</span></div>
				</div>
				<div>
					<div><span class="cblack">作者</span></div>
					<div class="tr"><span class="cgray">{{productinfo.nickname}}</span></div>
				</div>
				<div>
					<div><span class="cblack">上传时间</span></div>
					<div class="tr"><span class="cgray">{{productinfo.created_at}}</span></div>
				</div>
				<div>
					<div><span class="cblack">分享</span></div>
					<div class="tr">
						<i class="i-wechat"   @click="shareWechat()"></i>
						<i class="i-qq" @click="shareQzone()"></i>
						<i class="i-blog"  @click="shareWeibo()"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="part01 mt20">
			<div class="vam material-txt">
				<div>
					<div><span class="cblack">版权所有</span> </div>
					<div class="tr">© 图啦啦</div>
				</div>
				<div>
					<div><span class="cblack">版权</span> </div>
					<div class="tr pr">相关字体/摄影图仅供参考 <i class="i-tip"></i>
					<div class="copy_tip">
						<h3>版权声明</h3>
					  	<p>此作品是由图啦啦签约设计师设计上传，图啦啦拥有版权；未经图啦啦书面授权，请勿作他用。人物肖像，字体及音频如需商用需第三方额外授权；</p>
						<p>图啦啦尊重知识产权，如知识产权权利人认为平台内容涉嫌侵权，可通过邮件：tulalawx@163.com提出书面通知，我们将及时处理。</p>
						<p>图啦啦对作品中含有的国旗、国徽等政治图案不享有权利，仅作为作品整体效果的示例展示，禁止商用。另外您必须遵循相关法律法规规定的使用范围和使用方式，
							禁止以任何形式歪曲、篡改。</p>
					</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ad-pic mt20">
			<router-link to="/enter">
				<img src="~/assets/images/pic08.png" />
			</router-link>
		</div>
		</div>
	</div>
	<div class="layer_wechat">
		<canvas id="QRCode_header"></canvas>
	</div>
      
    </div>
</div>
</template>

<script>
import webLogin from '~/components/layout/web-login.vue'
import webUnvip from '~/components/layout/web-unvip.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
   layout: 'web',
   components: {webLogin,webUnvip},
  data () {
    return {
		info:'',
		type_name:'',
		listimg:{},
		isCollect:1 
    }
  },
  head(){
	   return {
			title: this.productinfo.meta_title,
			meta: [{
			hid: "description",
			name: "description",
			content: this.productinfo.meta_description
			},{
			hid: 'keywords',
			name: 'keywords',
			content: this.productinfo.meta_keywords
			}]
			}
  },
  created(){
  },
  mounted(){ 
		},
		
 computed:{
	  ...mapState(['userToken','softName','idName','personInfo','productinfo'])
  },
   async asyncData ({ store, params}) {  //服务器渲染
	await  store.dispatch('fetchProductinfo',{id:params.id});
  },
  methods:{
 ...mapActions({
		  operateCollect:'operateCollect',
		  downFile:'downFile'
      }),
...mapMutations(['setShowLogin','setShowVip']),
shareWeibo:function(){
	let website=window.location.href;
	let pageTitle=document.title;
	let pic=this.productinfo.detail_img_path;
	let weiboUrl="http://service.weibo.com/share/share.php?title="+pageTitle+"&url="+website+"&pic="+pic
    window.open(weiboUrl);
},
shareWechat:function(){
	let website=window.location.href;
	let opts = {
                    errorCorrectionLevel: "H",//容错级别
                    type: "image/png",//生成的二维码类型
                    quality: 0.3,//二维码质量
                    margin: 0,//二维码留白边距
                    width: 200,//宽
                    height: 200,//高
                    text: "图啦啦邀请好友",//二维码内容
                    color: {
                        dark: "#333333",//前景色
                        light: "#fff"//背景色
                    }
                };
                let msg = document.getElementById("QRCode_header");
                // 将获取到的数据（val）画到msg（canvas）上
                QRCode.toCanvas(msg, website, opts, function (error) {
                    console.log(error)
                });
            
		  layer.open({
				type: 1,
				shade: false,
				title: false, //不显示标题
				content: $('.layer_wechat'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
				});
},
shareQzone:function(){
	let website=window.location.href;
	let pageTitle=document.title;
	let pic=this.productinfo.detail_img_path;
	window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+website+'?sharesource=qzone&title='+pageTitle+'&pics='+pic+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'));
},
collect:function(id){
		 if(!this.userToken){
			 this.setShowLogin(1)
			 return
		 }
		 let formDatas = new FormData();
		  formDatas.append('product_id', id);
		  formDatas.append('type',this.isCollect); //1代表收藏 2取消收藏
		  formDatas.append('token', this.userToken);
 this.operateCollect(formDatas)
          .then((data) => {
			if(this.isCollect==1){
				this.isCollect=2
			}else{
				this.isCollect=1
			}
          })
	 },
doSearch(val){
           this.$router.push({name: this.productinfo.type_class,params:{id:this.productinfo.category_id},query:{keyword:val}});
      },
	downSourceFile(id,name){
		if(!this.userToken){
			this.setShowLogin(1)
			return
		}
		if(this.personInfo.is_vip){
		  let formDatas = new FormData();
		  formDatas.append('token',this.userToken);
          formDatas.append('product_id',id);

		 this.downFile(formDatas).then((res) => {
　　　　　　　　this.download(res,'图啦啦_'+name+'.zip') //此处跳转到第三步
          })
		  }else{
			  this.setShowVip(1)
			  return
		  }
	},
	download:function(data,fileName) {
				if (!data) {
				return
			}
			 const blob = new Blob([data], {type: 'application/zip'})
			 const link = document.createElement('a')
			 link.download = fileName
			 link.style.display = 'none'
				link.href = URL.createObjectURL(blob)
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
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
.material-info{margin-top: 30px;
.material-l{width: 820px; background: #fff; float: left; padding: 30px 30px; box-sizing: border-box; margin-right: 20px;
.name{display: flex;}
.name h3{flex: 1; font-size: 18px; color:var(--backColor); line-height: 44px;}
.name a{.btn(106px,44px,#e5e5e5,#fafafa,#333);font-size: 14px;    border-radius: 22px;}
.name a:hover{opacity: 0.9;}
.i-heart{.bg-map(18px,16px,-704px, -8px); }
.i-heart.on{.bg-map(18px,16px,-1149px, -24px); }
.pic{margin-top: 30px;}
.pic img{max-width: 100%; margin: 0 auto; display: block;}
.statement{margin-top: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); display: flex;}
.statement span{color:var(--grayColor) ; flex: 1;}
.statement em{font-style: normal;}
.statement .i-report{.bg-map(16px,16px,-1124px, -9px); margin-right: 5px;}
.related-search{margin-top: 15px;}
.related-search .title{font-size: 16px; color: var(--backColor);}
.related-search a{background-color: #f3f4f9; border-radius: 4px; padding: 8px 15px; color: #999; font-size: 12px; margin:4px 8px; display: inline-block;}
.related-search a:hover{color: var(--backColor);}
.related-search .keyword{margin-top: 15px;}
}
.material-r{width: 360px; float: left;
.part01{padding: 30px; background: #fff;}
.ad-pic a{cursor: pointer;}
.downimg{.btn(100%,50px,var(--color), var(--color),#fff); font-size: 16px; border-radius: 4px;};
.downimg:hover{opacity: .9;}
.downfile{.btn(100%,50px,var(--redColor),var(--redColor),#fff); font-size: 16px; border-radius: 4px; };
.downfile:hover{opacity: .9; }
.operat{display: flex; margin-top: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border);}
.operat span{flex: 1;}
.operat span:nth-child(2){text-align: center;}
.operat span:nth-child(3){text-align: right;}
.material-txt{line-height: 40px; margin-top: 5px;}
.i-down{.bg-map(20px,20px,-915px, -6px); }
.i-heart{.bg-map(20px,20px,-702px, -6px); }
.i-eye{.bg-map(20px,20px, -949px, -8px); }
.i-wechat{.bg-map(31px,31px,-980px, -5px); margin-right: 5px;}
.i-qq{.bg-map(31px,31px,-1015px, -5px);margin-right: 5px;}
.i-blog{.bg-map(31px,31px,-1048px, -5px);}
.i-tip{.bg-map(15px,15px,-1092px, -9px);}
.copy_tip{position: absolute; top: -100px; right: 15px; background: #fff; border: 1px solid #eee; padding: 20px 30px; z-index: 2;  width: 400px; display: none;
h3{font-size: 18px; text-align: center; color: var(--backColor); margin-bottom: 15px;}
p{text-indent: 2em; line-height: 1.8; text-align: left;}
}
.i-tip:hover + .copy_tip{ display: block;}
}
}
.layer_wechat{width: 200px; height: 200px; display: none; padding: 12px; background: #fff;  box-shadow: #000000 0px 0px 6px; 
img{width: 100%;}
}
</style>