<template>
<div class="qq-contain">
	        <a class="btn-apply" href="#location">我<br/> 是<br/>群<br/>主<br/>申<br/>请<br/>加<br/>入<br/>联<br/>盟</a>
			<div class="qq-list clearfix">
				<div class="qq-item"  v-for="item in alliance" :key="item.id">
					<div class="top">
						<div class="pic">
							<img src="../../assets/images/pic21.png" />
						</div>
						<div class="name">
							<div class="f16 cblack"><i :class="{'unfull':item.status==2}">{{auditQQName[item.status]}}</i> {{item.name}}</div>
							<div class="mt5"><span class="f12 cgray">群号 {{item.qq_group_number}}</span><em>{{item.people_num}}</em> </div>
						</div>
					</div>
					<div class="mt20">
						<a target="_blank"  class="btn-join" href="https://jq.qq.com/?_wv=1027&k=QYyZxSxf">加入QQ群</a>
					</div>
				</div>
			</div>
			 <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
			<div class="qq-tips">
				<div class="title lmfl"><i></i> 联盟福利</div>
				<div class="mt10">定期赠送图啦终身VIP，1年VIP, 月VIP。福利人人有，群主，群员皆可获取图啦啦VIP会员</div>
				<div class="title sqtj  mt40"><i></i> 申请条件</div>
				<div class="mt10">1：群成员必须已达到500人以上，群活跃度大于等于LV4； <br />
									2：群类型必须为设计相关类型；<br />
									3：认同图啦啦网站的理念，维护图啦啦声誉和利益，前两个月QQ群协助图啦啦活动宣传（至少1次）；<br />
									4：QQ群自愿修改群名称，带有图啦啦字样。</div>
				<div class="title jmjl mt40"><i></i> 加盟奖励</div>
				<div class="mt10">1：500个人以上“群主获得3年全站素材VIP，赠送3个活跃用户1年全站素材VIP” <br />
								2：1000个人以上“群主获得5年全站素材VIP，赠送5个活跃用户1年全站素材VIP”
				</div>
			</div>
			<form class="qq-tips"  @submit="doSubmit" id="location">
				<div class="title jrlm"><i></i> 加入联盟</div>
				<div class="vam vip-info">
					<div>
	  					<div class="l"><span class="cred">*</span>群名称</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="group_name">
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>群号码</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="group_number">
	  					</div>
	  				</div>
					<div>
	  					<div class="l"><span class="cred">*</span>加群链接</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="group_link">
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>群主QQ</div>
	  					<div class="r">
	  						<input class="input" type="text" v-model="group_owner">
	  					</div>
	  				</div>
	  				<div>
	  					<div class="l"><span class="cred">*</span>群人数</div>
	  					<div class="r">
	  						<select class="select" v-model="people_num">
	  							<option value="">请选择</option>
								  
	  							<option v-for="item in setting" :value="item.id" :key="item.id">{{item.value}}</option>
	  						</select>
	  					</div>
	  				</div>
	  				<div>
	  					<div></div>
	  					<div class="r">
							  <div class="error-msg" v-show="errorMsg">{{errorMsg}}</div>
							  <button type="submit" class="btn-enter">提交</button>
						</div>
	  				</div>
	  				
	  		</div>

			</form>
		</div>
	
</template>
<script>
import common from '~/assets/js/common'
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {MoPaging},
  metaInfo: {
    title: '图啦口碑-图啦啦'
  },
  data () {
    return {
     errorMsg: '',
	 group_name:'',
	group_number:'',
	group_owner:'',
	people_num:'',
	group_link:'',
	page:1
    }
  },
  mounted(){  
			import('layui-layer')
			this.fetchAllian()
			this.fetchSet()
		},
		
 computed:{
	  ...mapState(['pageSize','countfile','alliance','setting','userToken','auditQQName'])
  },
  methods:{
 ...mapActions({
		  upAlliance:'upAlliance',
		  fetchAlliance:'fetchAlliance',
		  fetchSetting:'fetchSetting'
      }),
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchAllian()
            },
fetchAllian:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);

		  this.fetchAlliance(formDatas)
	  },
fetchSet(){
let formDatas = new FormData();
		  formDatas.append('type', 1);

		  this.fetchSetting(formDatas)
},
 doSubmit (e) {
			e.preventDefault()
			
			 const errMsg=common.validateAlliance(this.group_name,this.group_number,this.group_owner,this.people_num)
			 this.errorMsg=errMsg

      if (!errMsg) {
		  let formDatas = new FormData();
		  
		  formDatas.append('token', this.userToken);
          formDatas.append('qq_group_number',this.group_number);
		  formDatas.append('qq_group_owner', this.group_owner);
		  formDatas.append('qq_group_link', this.group_link);
		  formDatas.append('name', this.group_name);
		  formDatas.append('people_num', this.people_num);
		this.upAlliance(formDatas)
		.then((data) => {
			if(data.code==0){
			layer.msg(data.msg, {icon: 2});
			}
			if(data.code==1){
			layer.msg(data.msg, {icon: 1});
			this.group_name=''
			this.group_number='',
			this.group_link='',
			this.group_owner='',
			this.people_num=''
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
.btn-apply{.btn(48px,22px,#b23016,linear-gradient(90deg, 
        #c53a1d 0%, 
        #b23016 100%),#fff);
		position: fixed; top: 450px; left: 50%; margin-left: 600px; padding: 12px 0px; line-height: 20px;  }
.btn-apply:hover{opacity: 0.9;}
.qq-contain{padding: 20px 16px 30px;box-sizing: border-box; background: #fff; margin-top: 20px; min-height: 400px; position: relative;
.qq-item{float: left; padding: 25px 30px; width: 280px; border: 1px solid #eee; box-sizing: border-box; background: #fff; margin-right: 16px;margin-bottom: 16px; }
.qq-item:nth-child(4n){margin-right: 0;}
.top{display: flex; height: 48px;}
.pic{width: 60px; height: 48px; overflow: hidden; }
.pic img{width: 100%;}
.name{flex: 1;text-align: right;}
.name em{font-style: normal; line-height: 1; padding: 2px 5px; border: 1px solid var(--color); color: var(--color); font-size: 12px; margin-left: 3px;}
.name i{font-size: 12px; color: var(--color)}
.name i.unfull{font-size: 12px; color: var(--redColor)}
.btn-join{.btn(100%,40px,var(--color),linear-gradient(90deg, #2dc61d 0%, #26b216 100%),#fff); font-size: 16px;}  
.btn-join:hover{opacity: 0.9;}
}
.qq-tips{border: solid 1px #eeeeee; background-color: #fafafa; padding: 30px 30px; margin-top: 15px;
 .title{font-size: 16px; color: var(--backColor);}
 .lmfl i{.bg-map(20px,20px,-933px, -40px); margin-right: 5px;}
 .sqtj i{.bg-map(20px,20px,-935px, -69px); margin-right: 5px;}
 .jmjl i{.bg-map(20px,20px,-968px, -41px); margin-right: 5px;}
 .jrlm i{.bg-map(20px,20px,-973px, -73px); margin-right: 5px;}
  .vip-info {margin: 30px auto 0; width: 820px;}
  .vip-info .l{color: var(--backColor); text-align: right; width: 185px;}
  .vip-info .r{padding: 10px 0px 10px 12px; }
  .input,.select{width: 400px; border: 1px solid #d0d0d0; height: 42px; line-height: 42px; text-indent: 5px; color: #333; border-radius: 4px;}
  .btn-enter{.btn(214px,49px,var(--color),linear-gradient(90deg, #2dc61d 0%, #2dc61d 100%),#fff); border-radius: 4px; margin-top: 30px;}
  .btn-enter:hover{opacity: 0.9;}
}
</style>