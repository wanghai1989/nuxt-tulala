<template>
    <div class="search-box" :class="pageclass">
		<div class="divsearch clearfix">
	  	<div id="divselect"  class="searchtype fl"> 
        <cite>全部</cite> 
        <em></em>
        <input name="" type="hidden" value="0" id="inputselect"/> 
        <ul> 
        <li><a href="javascript:;"  @click="selectCategory(0,'all','全部')">全部</a></li> 
        <li  v-for="item in category" :key="item.id">
            <a href="javascript:;" @click="selectCategory(item.id,item.type_class,item.name)">{{item.name}}</a>
        </li> 
 
        </ul> 
        </div> 
        <input type="text" id="keyword" key-type="0" autocomplete="off" name="search" class="i-search fl" placeholder="输入搜索关键词" v-model="input_keyword">
        <a class="btn-search fl" key-type="0" href="javascript:void(0)" @click="doSearch('')">
        	<i></i>搜索
        </a>
	  </div>
	  <div class="search-hot" v-if="pageclass!='index'">
	  	热门搜索 :<div class="words" v-if="init_type=='png' || init_type=='all'"> <a v-for="item in hotWord.png" :key="item.id"  @click="doSearch(item)">{{item}}</a></div>      
          <div class="words" v-if="init_type=='bjtp'"><a v-for="item in hotWord.bjtp" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='ui'"><a v-for="item in hotWord.ui" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='mbsc'"><a v-for="item in hotWord.mbsc" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='syt'"><a v-for="item in hotWord.syt" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='word'"><a v-for="item in hotWord.word" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='ppt'"><a v-for="item in hotWord.ppt" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
          <div class="words" v-if="init_type=='excel'"><a v-for="item in hotWord.excel" :key="item.id"  @click="doSearch(item)">{{item}}</a> </div>
	  </div>
	  </div>
</template>
<script>
import merge from 'webpack-merge'
import {
    mapState,mapMutations,mapActions
} from 'vuex'
export default {
  props: ['pageclass'],
  data () {
    return {
	  input_keyword:'',
      init_type:'png',
      category_id:0
    }
  },
  computed:{
	  ...mapState(['category','idName','idClass','hotWord'])
  },
//   watch :{
//       '$route': function (to, from) {
//           const id=this.$route.params.id
//           const type_class=this.idClass[this.$route.params.id] 
//           const name=this.idName[this.$route.params.id]
//           console.log(id+','+type_class+','+name)
//           this.selectCategory(id,type_class,name)
//       }
//     },
  created(){
     
  },
  mounted() {
       this.bindSearchInfo()
       this.fetchCategory().then((data) => {
            this.divselect("#divselect","#inputselect"); 
       })
	   
  },
  methods:{  
    ...mapActions({
          fetchCategory: 'fetchCategory'
      }),


      bindSearchInfo(){
          const id=this.$route.params.id
          const type_class=this.idClass[this.$route.params.id] 
          const name=this.idName[this.$route.params.id]
          this.input_keyword=this.$route.query.keyword
          this.selectCategory(id,type_class,name)
      },
      doSearch(obj){
          if(obj){
           this.input_keyword=obj
           }
          if(this.$route.params.id==this.category_id){
              this.$router.push({
                query:merge(this.$route.query,{'keyword':this.input_keyword})
            })
          }else{
              this.$router.push({name: 'material-id',params:{id:this.category_id},query:{keyword:this.input_keyword}});
          }
        
      },
       divselect:function() {  //"#divselect","#inputselect"
                var ul = $("#divselect ul"); 
                $("#divselect").hover(function(){
                    ul.slideDown("fast"); 
                    $(this).find("cite").addClass("rotate")
                },function(){
                    ul.hide()
                    $(this).find("cite").removeClass("rotate")
                })
                },
        selectCategory:function(id,type_class,name){
            $("#divselect cite").html(name); 
            this.category_id=id
            this.init_type=type_class
            $("#inputselect").val(id)
            $("#divselect  ul").hide(); 
            $("#divselect cite").removeClass("rota90");
            $(".divsearch").removeClass().addClass("divsearch "+type_class+""); 

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
.divsearch{width: 870px; height: 60px; background-color: #ffffff; border-radius: 8px;
border-width: 2px; border-color: #3ebb2b; border-style: solid; margin: 40px auto 0px; position: relative; z-index: 3;
   .searchtype{float: left;
    padding-left: 17px;
    height: 60px;
    width: 110px;
    color: #333333;
    font-size: 18px;
    line-height: 60px; position: relative;
    cursor: pointer;}
 .searchtype i{
    .bg-map(12px,12px,-830px,-6px);
}
.searchtype em{ display: inline-block; width: 1px; height: 27px; vertical-align: middle; margin-left: 10px; background: rgba(0,0,0,.2);}
.i-search{
    width: 596px;
    height: 58px;
    outline: 0;
    border: 0 solid;
    text-indent: 20px;
    font-size: 18px;
    line-height: 58px;
}
.btn-search{
    .btn(137px,48px,transparent,transparent,#fff);background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%);    margin-top: 6px;
}
.btn-search i{.bg-map(20px,20px,-795px,-4px); margin: -1px 7px 0px 0px;}
}
.search-box.index .divsearch {
    border-width: 5px;
    border-color: #888;
    margin: -175px auto 0px;
}
.divsearch.png .btn-search{background: var(--color) ;}
.divsearch.bjtp .btn-search{background: var(--colorBjtp) ;}
.divsearch.ui .btn-search{background: var(--colorUi) ;}
.divsearch.mbsc .btn-search{background: var(--colorMbsc) ;}
.divsearch.syt .btn-search{background: var(--colorSyt) ;}
.divsearch.bgwd .btn-search{background: var(--colorBgwd) ;}
.divsearch.word .btn-search{background: var(--colorBgwd) ;}
.divsearch.ppt .btn-search{background: var(--colorBgwd) ;}
.divsearch.excel .btn-search{background: var(--colorBgwd) ;}
.search-hot{width: 870px; margin: 8px auto 0;
 a{margin: 0px 5px; cursor: pointer;}
 a:hover{color: var(--color);}
 .words{display: inline-block;}
 .words a:first-child{color: var(--redColor);}
}
.divsearch.png{border: solid 2px var(--color) ;}
.divsearch.bjtp{border: solid 2px var(--colorBjtp) ;}
.divsearch.ui{border: solid 2px var(--colorUi) ;}
.divsearch.mbsc{border: solid 2px var(--colorMbsc) ;}
.divsearch.syt{border: solid 2px var(--colorSyt) ;}
.divsearch.bgwd{border: solid 2px var(--colorBgwd) ;}
.divsearch.word{border: solid 2px var(--colorBgwd) ;}
.divsearch.ppt{border: solid 2px var(--colorBgwd) ;}
.divsearch.excel{border: solid 2px var(--colorBgwd) ;}
.searchtype cite{font-style: normal; display: inline-block; width: 90px; position: relative;}
.searchtype cite:after{content: ''; position: absolute; right: 0; top: 25px;     display: inline-block;    width: 10px;
    height: 8px;
    vertical-align: middle;
    background: url(~/assets/images/bg-ico.png) no-repeat -831px -8px;
    cursor: pointer;}
.searchtype cite.rotate:after{ background-position: -810px -175px;}
.searchtype>ul{background: #fff; box-shadow: 0px 0px 6px 0px #d0d0d0; margin: 5px 0 0 -16px; display: none;
      position: absolute;
    width: 125px; left: 15px;
    top: 55px;
    text-align: center;}
    .searchtype>ul li{line-height: 42px; font-size: 15px;}
    .searchtype>ul li a{display: block;}
    .searchtype>ul li:hover {background: #fafafa;}
    .searchtype>ul li:hover a{color: var(--color); }
</style>