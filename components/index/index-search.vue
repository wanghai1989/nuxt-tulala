<template>
    <div class="divsearch clearfix">
        <div id="divselect"  class="searchtype fl"> 
        <cite>全部 </cite> 
        
        <em></em>
        <input name="" type="hidden" value="" id="inputselect"/> 
        <ul> 
        <li><a href="javascript:;" selectid="">全部</a></li> 
        <li><a href="javascript:;" selectid="1" selectclass="png">免扣元素</a></li> 
        <li><a href="javascript:;" selectid="2" selectclass="bjtp">背景图片</a></li> 
        <li><a href="javascript:;" selectid="3" selectclass="ui">UI界面</a></li> 
        <li><a href="javascript:;" selectid="4" selectclass="mbsc">模板素材</a></li> 
        <li><a href="javascript:;" selectid="5" selectclass="bgwd">办公文档</a></li> 
        <li><a href="javascript:;" selectid="6" selectclass="syt">摄影图</a></li> 
        </ul> 
        </div> 
        <input type="text" id="keyword" key-type="0" autocomplete="off" name="search" class="i-search fl" placeholder="输入搜索关键词">
        <a class="btn btn-search fl" key-type="0">
        	<i class="icon"></i>搜索
        </a>
	  </div>
</template>
<script>
export default {
  mounted() {
	   this.divselect("#divselect","#inputselect"); 
  },
  methods:{  
       divselect:function(divselectid,inputselectid) { 
                var inputselect = $(inputselectid); 
                var ul = $(divselectid+" ul"); 
                $(divselectid).hover(function(){
                    ul.slideDown("fast"); 
                    $(this).find("cite").addClass("rotate")
                },function(){
                    ul.slideUp("fast"); 
                    $(this).find("cite").removeClass("rotate")
                })
                
                $(divselectid+" ul li a").click(function(){ 
                var txt = $(this).text(); 
                $(divselectid+" cite").html(txt); 
                var value = $(this).attr("selectid");
                var classval= $(this).attr("selectclass");
                inputselect.val(value); 
                $(divselectid+" ul").hide(); 
                 $(divselectid+" cite").removeClass("rota90");
                $(".divsearch").removeClass().addClass("divsearch "+classval+""); 
                }); 
                }




  }
  
}
</script>
<style lang="less" scoped>
.divsearch{ border: solid 5px #888888;  margin: -180px auto 0px; }
.box_lx{
    width: 100%;
    height: 56px;
    border-radius: 4px;
    text-indent: 10px;
    font-size: 16px;
    outline: none;
    border: none;
    background: #f7f7f7;
    font-family: "montserrat" !important;
}
.box_lx .l_title{
width: 100%;
position: relative;
font-size: 16px; color: #333;
height: 56px; line-height: 56px;
}
.list_box{
width: 100%;
padding: 5px 0;
border: 1px solid #999;
border-top: 1px solid transparent;
position: relative;
z-index: 10;
max-height: 300px;
overflow: auto;
background: #fff;
display: none;
}
.list_box ul li{
padding: 5px 0;
}
.list_box ul li:hover{
background-color: #FFB2B2;
color: #fff;
cursor: pointer;
}
.l_title span{
display: inline-block;
position: absolute;
top: 50%;
right: 5px;
width: 0;
height: 0;
margin-top: -3px;
border-top: 5px solid #ccc;
border-right: 5px solid rgba(204, 204, 204, 0.02);
border-left: 5px solid rgba(204, 204, 204, 0.02);
border-bottom: 5px solid rgba(204, 204, 204, 0.02);
}
.divsearch{width: 870px; height: 60px; background-color: #ffffff; border-radius: 8px; border: solid 5px #888888; margin: -175px auto 0px; position: relative; z-index: 3;
   .searchtype{float: left;
    padding-left: 17px;
    height: 60px;
    width: 110px;
    color: #333333;
    font-size: 18px;
    line-height: 60px; position: relative;
    cursor: pointer;}
 .searchtype i{width: 12px; height: 12px; background-position:-830px -6px;}
}
.divsearch.png{border: solid 5px var(--color) ;}
.divsearch.bjtp{border: solid 5px var(--colorBjtp) ;}
.divsearch.ui{border: solid 5px var(--colorUi) ;}
.divsearch.mbsc{border: solid 5px var(--colorMbsc) ;}
.divsearch.bgwd{border: solid 5px var(--colorBgwd) ;}
.divsearch.syt{border: solid 5px var(--colorSyt) ;}
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
    top: 56px;
    text-align: center;}
    .searchtype>ul li{line-height: 42px; font-size: 15px;}
    .searchtype>ul li a{display: block;}
    .searchtype>ul li:hover {background: #fafafa;}
    .searchtype>ul li:hover a{color: var(--color);}
.searchtype em{ display: inline-block; width: 1px; height: 27px; vertical-align: middle; margin-left: 10px; background: rgba(0,0,0,.2);}
.i-search{
    width: 600px;
    height: 58px;
    outline: 0;
    border: 0 solid;
    text-indent: 20px;
    font-size: 18px;
    line-height: 58px;
}
.btn-search{
    width: 137px; height: 48px; line-height: 48px;  color: #fff;
    background-image: linear-gradient(90deg, 
        #2dc61d 0%, 
        #26b216 100%);    margin-top: 6px;
}
.btn-search i{width: 20px; height: 20px; background-position:-795px -4px;  margin: -1px 7px 0px 0px;}
.divsearch.png .btn-search{background: var(--color) ;}
.divsearch.bjtp .btn-search{background: var(--colorBjtp) ;}
.divsearch.ui .btn-search{background: var(--colorUi) ;}
.divsearch.mbsc .btn-search{background: var(--colorMbsc) ;}
.divsearch.bgwd .btn-search{background: var(--colorBgwd) ;}
.divsearch.syt .btn-search{background: var(--colorSyt) ;}
.divsearch.index{ border: solid 5px #888888;  margin: -180px auto 0px; }
.search-hot{width: 870px; margin: 8px auto 0;
 a{margin: 0px 5px;}
 a:hover{color: var(--color);}
}
</style>