<template>
<div class="wrapper newinfo">
        <ul class="new-tab">
                <li class="on">
                        <a href="javascript:void(0)">公告</a>
                </li>
        </ul>
        <ul class="new-list"> 
                <li v-for="item in notice" :key="item.id">
                    <router-link  :to="{ name: 'notice-id', params:{ id: item.id }}" >{{item.title}}</router-link> <em>{{item.created_at}}</em> 
                </li>
                
        </ul>
        <mo-paging 
            :page-index="page" 
            :total="countfile" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
   </div>
</template>
<script>
import MoPaging  from '~/components/layout/web-pagination.vue'
import {mapState, mapActions} from 'vuex'
export default {
	components: {MoPaging},

  data () {
    return {
     
    }
  },
  mounted(){  
		this.fetchNoticeList()
		},
		
 computed:{
	  ...mapState(['page','pageSize','countfile','notice'])
  },
  methods:{
 ...mapActions({
		  fetchNotice:'fetchNotice'
      }),
	   //从page组件传递过来的当前page
            pageChange:function(page) {
                this.page = page
                this.fetchNoticeList()
            },
fetchNoticeList:function(){
		  let formDatas = new FormData();
		  formDatas.append('page', this.page);
		  formDatas.append('pageSize', this.pageSize);

		  this.fetchNotice(formDatas)
	  }
}
}
	 
</script>
<style lang="less" scoped>

.newinfo{margin-top: 30px; background: #fff; padding: 20px 40px; min-height: 500px;
.new-tab{display: flex; border-bottom: 1px solid var(--border);}
.new-tab li{padding: 0 20px 20px;
    font-size: 16px;
    line-height: 24px;
    display: inline-block;
    position: relative;}
.new-tab li.on a,.new-tab li a:hover{color: var(--backColor);}
.new-tab li a:after{
    content: '';
    position: absolute;
    width: 100%;
    width: 0;
    height: 3px;
    background: #17A1FF;
    border-radius: 2px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    transition: all 0.3s;
}
.new-tab li.on a:after{ width: 36%;}
.new-list li{padding: 30px 0px; display: flex; border-bottom: 1px solid  rgba(0, 0, 0, 0.05);}
.new-list li a{flex: 1; color: var(--backColor); }
.new-list li a:hover{color: var(--color);}
.new-list li em{font-size: 12px; color: var(--grayColor);}

}
</style>