<template>
  <div class="step-box">
      <ul class="steps-row clearfix">
        <li :class="{ active: stepId==1 }">发布需求<br/><span class="name">（雇主）</span> </li>
        <li :class="{ active: stepId==2 }">竞价<br/><span class="name">（设计师）</span> </li>
        <li :class="{ active: stepId==3 }">雇佣<br/><span class="name">（雇主）</span> </li>
        <li :class="{ active: stepId==4 }">确认<br/><span class="name">（设计师）</span> </li>
        <li :class="{ active: stepId==5 }">付定金托管<br/><span class="name">（雇主）</span> </li>
        <!-- <li :class="{ active: stepId==6 }">开始工作<br/><span class="name">（设计师）</span> </li> -->
        <li :class="{ active: stepId==6 }">付尾款<br/><span class="name">订单完成</span> </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:["stepId"]
}
</script>

<style lang="less" scoped>
.step-box{padding: 20px 0px 15px; background: #eee;}
 .steps-row {
  position: relative;
  margin-bottom: 30px;
  padding: 0;
  margin: 0;
  counter-reset: step;  /*创建步骤数字计数器*/
}
/*步骤描述*/
.steps-row li {
  list-style-type: none;
  text-align: center;
  width: 16.6%;
  position: relative;
  float: left;
  font-size: 14px;
  color: var(--backColor);
  font-weight: bold;
}
 .steps-row li .name{
   font-size: 12px;
   color: var(--grayColor);
   font-weight: normal;
 }
/*步骤数字*/
.steps-row li:before {
  display: block;
  content: counter(step); /*设定计数器内容*/
  counter-increment: step;  /*计数器值递增*/
  width: 32px;
  height: 32px;
  background-color: #34bc76;
  line-height: 32px;
  border-radius: 32px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 0 auto 8px auto;
  position: relative;
  z-index: 1;
}
 
/*连接线*/
.steps-row li ~ li:after {
  content: '';
  width: 60%;
  height: 2px;
  background-color: #34bc76;
  position: absolute;
  left: -30%;
  top: 15px;
  border-radius: 1px;
  z-index: 0; /*放置在数字后面*/
}
 
/*将当前/完成步骤之前的数字及连接线变绿*/
.steps-row li.active:before,
.steps-row li.active:after {
  background-color: #34bc76;
}
 
/*将当前/完成步骤之后的数字及连接线变灰*/
.steps-row li.active ~ li:before,
.steps-row li.active ~ li:after {
  background-color: #bbb;
}
</style>

