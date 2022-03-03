<template>
<div class="file-contain">
	<ul class="categary-nav">
		<li v-for="(item,index) in category" :value="item.id" :key="item.id" :class="[(index==0 && isActive==0)?'focus':'',(item.id==isActive)?'focus':'']" >
            <a href="javascript:;" @click="fetchCollect(item.id)">{{item.name}}</a>
        </li>
	</ul>
	<ul class="ul-prodfile clearfix" v-if="collectlist.length>0">
		<li   v-for="(item,index) in collectlist" :key="index">
			<nuxt-link :to="{ name: 'material-detail-id', params:{ id: item.id }}">
			<div class="prod-img">
				<img :src="item.list_img_path">
				<div class="prod-txt">
				<div class="download">
					<a class="file"  href="javascript:void(0)"  @click.prevent="downSourceFile(item.id,item.name)"><i></i> 源文件下载</a>
				</div>
				<div class="font">{{item.name}}		
				</div>
			</div>
			</div>
			</nuxt-link>
		</li>
	</ul>
	<div class="nodata" v-else>
		<img src="../../assets/images/pic32.png" />
		<p>您还未下载此类素材</p>
	</div>
	<mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
	</div>
</template>
<script>
import {
    mapState,mapMutations,mapActions
} from 'vuex'
import MoPaging  from '~/components/layout/web-pagination.vue'
export default {
components: {MoPaging},
    data(){
	return { 
		isActive:0,  //列表素材类型ID
        studentName:0,
        page:1,
		pageSize:20
  }
  },
  computed:{
	  ...mapState(['countfile','category','collectlist','userToken','personInfo'])
  },
   watch :{
	  '$store.state.collectlist'(){
		  let promiseAll = [], img = [], imgTotal = this.collectlist.length;
			for(let i = 0 ; i < imgTotal ; i++){
				promiseAll[i] = new Promise((resolve, reject)=>{
					img[i] = new Image()
					img[i].src = this.collectlist[i].list_img_path
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
		//   setTimeout(() => { //获取到数据到浏览器渲染需要时间
		// 	  this.columnOnload()
		//   },200)
      }

    },
  mounted(){  
		this.fetchCategory()
        this.fetchCollect(0)  //我的素材列表
  },
  methods:{ //页面进来发送请求
      ...mapActions({
		  fetchCategory: 'fetchCategory',
          fetchCollectlist: 'fetchCollectlist',
		  downFile:'downFile'
      }),
	 ...mapMutations(['setShowVip']),
            //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchCollect(0)
            },

	    fetchCollect:function(val){
		let formDatas = new FormData();
		  formDatas.append('token', this.userToken);
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
          if(val){
			  this.isActive=val
            formDatas.append('category_id', this.isActive);
          }
		  formDatas.append('type', 2);
			this.fetchCollectlist(formDatas)
	  },
	   downSourceFile(id,name){
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
			 const blob = new Blob([data])
			 const link = document.createElement('a')
			 link.download = fileName
			 link.style.display = 'none'
				link.href = URL.createObjectURL(blob)
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
　　　　　　},
       columnOnload:function(){
		 if(this.collectlist.length==0){
			 return
		 }
			var boxArr = $(".ul-prodfile li"),
					num = Math.floor($(".ul-prodfile").width() / boxArr.eq(0).outerWidth(true)),
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
					
					$(".ul-prodfile").height(Math.max.apply(null, columnHeightArr));

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
        background: url(../../assets/images/bg-ico.png) no-repeat @x @y;
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
.file-contain .categary-nav{margin-top: 0;}
.file-contain{padding: 40px 20px; box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px;
.ul-prodfile{width: 105%; position: relative;
li{width: 275px; height: auto; margin-top: 20px; margin-right: 20px; overflow: hidden; float: left;}

.prod-img{width: 100%; height: auto; overflow: hidden; position: relative;}
.prod-img img{width: 100%;}
.prod-txt{position: absolute; top:0px; left: 0; width: 100%; background: rgba(0,0,0,0.7); color: #fff; height: 100%;
text-align: center;  box-sizing: border-box; transition: opacity .5s; padding: 15px 20px; opacity: 0;}
.collect{width: 37px;
    height: 30px;
    line-height: 28px;
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 4px; }
.collect i{.bg-map(16px,14px,-704px ,-8px); }
.download{text-align: center; margin-top: 15px;}
.download .png{.btn(135px,38px,var(--color),var(--color),#fff);}
.download .png:hover{opacity: 0.9;}
.download .file{.btn(135px,38px,var(--colorMbsc),var(--colorMbsc),#fff); margin-top: 10px;}
.download .file:hover{opacity: 0.9;}
.download i{.bg-map(16px,16px,-856px, -4px);}
.font{position: absolute; left: 0; width: 100%; bottom: 15px; text-align: center;}
li:hover .prod-txt{ opacity: 1; }
} 


}
</style>