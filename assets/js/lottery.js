//旋转角度
var angles;

// 园的半径
var radius = 130;
//转盘初始化
var color = ["#fde284", "#fe9103", "rgba(0,0,0,0.5)", "#ffffff", "#b10105", "#fbc605"];
var winnerList=[
    {
        id:'1',
        name:'5积分',
        logo:'/img/prize01.png',
    },{
        id:'2',
        name:'10积分',
        logo:'/img/prize01.png',
    },{
        id:'3',
        name:'500满减券',
        logo:'/img/prize02.png',
    },{
        id:'4',
        name:'100满减券',
        logo:'/img/prize02.png',
    },{
        id:'5',
        name:'50满减券',
        logo:'/img/prize02.png',
    },{
        id:'6',
        name:'1天VIP',
        logo:'/img/prize03.png',
    },{
        id:'7',
        name:'终身VIP',
        logo:'/img/prize03.png',
    },{
        id:'8',
        name:'谢谢参与',
        logo:'/img/prize04.png',
    }
] //奖品列表
// 有几份扇形
var number = winnerList.length;
     $(document).ready(function(){
          canvasRun()
    });
    //绘制转盘
    function canvasRun() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    // canvas的实际渲染倍率
    var ratio =3.5 //清晰度
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    createCircle(ratio);
    createCirText(ratio);
    //外圆
    function createCircle(ratio) {
        var startAngle = 0;//扇形的开始弧度
        var endAngle = 0;//扇形的终止弧度
        getCircleOffset();
        //画一个8等份扇形组成的圆形
        for (var i = 0; i < number; i++) {
            if(number % 4 == 0){
                startAngle = (Math.PI * 2 * i / number) - (Math.PI / number);
            }else if(number % 4 == 1 || number== 1 ){
                startAngle = (Math.PI * 2 * i / number)+(Math.PI/number/2);
            }else if(number % 4 == 2 || number == 2){
                startAngle = (Math.PI * 2 * i / number)
            }else if(number % 4 == 3 || number == 3){
                startAngle = (Math.PI * 2 * i / number)-(Math.PI/number/2);
            }else{
                startAngle = 0
            }
            endAngle = startAngle + Math.PI * 2 / number;
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius*ratio, radius*ratio, radius*ratio, startAngle, endAngle, false);
            ctx.lineWidth = 220*ratio;
            if (i % 2 == 0) {
                ctx.strokeStyle = "#f8c950";
            } else {
                ctx.strokeStyle = "#fbfbe0";
            }
            ctx.stroke();
            ctx.restore();
        }
    }
    //各奖项
    function createCirText(ratio) {
        ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color[3];
        var step = 2 * Math.PI / number;
        for (var i = 0; i < number; i++) {
            (function (arg) {
                var img=new Image()
                img.src=winnerList[arg].logo
                img.onload = function() {
                    ctx.save();
                    ctx.scale(ratio,ratio);
                    ctx.beginPath();
                    ctx.translate(radius, radius);
                    ctx.rotate(arg * step);
                    ctx.font = "10px Microsoft YaHei";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#666666';
                    ctx.fillText(winnerList[arg].name, 0, -75, 50);
                    ctx.drawImage(img,-18,-115,35,35);
                    ctx.closePath();
                    ctx.restore();
                }
                // 没有图片时也需要写文字
                img.onerror = function(){
                    ctx.save();
                    ctx.beginPath();
                    ctx.scale(ratio,ratio);
                    ctx.translate(radius, radius);
                    ctx.rotate(arg * step);
                    ctx.textAlign = 'center';
                    ctx.font = "8px Microsoft YaHei";
                    ctx.fillStyle = color[3];
                    ctx.fillText(winnerList[arg].name, 0, -110, 50);
                    ctx.closePath();
                    ctx.restore();
                }
            })(i)
        }
    }
    // 计算扇形的偏移量，以保证12点钟方向指向扇形区域的中间
    function getCircleOffset() {
        // 到12点钟方向的偏移量
        var offset = 0;
        // var verticalOffset = Math.PI / 2;
        if (number % 2 != 0) {
            offset = Math.PI * 2/number
        }
        if (number % 2 == 0 && number / 2 & 2 != 0) {
            offset = 0;
        } else {
        }
        return offset;
    }
}
