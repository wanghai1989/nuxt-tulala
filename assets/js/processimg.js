'use strict';
export default {
   cutImageBase64(m_this,waterimg,format, wid) {  //file 压缩之后返回base64   format 图片格式  如'image/jpeg'  
    return new Promise((resolve, reject) => {
        var file = m_this;
        var URL = window.URL || window.webkitURL;
        var blob = URL.createObjectURL(file);
    
        var base64;
    var img = new Image();
        img.src = blob;
        img.onload = function() {
            var that = this;
            //生成比例
            var w = that.width,
                h = that.height,
                scale = w / h;
                w = wid || w;
                h = w / scale;
    //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $(canvas).attr({
                width: w,
                height: h
            });
            ctx.drawImage(that, 0, 0, w, h);   //context.drawImage(img,x,y,width,height);  在画布上定位图像，并规定图像的宽度和高度
            if(waterimg) 
             ctx.drawImage(waterimg, (w/2-62), (h/2-47)); // context.drawImage(img,x,y); 在画布上定位图像
            // 生成base64
            base64 = canvas.toDataURL(format,0.92);
           resolve(base64)
        };
    })
    },
 
    base64ToBlob(urlData,imgtype) {
      let arr = urlData.split(',');
      let mime = arr[0].match(/:(.*?);/)[1] || imgtype;
      // 去掉url的头，并转化为byte
      let bytes = window.atob(arr[1]);
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mime
      });
    },
  readfile(file) {  //压缩前将file转换成base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = function(e) {
      reject(e)
      }
      reader.readAsDataURL(file)
      reader.onloadend = function(e) {
          resolve(e.target.result)
        }
    })
    },
  loadImage(src) {  //实例化img
    return new Promise((resolve, reject) => {
      let img = new Image();
        img.src =src;  //此处自己替换本地图片的地址
        img.onload = function() {
          resolve(img);
        };
        img.onerror = function  () {
          reject(new Error('图片解析失败'));
        }
    })
},
compresstoblob(img){   //把img压缩并转成blob对象
  return new Promise((resolve, reject) => {
  let targetWidth=720;
  let blob=null;
  // const imgwater =await this.loadImage(watersrc);
  const targetHeight=targetWidth*img.height/img.width;
 var canvas = document.createElement("canvas");
     canvas.width = targetWidth;
     canvas.height = targetHeight;
   var ctx = canvas.getContext("2d");
   ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  //  ctx.drawImage(imgwater, targetWidth/2+63, targetHeight/2+47);
   var dataURL = canvas.toDataURL('image/jpeg', 0.92);

    blob = new Blob([dataURL],{ type: 'image/jpeg'})
   resolve(blob)
  })
},
getImgWH(file){
  return new Promise((resolve, reject) => {
  let url = window.URL || window.webkitURL;
  console.log(url.createObjectURL(file));  //file 选中的文件 
  let img = new Image();              //手动创建一个Image对象
  img.src = url.createObjectURL(file);//创建Image的对象的url
  img.onload = function () {
     resolve(this.width+ "px*" + this.height+ "px")
}
})
},
drawAndShareImage(url1,url2){ //url1 背景图，url2 上层图,两种图片合成

  var canvas = document.createElement("canvas");
  canvas.width = 750;
  canvas.height = 1185;
  var context = canvas.getContext("2d");

  context.rect(0 , 0 , canvas.width , canvas.height);
  context.fillStyle = "#fff";
  context.fill();

  var myImage = new Image();
  myImage.src = url1;    //背景图片  你自己本地的图片或者在线图片
  myImage.crossOrigin = 'Anonymous';
  myImage.onload = function(){
      context.drawImage(myImage , 0 , 0 , 750 , 1185);
      var base64 = canvas.toDataURL("image/png"); 
      console.log(base64)
      // context.font = "60px Courier New";
      // context.fillText("我是文字",350,450);

      var myImage2 = new Image();
      myImage2.src = url2;   //你自己本地的图片或者在线图片
      myImage2.crossOrigin = 'Anonymous';
      
      myImage2.onload = function(){
          context.drawImage(myImage2 , 535 , 970 );
          var base64 = canvas.toDataURL("image/png");  //"image/png" 这里注意一下

          // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download =  '邀请好友'
        // 将生成的URL设置为a.href属性
        a.href = base64

        // 触发a的单击事件
        a.dispatchEvent(event);
      }
  }
}

//  compresstoblob(img,type){   //把img压缩并转成blob对象
//   let targetWidth=720;
//   let imgtype='image/jpeg';
//   if(type==1){  //1代表是png元素
//     targetWidth=600;
//     imgtype='image/png';
//   }
//   // const imgwater =await this.loadImage(watersrc);
//   const targetHeight=targetWidth*img.height/img.width;
//  var canvas = document.createElement("canvas");
//      canvas.width = targetWidth;
//      canvas.height = targetHeight;
//    var ctx = canvas.getContext("2d");
//    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
//   //  ctx.drawImage(imgwater, targetWidth/2+63, targetHeight/2+47);
//    var dataURL = canvas.toDataURL(imgtype, 0.92);
//    console.log(dataURL)
//    var blob = new Blob([dataURL],{ type: imgtype})
//    return blob
// }
  }
  

