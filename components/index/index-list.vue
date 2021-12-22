<template>
<div>
   <div class="prod-list" :class="item.type_class"  v-for="item in homeproductlist" :key="item.id" :id="item.type_class">
		<div class="prod-tit">
			<h3><i></i>{{item.name}}</h3>
			<router-link class="viewmore" :to="{ name: 'material-id', params:{ id: item.id }}">更多作品<i></i></router-link>
		</div>
			<ul class="ul-prod">
				<li   v-for="child in item.products" :key="child.id">
                    <router-link  :to="{ name: 'material-detail-id', params:{ id: child.id }}">
					<div class="prod-img">
						<img :src='child.list_img_path'>
						<div class="prod-txt">
						<div class="collect"  :class="{on:child.id==nowId}" @click.prevent="collect(child.id)">
							<i></i>
						</div>
						<div class="download">
							<a class="file"  @click.prevent="downSourceFile(child.id,child.name)"><i></i> {{child.product_file_formats_name}}下载</a>
						</div>
						<div class="font">{{child.name}}	
						</div>
					</div>
					</div>
                    </router-link>
				</li>
			</ul>
 			</div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {
        nowId:0,
     
    }
  },
  mounted(){  
			this.fetchHomeProduct()
		},
 computed:{
	  ...mapState(['homeproductlist','userToken'])
  },
  methods:{
 ...mapMutations(['setShowLogin']),
 ...mapActions({
		  fetchHomeProduct:'fetchHomeProduct',
          operateCollect:'operateCollect',
          downFile:'downFile'
      }),
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
     downSourceFile(id,name){
		if(!this.userToken){
			this.setShowLogin(1)
			return
		}
        let formDatas = new FormData();
		  formDatas.append('token',this.userToken);
          formDatas.append('product_id',id);
		
		 this.downFile(formDatas).then((res) => {
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
				// console.log(URL.createObjectURL(blob))
				document.body.appendChild(link)
				link.click()
				URL.revokeObjectURL(link.href)
				document.body.removeChild(link)
　　　　　　},
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
.prod-list{margin-top: 40px;
.prod-tit{display: flex;  margin-bottom: -6px;  
  h3  i{ .bg-map(25px,25px, -209px, -78px); margin-right: 8px;}
     h3{font-size: 24px; color: #333; flex: 1;}
     ul{display: flex; }
     li{margin: 0px 10px; padding-top: 8px;}
     li a{color: #666;}
     li a:hover,.prod-tit li a.focus{color:var(--color); border-bottom: 1px solid var(--color);}
}
.viewmore{ color: var(--color);    line-height: 38px;
       i{.bg-map(8px,10px,-1187px, -191px); vertical-align: baseline; margin: 3px 0px 0px 5px;  } 
        }
.viewmore:hover{color:#10c367; font-weight: bold;}
}
.ul-prod{display: flex; flex-wrap:wrap;
li{width: 280px; height: 280px; margin-top: 26px; margin-right: 26.6px; background: #fff;
box-sizing: border-box; border-radius: 4px; overflow: hidden;}
li:nth-child(4n){margin-right: 0px;}
.prod-img{width: 100%; height: 280px; overflow: hidden; position: relative; }
.prod-img img{width: 100%;transition:all 1s ease-out;}
li:hover img{transform:scale(1.05);}
.prod-txt{position: absolute; top: 0px; left: 0; width: 100%; background: rgba(0,0,0,0.4); color: #fff; height: 280px;
text-align: center; padding-top: 40px; box-sizing: border-box; transition: opacity .6s; padding: 15px 20px; opacity: 0;}
.collect{width: 37px; height: 30px;line-height: 28px; cursor: pointer; background-color: #ffffff;border-radius: 4px; }
.collect i{.bg-map(16px,14px,-704px ,-8px); }
.collect.on i,.collect:hover i{.bg-map(16px,14px,-1150px, -24px);}
.download{text-align: center; margin-top: 15px;}
.download .png{.btn(135px,38px,var(--color),var(--color),#fff);}
.download .file{.btn(135px,38px,var(--redColor),var(--redColor),#fff); margin-top: 10px;}
.download .file:hover{background: var(--redHover)}
.download i{.bg-map(16px,16px,-856px, -4px);}
.font{position: absolute; left: 0; width: 100%; bottom: 15px; text-align: center;}
li:hover .prod-txt{opacity: 1;}
}
.prod-list.png {
    .prod-img{background: url(~/assets/images/pic46.png);display: flex; align-items: center;}
}
.prod-list.bjtp,.prod-list.syt{
    .prod-img{display: flex; justify-content: center;}
    .prod-img img{width: auto; min-width: 100%;}
    li{width: 586.5px; height: 300px; margin-top: 26px; }
li:nth-child(2n){margin-right: 0px;}
     .prod-tit{
        h3  i{ .bg-map(25px,25px,  -246px, -78px); }
         li a:hover,.prod-tit li a.focus{color:var(--colorBjtp) ; border-bottom: 1px solid var(--colorBjtp);}
     }
     .ul-prod li,.ul-prod .prod-img,.ul-prod .prod-txt{height: 300px;  }
        
}
.prod-list.ui{
     .prod-tit{
        h3  i{ .bg-map(25px,25px, -288px, -78px); }
         li a:hover,.prod-tit li a.focus{color:var(--colorUi) ; border-bottom: 1px solid var(--colorUi);}
     }
     .ul-prod li,.ul-prod .prod-img,.ul-prod .prod-txt{height: 370px;  }
}
.prod-list.mbsc{
     .prod-tit{
       h3   i{ .bg-map(25px,25px, -399px, -76px); }
         li a:hover,.prod-tit li a.focus{color:var(--colorMbsc); border-bottom: 1px solid var(--colorMbsc);}
     }
     .ul-prod li,.ul-prod .prod-img,.ul-prod .prod-txt{height: 370px;  }
}
.prod-list.word,.prod-list.ppt,.prod-list.excel{
     .prod-tit{
        h3  i{ .bg-map(25px,25px, -434px, -77px); }
         li a:hover,.prod-tit li a.focus{color:var(--colorBgwd); border-bottom: 1px solid var(--colorBgwd);}
     }
     .ul-prod li,.ul-prod .prod-img,.ul-prod .prod-txt{height: 397px;  }
}
// .prod-list.syt{
//      .prod-tit{
//         h3  i{ .bg-map(25px,25px,-465px, -76px); }
//          li a:hover,.prod-tit li a.focus{color:var(--colorSyt) ; border-bottom: 1px solid var(--colorSyt);}
//      }
//      .ul-prod li,.ul-prod .prod-img,.ul-prod .prod-txt{height: 370px;  }
// }
</style>