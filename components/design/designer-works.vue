<template>
<div class="desig-r">
	  		<div class="title">
	  			<div class="theme">
	  				<i class="i-works"></i> 作品
	  			</div>
				  <ul>
				<li  v-for="(item,index) in category" :value="item.id" :key="item.id"  :class="[(index==0 && isActive==0)?'focus':'',(item.id==isActive)?'focus':'']" >
				 <a href="javascript:;" @click="fetchDesignProduct(item.id)">{{item.name}}</a>
					</li>
			</ul>
	  		
	  		</div>
	  		<ul class="ul-prod"  v-if="designproduct.length>0">
				<li  v-for="item in designproduct" :key="item.id">
					<router-link :to="{ name: 'materialDetail', params:{ id: item.id }}">
					<div class="prod-img">
						<img  :src="item.list_img_path">
						<div class="prod-txt">
						<div class="download">
							<a class="file" href="javascript:;" @click.prevent="downSourceFile(item.id,item.name)"><i></i> {{item.product_file_formats_name}}下载</a>
						</div>
						<div class="font">{{item.name}}	
						</div>
					</div>
					</div>
					</router-link>
				</li>
			</ul>
			<div class="nodata" v-else>
				<img src="~/assets/images/pic32.png" />
				<p>暂无此类作品</p>
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
import common from '~/assets/js/common'
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {MoPaging},
  data () {
    return {
		isActive:0,
		member_id:''
    }
  },
  mounted(){  
	  this.member_id=this.$route.params.id
	  this.fetchCategory()
	  this.fetchDesignProduct('')
		},
watch :{
	  '$store.state.designproduct'(){
		  if(this.designproduct.length==0){
			  return
		  }
		  let promiseAll = [], img = [], imgTotal = this.designproduct.length;
			for(let i = 0 ; i < imgTotal ; i++){
				promiseAll[i] = new Promise((resolve, reject)=>{
					img[i] = new Image()
					img[i].src = this.designproduct[i].list_img_path
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
 computed:{
	  ...mapState(['page','pageSize','countfile','designproduct','category','userToken'])
  },
  methods:{
 ...mapActions({
	      fetchCategory: 'fetchCategory',
		  fetchDesignProductlist:'fetchDesignProductlist',
		  downFile:'downFile'
      }),
	  downSourceFile(id,name){
		if(!this.userToken){
			this.$router.push('/user/login') 
			return
		}
		let param={
				token: this.userToken,
				product_id:id //素材类型
			}
		 this.downFile(param).then((res) => {
　　　　　　　　this.download(res,'图啦啦_'+name+'.zip') //此处跳转到第三步
          })
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
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchDesignProduct('')
            },
	columnOnload:function(){
			var boxArr = $(".ul-prod li"),
					num = Math.floor($(".ul-prod").width() / boxArr.eq(0).outerWidth(true)),
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
					
					$(".ul-prod").height(Math.max.apply(null, columnHeightArr));

		},
fetchDesignProduct:function(category_id){
	     this.isActive=category_id
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);
		  if(category_id){
			  formDatas.append('categoryId', category_id);
		  }
		  formDatas.append('member_id', this.member_id);
		  this.fetchDesignProductlist(formDatas)
	  },
 doSubmit (e) {
			e.preventDefault()
			
			 const errMsg=common.validateAlliance(this.group_name,this.group_number,this.group_owner,this.people_num)
			 this.errorMsg=errMsg

      if (!errMsg) {
		  let formDatas = new FormData();
		  
		  formDatas.append('token', this.userInfo.token);
          formDatas.append('qq_group_number',this.group_number);
		  formDatas.append('qq_group_owner', this.group_owner);
		  formDatas.append('name', this.group_name);
		  formDatas.append('people_num', this.people_num);
		this.upAlliance(formDatas)
		.then((data) => {
			console.log(data)
			if(data.code==0){
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
			layer.msg(data.msg, {icon: 1});
			}
		})
		}
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
.desig-r{float: left; width: 895px;
.title{ display: flex; height: 60px; color: #333; background: #fff;    padding: 0px 15px;
    align-items: center;}
.theme{color: var(--grayColor);}
.i-works{.bg-map(17px,16px, -687px, -79px); vertical-align: text-bottom;}
.title ul{ flex: 1;text-align: right;}
.title li{display: inline-block; width: 95px; height: 30px;}
.title li a{display: block; width: 95px; height: 30px; line-height: 30px; border-radius: 15px; color: var(--backColor); text-align: center;}
.title li.focus a,li a:hover{background: var(--redColor); color: #fff;}
.ul-prod{width: 105%; position: relative;
li{width: 280px; height: auto; margin-top: 26px; margin-right: 27px; overflow: hidden; float: left; border-radius: 4px;}
.prod-img{width: 100%; height: auto;min-height: 120px;background: #fff; overflow: hidden; position: relative; display: grid;}
.prod-img img{width: 100%;}
.prod-txt{position: absolute; top: 0%; left: 0; width: 100%; background: rgba(0,0,0,0.7); color: #fff; height: 100%;
text-align: center; padding-top: 40px; box-sizing: border-box; transition: opacity .5s; padding: 15px 20px;  opacity: 0;}
.download{text-align: center; margin-top: 15px;}
.download .png{.btn(135px,38px,var(--color),var(--color),#fff);}
.download .file{.btn(135px,38px,var(--colorMbsc),var(--colorMbsc),#fff); margin-top: 10px;}
.download i{.bg-map(16px,16px,-856px, -4px);}
.font{position: absolute; left: 0; width: 100%; bottom: 15px; text-align: center;}
li:hover .prod-txt{opacity: 1; }
} 
}

</style>