'use strict';
export default {
  dataFormat:function(strDate) {
    var date = new Date(strDate);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
},
  handleTel:function(tel){
    tel = "" + tel;
    var ary = tel.split("");
    ary.splice(3,4,"****");
    var tel1=ary.join("");
    return tel1
  },
  getTs:function(time){
    var arr = time.split(/[- :]/),
    _date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]),
    timeStr = Date.parse(_date)
    return timeStr
},
getEndDays:function(end_time){
   // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
   var curTime = new Date();
   var postTime = new Date(end_time);                 

  //部分浏览器不兼容此转换建议所以对此进行补充（指定调用自己定义的函数进行生成发布时间的时间戳）
   
   //var timeDiff = curTime.getTime() - postTime.getTime();
   //上面一行代码可以换成以下（兼容性的解决）
   var timeDiff = this.getTs(end_time) -curTime.getTime();

   var days=  Math.floor(timeDiff/24/60/60/1000); 
   return days
},
   getDateDiff:function(post_modified){
    // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
    var curTime = new Date();
    var postTime = new Date(post_modified);                 
 
   //部分浏览器不兼容此转换建议所以对此进行补充（指定调用自己定义的函数进行生成发布时间的时间戳）
    
    //var timeDiff = curTime.getTime() - postTime.getTime();
    //上面一行代码可以换成以下（兼容性的解决）
    var timeDiff = curTime.getTime() - this.getTs(post_modified);

    // 单位换算
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    var month =  week*4;
    var year = month*12;

    // 计算发布时间距离当前时间的周、天、时、分
    var  exceedyear = Math.floor(timeDiff/year);
    var exceedmonth = Math.floor(timeDiff/month);
    var exceedWeek = Math.floor(timeDiff/week);
    var exceedDay = Math.floor(timeDiff/day);
    var exceedHour = Math.floor(timeDiff/hour);
    var exceedMin = Math.floor(timeDiff/min);

    
    // 最后判断时间差到底是属于哪个区间，然后return

    if(exceedyear<100&&exceedyear>0){
        return '发表于'+exceedyear + '年前';
        }else{
        if(exceedmonth<12&&exceedmonth>0){
            return exceedmonth + '月前';
            }else{
            if(exceedWeek<4&&exceedWeek>0){
                return exceedWeek + '星期前';
                }else{
                if(exceedDay < 7 && exceedDay > 0){
                    return exceedDay + '天前';
                    }else {
                    if (exceedHour < 24 && exceedHour > 0) {
                        return exceedHour + '小时前';
                    } else {
                        if(exceedMin==0){
                            return '刚刚发表';
                        }else{
                            return exceedMin + '分钟前';
                        }
                        
                    }
                }
                }
            }
        }
},
 randomWord:function(randomFlag, min, max){
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     let pos=0;  
  // 随机产生
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
      pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return '图啦'+ str;
  },
        IsPhone:function(no) {  //手机号验证
            const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(no)) {
                return false;
            } else {
                return true;
            }
      },
      formatPwd:function(str){
        const myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g; //密码只能为字母跟数字组合，长度为6-12位
        if (!myreg.test(str)) {
          return false;
      } else {
          return true;
      }
      },  
      formatEmail:function(str){
        const myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;
        if (!myreg.test(str)) {
          return false;
      } else {
          return true;
      }
      }, 
      formatQQ:function(str){
        const myreg =  /^\s*[.0-9]{5,11}\s*$/; 
        if (!myreg.test(str)) {
          return false;
      } else {
          return true;
      }
      },
      // 验证注册
      validateReg:function(mobile,password,confirm_password){ //注册验证
        // if (!nickname) {
        //     return '昵称不能为空'
        //   }
          if (!mobile) {
            return '手机号不能为空'
        }
        if(!this.IsPhone(mobile)){
            return '手机格式不对'
          }
          if (!password) {
            return '密码不能为空'
          }
          if(!this.formatPwd(password)){
            return '密码格式不对'
          }
          if (!confirm_password) {
            return '确认密码不能为空'
          }
          if (password!==confirm_password) {
            return '两次密码不一致'
          }
          return ''
      },
      //验证登录
      validateLogin:function(mobile,password){ //登录验证
          if (!mobile) {
            return '手机号不能为空'
        }
        if(!this.IsPhone(mobile)){
            return '手机格式不对'
          }
          if (!password) {
            return '密码不能为空'
          }
          // if(!this.formatPwd(password)){
          //   return '密码格式不对'
          // }
          return ''
      },
      //验证设计师入驻第一步
	validateStepOne:function(dis,account_name,account_bank,bank_num,channel){ //登录验证
       if(!dis){
         return '你还未勾选供稿协议'
       }
          if (!account_name) {
            return '开户名不能为空'
        }
        if (!account_bank) {
          return '请选择银行'
        }
        if (!bank_num) {
          return '银行卡号不能为空'
      }
      if(!channel){
        return '请选择获知渠道'
      }
        //   if (!real_name) {
        //     return '真实姓名不能为空'
        // }
        //   if(!mobile){
        //   	return '手机号不能为空'
        //   }
        // if(!this.IsPhone(mobile)){
        //     return '手机格式不对'
        //   }
        //   if (!qq) {
        //     return 'qq不能为空'
        //   }
        //   if(!this.formatQQ(qq)){
        //     return 'QQ号格式不对'
        //   }
        //   if (!email) {
        //     return '邮箱不能为空'
        //   }
        //   if(!this.formatEmail(email)){
        //     return '邮箱格式不对'
        //   }
          if (!channel) {
            return '获知渠道不能为空'
          }
          return ''
      },
      //验证设计师入驻第二步
      validateStepTwo:function(categorys_id,img_one,img_two,img_three){
      	  if (!categorys_id) {
            return '请选择设计师类别'
        }
          if(!img_one || !img_two || !img_three ){
          	return '请上传三个设计素材'
          }
          return ''
      },
      //验证完善作品信息
      validateFileinfo:function(scenarios,formats,shape,imgDpi,is_upload,keywords){
        if (!scenarios) {
          return '请选择作品场景'
      }
        if(!formats){
          return '请选择作品格式'
        }
      if(!shape){
          return '请选择作品版式'
        }
        if (!imgDpi) {
          return '分辨率不能为空'
        }
        if (!is_upload) {
          return '源文件未上传'
        }
        if (!keywords) {
          return '请输入素材描述关键词'
        }
        return ''
      },
      //验证完善作品信息 this.isFirst,	this.blob,
      validateBasic:function(isFirst,blob,sex,birthday,industry,professional,working_time,qq,province,city,area,address,introduction){
        if(!isFirst && !blob){
          return '请上传头像'
        }
        if (!sex) {
          return '请选择性别'
      }
      if(!birthday){
          return '生日不能为空'
        }
        if (!industry) {
          return '行业不能为空'
        }
        if (!professional) {
          return '职业不能为空'
        }
        if (!working_time) {
          return '请选择工作年限'
        }
        if (!qq) {
          return 'QQ不能为空'
        }
        if(!this.formatQQ(qq)){
          return 'QQ号格式不对'
        }
        if (!province) {
          return '请选择省份'
        }
        if (!city) {
          return '请选择城市'
        }
        if (!area) {
          return '请选择区域'
        }
        if (!address) {
          return '详细地址不能为空'
        }
        if (!introduction) {
          return '个人简介不能为空'
        }
        return ''
      },
      //验证实名认证
      validateCard:function(img_front,img_backend,card_name,card_no){
        if (!img_front) {
          return '请上传身份证正面'
      }
      if (!img_backend) {
          return '请上传身份证反面'
      }
      if (!card_name) {
            return '请输入姓名'
        }
      if (!card_no) {
              return '请输入身份证号'
          }
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(card_no))) {
        return '身份证号格式错误'
      }
      return ''
      },
      //验证实名认证
      validateEvaluation:function(file,words){
        if (typeof file == 'undefined') {
          return '请选择祝福图片上传'
      }
      if (!words) {
          return '祝福语不能为空'
      }
      if(words.length>200){
        return '祝福语不能超过200字'
      }
      return ''
      },
      //验证QQ联盟 
      validateAlliance:function(group_name,group_number,group_owner,people_num){
        if(!group_name){
          return '请输入群名称'
        }
        if (!group_number) {
          return '请输入群号码'
      }
      if(!this.formatQQ(group_number)){
        return '群号码格式不对'
      }
      if (!group_owner) {
          return '请输入群主QQ号'
      }
      if(!this.formatQQ(group_owner)){
        return '群主QQ号格式不对'
      }
      if (!people_num) {
            return '请选择群规模'
        }
      return ''
      },
      //验证建议
      validateAdvice:function(type,content,contact){
        if(!type){
          return '请选择反馈类型'
        }
        if (!content) {
          return '请输入建议内容'
      }
      if(content.length>200){
        return '建议内容最多为200字'
      }
      if (!contact) {
          return '请输入联系方式'
      }
      return ''
      },
      validateTaskpublic:function(category_id,name,money,mobile,description){
        if (!category_id) {
          return '请选择任务类型'
      }
      if (!name) {
          return '请输入任务名称'
      }
      if (!money) {
        return '请输入预算'
    }
      if (!mobile) {
        return '请输入手机号'
    }
    if(!this.IsPhone(mobile)){
      return '手机格式不对'
    }
    if (!description) {
      return '请输入任务描述'
  }
  if(description.length>200){
    return '任务描述不能超过200字'
  }
      return ''
      },
      validateOffer:function(money,description){
        if (!money) {
          return '请输入报价'
        }
        if (!description) {
          return '请输入说明'
        }
        if (description.length>200) {
          return '说明长度不能超过200个字'
        }
        return ''
        },
        validateEmploy:function(money,contract){
          if (!money) {
            return '请输入确定金额'
          }
          if (!contract){
            return '请上传项目合同'
          }
          return ''
          } ,
        validateForgetpwd:function(mobile,code,password,confirm_password){
          if (!mobile) {
            return '请输入手机号'
          }
          if(!this.IsPhone(mobile)){
            return '手机格式不对'
          }
          if (!code) {
            return '请输入验证码'
          }
          if (!password) {
            return '请输入密码'
          }
          if(!this.formatPwd(password)){
            return '密码格式不对'
          }
          if (!confirm_password) {
            return '请输入确认密码'
          }
          if(password!=confirm_password){
            return '两次密码不一致'
          }
          return ''
          },
          validateMobileBind:function(mobile,code){
            if (!mobile) {
              return '请输入手机号'
            }
            if(!this.IsPhone(mobile)){
              return '手机格式不对'
            }
            if (!code) {
              return '请输入验证码'
            }
            
            return ''
            },
            //验证建议
      validateWithdraw:function(num,total){
        if(!num){
          return '请输入提现数值'
        }
        if(num>total){
          return '您的图啦币不足'
        }
        if(!Number.isInteger(num/500)){
          return '提现数值只能为500的倍数'
        }
       
      return ''
      },
  }
  
  