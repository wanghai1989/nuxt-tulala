<template>
    <div class="remarks" id="remarks">
       <div class="remarks-l clearfix">
           <div class="remarks-lf">
               <h3>精选服务</h3>
               <span></span>
               <p>平台精选服务，更专业，更智能，帮您高效搞定需求！</p>
           </div>
           <div class="remarks-rf clearfix">
               <div class="service-cont">
                   <nuxt-link to="/enter"  title="入驻图啦">
                       <h3>入驻图啦</h3>
                       <p>设计师晋级依托作品</p>
                       <p>拒绝竞价排名、广告置顶更具公平</p>
                   </nuxt-link>
               </div>
               <div class="service-cont">
                   <nuxt-link to="/task/public" title="安全雇佣">
                       <h3>安全雇佣</h3>
                       <p>设计师经过图啦啦层层审核</p>
                       <p>灵活雇佣，节省企业50%人力成本</p>
                   </nuxt-link>
               </div>
               <div class="service-cont">
                   <nuxt-link to="/active/invite-friend"  title="邀请好友">
                       <h3>邀请好友</h3>
                       <p>好友上传素材奖励10%佣金</p>
                       <p>好友发布任务奖励平台利润20%</p>
                   </nuxt-link>
               </div>
               <div class="service-cont">
                   <nuxt-link to="/material/1"  title="高效办公">
                       <h3>高效办公</h3>
                       <p>海量素材，随意下载</p>
                       <p>持续上新六大品类精品素材</p>
                   </nuxt-link>
               </div>
               
           </div>
       </div>
        <div class="remarks-r">
            <div class="title">
                 <h3> 今日任务列表</h3> <nuxt-link to="/task"  class="viewmore">更多任务<i></i></nuxt-link>
            </div>
            <div class="task-box">
            <ul class="ul-indextask">
                <li  v-for="item in workorder" :key="item.id">
                    <nuxt-link :to="{ name: 'task-id', params:{ id: item.id }}" >{{item.name}}</nuxt-link>   <span>¥{{item.money}}</span>
                </li>
                <!-- <li>
                   <nuxt-link to="/enter">2公司logo设计标志商标图标英文字体LOGO设计</nuxt-link>    <span>¥5000.00</span>
                </li>
                <li>
                   <nuxt-link to="/enter">3公司logo设计标志商标图标英文字体LOGO设计</nuxt-link>    <span>¥5000.00</span>
                </li>
                <li>
                   <nuxt-link to="/enter">4公司logo设计标志商标图标英文字体LOGO设计设计</nuxt-link>    <span>¥5000.00</span>
                </li>
                <li>
                   <nuxt-link to="/enter">5公司logo设计标志商标图标英文字体LOGO设计设计</nuxt-link>    <span>¥5000.00</span>
                </li> -->
            </ul>
            </div>
            <nuxt-link to="/enter" class="goenter" title="入驻图啦啦">
                <img src="~/assets/images/pic60.jpg" />
            </nuxt-link>
        </div>
     </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  mounted(){  
		this.autoScroll()
        this.fetchWorkord()
		},
 computed:{
	  ...mapState(['workorder'])
  },
  methods:{
      ...mapActions({
		  fetchWorkorder:'fetchWorkorder'
      }),
       autoScroll:function() {
           setInterval(function(){
               $(".ul-indextask").animate({
                marginTop: "-30px"
            }, 500, function () {
                $(this).css({
                    marginTop: "0px"
                }).find("li:first").appendTo(this);
            })
           }, 5000);
            
        },
        fetchWorkord:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', 1);
		  formDatas.append('pageSize', 10);
		  formDatas.append('type', 0);
		  formDatas.append('receipt', 0);

		  this.fetchWorkorder(formDatas)
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
.remarks{display: flex; margin-top: 40px;}
.remarks-l{width: 750px; height: 240px; margin-right: 20px; background: #fff; border-radius: 5px;}
.remarks-r { width: 430px; border-radius: 5px; background: #fff; padding: 20px 0px; height: 240px; overflow: hidden; box-sizing: border-box; position: relative;
    .title{display: flex;margin-bottom: 10px; padding: 0px 15px 0px 0px; height: 18px; line-height: 18px;}
    .title h3{font-size: 18px; color: var(--backColor); height: 18px; line-height: 18px; font-weight: bold;
     border-left: 4px solid var(--redColor); text-indent: 20px; flex: 1;}
     .viewmore{ color: var(--color);   
       i{.bg-map(8px,10px,-1187px, -191px); vertical-align: baseline; margin: 3px 0px 0px 5px;  } 
        }
.viewmore:hover{color:#10c367; font-weight: bold;}
    .task-box { height: 120px; overflow: hidden; padding: 0px 15px;}
    .ul-indextask li{display: flex; line-height: 30px;}
    .ul-indextask li a{font-size: 14px; color: var(--backColor); flex: 1; width: 300px; overflow: hidden;
            white-space: nowrap;text-overflow:ellipsis;}
    .ul-indextask li a:hover{text-decoration: underline;}
    .ul-indextask li span{font-size: 14px; color: var(--backColor); width: 100px; text-align: right; color: var(--redColor);}
    .goenter{position: absolute; bottom: 0; left: 0;display: block; width: 100%; height: 70px;}
    .goenter img{width: 100%;}
}
.remarks-lf{float: left;
    width: 170px;
    height: 240px;
    background: url(~/assets/images/pic61.png) 100% no-repeat;
    padding: 35px 20px 0;
    box-sizing: border-box;
    box-shadow: 0 5px 30px 0 rgb(24 184 188 / 30%);
    border-radius: 5px 0 0 5px;
    h3{  font-size: 24px;
    font-weight: 700;
    color: #fff;
    line-height: 32px;}
    span{display: inline-block;
    width: 40px;
    height: 3px;
    background: #fff;
    opacity: .5;
    border-radius: 1px;
    margin: 11px 0 18px;}
    p{    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 20px;
    text-align: justify;}}
.remarks-rf{float: left; width: 580px;}
.service-cont{
        width: 290px;
    height: 120px;
    padding: 22px 25px 0;
    border-right: 1px solid #f2f2f2;
    box-sizing: border-box;
    background-repeat: no-repeat!important;
    background-position: 100%!important;
    float: left;
    a:hover h3{color: var(--color);}
    h3{font-weight: bold; font-size: 18px; color: var(--backColor);}
    p{color: var(--grayColor);}
}
.service-cont:nth-child(3),.service-cont:nth-child(4){
        border-top: 1px solid #f2f2f2;
}
.service-cont:nth-child(2){background: url(~/assets/images/pic56.png) no-repeat top 0px right 0px;    background-size: contain;}
.service-cont:nth-child(1){background: url(~/assets/images/pic57.png) no-repeat top 0px right 0px;    background-size: contain;}
.service-cont:nth-child(3){background: url(~/assets/images/pic58.png) no-repeat top 0px right 0px;    background-size: contain;}
.service-cont:nth-child(4){background: url(~/assets/images/pic59.png) no-repeat top 0px right 0px;    background-size: contain;}
</style>