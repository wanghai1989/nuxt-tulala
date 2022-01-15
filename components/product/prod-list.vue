<template>
<div>
	<div class="location">
	  	<i class="icon i-location"></i> <nuxt-link to="/">图啦啦</nuxt-link> &nbsp;/&nbsp;{{idName[categoryId]}} 
	  </div>
    <ul class="waterfall-col clearfix" :class="idClass[categoryId]" v-if="productlist.length>0">
			<li class="item"  v-for="item in productlist" :key="item.id">
				<nuxt-link :to="{ name: 'material-detail-id', params:{ id: item.id }}">
				<div class="prod-img" :style="'backgroundImage: url('+item.list_img_path+');'">
				  <img :src="item.list_img_path" class="lazy_img">
					<div class="prod-txt">
					<div class="collect" :class="{on:item.id==nowId}" @click.prevent="collect(item.id)">
						<i title="收藏"></i>
					</div>
					<div class="download">
						<a class="file"  href="javascript:void(0)"  @click.prevent="downSourceFile(item.id,item.name)"><i></i> {{item.product_file_formats_name}}下载</a>
					</div>
					<div class="font">{{item.name}}
					</div>
				</div>
				</div>
				</nuxt-link>
				
			</li>
		</ul>
    <div class="nodata" v-else>
		<img src="~/assets/images/pic32.png" />
		<p>抱歉 Sorry！~ 没有找到符合条件的素材</p>
		<nuxt-link to="/advice" class="btn-advice">提交素材建议</nuxt-link>
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
import {mapState, mapActions, mapMutations} from 'vuex'
import MoPaging  from '~/components/layout/web-pagination.vue'
export default {
	components: {MoPaging},
	data () {
    return {
		categoryId:0,
		nowId:0,
        page: 1,
		pageSize:40,
		countImg:0,  //统计图片加载数量
		query:{}
    }
  },
  created(){
  },
  watch :{
      '$route': function (to, from) {
		   this.categoryId= this.$route.params.id
		   this.query=this.$route.query
		   this.page=1  //路由变了，分页从1开始
           this.fetchProduct()
      },
	  '$store.state.productlist'(){
		  if(this.categoryId==1 || this.categoryId==3 || this.categoryId==0){
			  let promiseAll = [], img = [], imgTotal = this.productlist.length;
			for(let i = 0 ; i < imgTotal ; i++){
				promiseAll[i] = new Promise((resolve, reject)=>{
					img[i] = new Image()
					img[i].src = this.productlist[i].list_img_path
					img[i].onload = function(){
						//第i张加载完成
						resolve(img[i])
					}
				})
			}
			Promise.all(promiseAll).then((img)=>{
				this.columnOnload()
				//全部加载完成
			})
		  	}
      }
    },
mounted(){	
	this.categoryId= this.$route.params.id
	this.query=this.$route.query
	this.fetchProduct()
  },

	computed:{
	  ...mapState(['countfile','productlist','personInfo','userToken','idClass','idName'])
  },
	methods:{
		...mapMutations(['setShowLogin']),
		...mapActions({
		  fetchProductlist:'fetchProductlist',
		  operateCollect:'operateCollect',
		  downFile:'downFile'
		  
      }),
	  ...mapMutations(['setShowLogin','setShowVip']),
		 //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchProduct()
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
　　　　　　if (!data.size) {
			   layer.msg('没有可下载文件', {icon: 2});
　　　　　　　　return
　　　　　　}
			layer.load(1, {
                shade: [0.1, '#fff']
            });
			 const blob = new Blob([data])
			 const link = document.createElement('a')
			 link.download = fileName
			 link.style.display = 'none'
				link.href = URL.createObjectURL(blob)
				// console.log(URL.createObjectURL(blob))
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
				layer.closeAll('loading'); 
　　　　　　},
	 collect:function(id){
		 if(!this.userToken){
			 this.setShowLogin(1)
			 return
		 }
		 let formDatas = new FormData();
		  formDatas.append('product_id', id);
		  formDatas.append('type',1); //1代表收藏 2取消收藏
		  formDatas.append('token', this.userToken);
 this.operateCollect(formDatas)
          .then((data) => {
			if(data.code==0){
				layer.msg(data.msg, {icon: 7});
			}
            if(data.code==1){
				this.nowId=id
            }
          })
	 },
	 fetchProduct:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  formDatas.append('category_id', this.categoryId);
		  
		  
		  if(this.query.scenarios_id){
			  formDatas.append('product_scenario_id', this.query.scenarios_id);
		  }
		  if(this.query.format_id){
			  formDatas.append('product_file_format_id', this.query.format_id);
		  }
		  if(this.query.shape_id){
			  formDatas.append('product_shape_id', this.query.shape_id);
		  }
		  if(this.query.keyword){
			  formDatas.append('keyword', this.query.keyword);
		  }
		  this.fetchProductlist(formDatas);
	  },
	 columnOnload:function(){
		 if(this.productlist.length==0){
			 return
		 }
			var boxArr = $(".waterfall-col li"),
					num = Math.floor($(".waterfall-col").width() / boxArr.eq(0).outerWidth(true)),
					columnHeightArr = [];
					columnHeightArr.length = num;
		            
					boxArr.each(function (index, item) {
						if (index < num) {
							columnHeightArr[index] = $(item).outerHeight(true);
			
						} else {
							var minHeight = Math.min.apply(null, columnHeightArr),
								minHeightIndex = $.inArray(minHeight, columnHeightArr);
			               
							$(item).css({
								position: 'absolute',
								top: minHeight,
								left: boxArr.eq(minHeightIndex).position().left
							});
							columnHeightArr[minHeightIndex] += $(item).outerHeight(true);
						}
					});
					
					$(".waterfall-col").height(Math.max.apply(null, columnHeightArr));

		}
	},
}
</script>
<style lang="less">
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
.waterfall-col.png,.waterfall-col.ui,.waterfall-col.mbsc,.waterfall-col.all{ position: relative;
li.item{width: 285px; height: auto; margin-bottom: 20px; margin-right: 20px; border-radius: 4px;
 overflow: hidden; padding:10px 10px 10px; background: #fff; float: left; box-sizing: border-box;}
li.item>a{display: block;}
//li:nth-child(4n){margin-right: 0px;}
.prod-img{width: 100%; height: auto; overflow: hidden; position: relative; background: #E7E7E7; display: grid;}
.prod-img img{width: 100%;transition:all 1s ease-out;}
li.item:hover img{transform:scale(1.05);}

}
.waterfall-col{width: 1525px;
.prod-txt{position: absolute; top: 0; left: 0; width: 100%; background: rgba(0,0,0,0.4); color: #fff; height: 100%;
text-align: center; padding-top: 40px; box-sizing: border-box; transition: opacity .4s; padding: 15px 20px; opacity: 0;}
.collect{width: 37px; height: 30px; line-height: 28px;  cursor: pointer; background-color: #ffffff; border-radius: 4px; }
.collect i{.bg-map(16px,14px,-704px ,-8px); }
.collect.on i,.collect:hover i{.bg-map(16px,14px,-1150px, -24px);}
.download{    position: absolute;left: 0; width: 100%; bottom: 50px; text-align: center;}
.download .file{.btn(135px,38px,var(--colorMbsc),var(--colorMbsc),#fff); margin-top: 10px;}
.download i{.bg-map(16px,16px,-856px, -4px);}
.font{position: absolute; left: 0; width: 100%; bottom: 15px; text-align: center; font-size: 14px;    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;}
li.item:hover .prod-txt{opacity: 1;}
}
.waterfall-col.png  .prod-img{background: url(~/assets/images/pic46.png) !important;}

.waterfall-col.bjtp,.waterfall-col.syt{ display: flex; height: auto !important;
	  flex-wrap: wrap; 
		
li.item{ background: #f5f5f5;  flex-grow: 1; 
    margin: 0px 20px 20px 0px;
    position: relative;
    overflow: hidden; 
	border-radius: 4px;
}
.prod-img{background-size: cover;
      background-position: center;}

.prod-img img{ opacity: 0;
        min-width: 100%;
        height: 300px;}
} 
.waterfall-col.bjtp::after,.waterfall-col.syt::after{
    content: '';
    flex-grow: 99999;
  }

.waterfall-col.word,.waterfall-col.ppt,.waterfall-col.excel{
li{width: 285px; height: 397px; margin-bottom: 20px; margin-right: 20px; border-radius: 4px;
 overflow: hidden; padding:10px; background: #fff; float: left; box-sizing: border-box;}
li.item>a{display: block;}
//li:nth-child(4n){margin-right: 0px;}
.prod-img{width: 100%; height: 380px; overflow: hidden; position: relative; background: #E7E7E7; display: grid;}
.prod-img img{width: 100%;transition:all 1s ease-out;}
li.item:hover img{transform:scale(1.05);}
} 
@media screen and (max-width: 1800px) {
    .waterfall-col{width: 1220px;}
}
.nodata{background: #fff; padding: 40px 0px;
.btn-advice{.btn(140px,36px,var(--color),var(--color),#fff);font-size: 14px;margin-top: 15px; }
}

</style>