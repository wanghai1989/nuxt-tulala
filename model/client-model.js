import axios from 'axios' //发数据请求
import { createError } from '~/model/util'
const request = axios.create({
//baseURL: process.env.NODE_ENV==='server'?'http:127.0.0.1:3333':'/'  //浏览器请求默认是同域的
  baseURL: 'http://www.91tula.top/' 
})

const handleRequest = (request) => {  //handle 处理
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      return resolve(data)
    }).catch(err => {
        reject(createError(400,'服务器错误'))
    })
  })
}

export default {
//    inviteUrl(code){
//     return new Promise((resolve, reject) => {
//         const url='http://127.0.0.1:3333'  //页面访问地址
//         resolve(url+'/user/register?'+'invite_code='+code)
//       })
//    },
   register (formData) {
    return handleRequest(request.post('/api/member/register',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
   },  
   login (mobile,password) {
    return handleRequest(request.post('/api/member/login',{mobile,password}))
   },
   wechatlogin (formData) {
    return handleRequest(request.post('/api/member/wechatLogin',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }))
   },
   logout(formData){
    return handleRequest(request.post('/api/member/logout',formData,{
        headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
        }
    }))
   },
   forgetPassword (formData) {
    return handleRequest(request.post('/api/member/forgetPassword',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   settleInOne (formData) { //设计师入驻第一步
    return handleRequest(request.post('/api/designer/settleInOne',formData,{
      headers: {
        'Authentication-Token':formData.get('token'),
        'Content-Type': 'multipart/form-data'
      }
  }))
   },
   settleInTwo (formData) { //设计师入驻第二步
    return handleRequest(request.post('/api/designer/settleInTwo',formData,{
      headers: {
        'Authentication-Token':formData.get('token'),
        'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getDefaultChannel (token) { //获知图啦啦渠道
    return handleRequest(request.post('/api/designer/getDefaultChannel',{},{
      headers: {
          'Authentication-Token': token
      }
  }))
   },
   getDesignerStatus (formData) { //获取设计师入驻的状态
    return handleRequest(request.post('/api/designer/getDesignerStatus',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
          }
  }))
   },
   getMyProduct (formData) { //未完善作品列表
    return handleRequest(request.post('/api/product/memberIsNoPerfectProdUct',formData,{
      headers: {
        'Authentication-Token':formData.get('token'),
        'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getCondition (formData) { //获取搜索条件列表
    return handleRequest(request.post('/api/index/getNavigationDetail',formData))
   },


   getNavigation () { 
    return handleRequest(request.post('/api/index/getCategoryAndChild', {}))
  },

   getCategory () { //获取作品分类
    return handleRequest(request.post('/api/designer/getCategory',{}))
   },
   upImage (formData) { //设计师入驻上传图片
    return handleRequest(request.post('/api/upload/upImage',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   upFileScource (formData,config) { //上传作品源文件
    return handleRequest(request.post('/api/product/uploadFileScource',formData,config))
   },
   upMaterialImage(formData){  //批量上传作品图片
   	return handleRequest(request.post('/api/upload/upMaterialImage',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   upFileinfo(formData){ //完善作品信息
    return handleRequest(request.post('/api/product/perfectWorks',formData,{
     headers: {
         'Authentication-Token':formData.get('token'),
         'Content-Type': 'multipart/form-data'
     }
 }))
  },
  savePersoninfo(formData){ //完善个人信息
    return handleRequest(request.post('/api/member/perfectMemberInfo',formData,{
     headers: {
         'Authentication-Token':formData.get('token'),
         'Content-Type': 'multipart/form-data'
     }
 }))
  },
  getPersoninfo (formData) { //获取个人信息
    return handleRequest(request.post('/api/member/getMemberInfo',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
  saveRealname(formData){ //实名认证
    return handleRequest(request.post('/api/member/realNameAuthentication',formData,{
     headers: {
         'Authentication-Token':formData.get('token'),
         'Content-Type': 'multipart/form-data'
     }
 }))
  },
   getGood (page,pageSize) { //获取商品列表
    return handleRequest(request.post('/api/goods/index',{page,pageSize}))
   },
   getGoodDetail (goods_id) { //获取商品详情
    return handleRequest(request.post('/api/goods/goodsDetail',{goods_id}))
   },
   placeOrder (formData) { //积分兑换商品
    return handleRequest(request.post('/api/goods/createOrder',formData,{
      headers: {
        'Authentication-Token':formData.get('token'),
        'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getGoodorder (page,pageSize,token) { //获取商品订单列表
    return handleRequest(request.post('/api/orders/getUserOrderList',{page,pageSize},{
        headers: {
            'Authentication-Token': token
        }
    }))
   },
   upEvaluation (formData) { //上传口碑
    return handleRequest(request.post('/api/evaluation/index',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getEvaluation (formData) { //获取口碑列表
    return handleRequest(request.post('/api/evaluation/list',formData,{}))
   },
   upAlliance (formData) { //上传QQ联盟
    return handleRequest(request.post('/api/qq-alliance/index',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getAlliance (formData) { //获取联盟列表
    return handleRequest(request.post('/api/qq-alliance/list',formData,{}))
   },
   signIn(formData){  //签到
   	return handleRequest(request.post('/api/member/signIn',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   upAdvices (formData) { //提交建议
    return handleRequest(request.post('/api/advices/add',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getAdvices (formData) { //获取意见列表
    return handleRequest(request.post('/api/advices/list',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   createWork (formData) { //发布工单
    return handleRequest(request.post('/api/work-order/create',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getWorkorder (formData) { //获取工单列表
    return handleRequest(request.post('/api/work-order/list',formData,{}))
   },
   getWorkinfo (formData) { //获取工单详情
    return handleRequest(request.post('/api/work-order/workOrderDetail',formData,{}))
   },
   createOffer (formData) { //参与报价
    return handleRequest(request.post('/api/work-order/accepts',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getWorklist (formData) { //获取工单列表  1 发布  2接单
    return handleRequest(request.post('/api/work-order/myWorkOrder',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   getEmploylist (formData) { //获取雇佣列表
    return handleRequest(request.post('/api/work-order/workOrdersAcceptsList',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   createEmploy (formData) { //安全雇佣
    return handleRequest(request.post('/api/work-order/confirmToEmploy',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getProductlist (formData) { //获取素材列表
    return handleRequest(request.post('/api/product/list',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },    
   getProductinfo (formData) { //获取素材详情
    return handleRequest(request.post('/api/product/detail',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
   },   
   confirmOrder (formData) { //设计师确认订单
    return handleRequest(request.post('/api/work-order/confirmTheAmount',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   customerPays (formData) { //支付定金
    return handleRequest(request.post('/api/pay/customerPays',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   balancePaymentPays (formData) { //支付尾款
    return handleRequest(request.post('/api/pay/balancePaymentPays',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   operateCollect (formData) { //收藏
    return handleRequest(request.post('/api/product/collection',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getCollectlist (formData) { //收藏，下载列表
    return handleRequest(request.post('/api/product/myCollectionList',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },    
   downFile (formData) { //下载源文件
    return handleRequest(request.get('/api/product/downloadSourceFile', {
        responseType: 'blob',
        params:{ 'product_id':formData.get('product_id')},	//参数
        headers:{'Authentication-Token':formData.get('token')}//请求头配置  
     }))
   },
   downContract (param) { //下载合同
    return handleRequest(request.get('/api/work-order/downloadContract', {
        responseType: 'blob',
        params:{ 'id': param.id },	//参数
        headers:{'Authentication-Token':param.token}//请求头配置  
     }))
   },
//    responseType: 'blob',
//     headers:{ 'Content-Type': 'application/json; application/octet-stream'},
//    downFile (formData) { //下载源文件
//     return handleRequest(request.get('/api/product/downloadSourceFile',formData,{
//         headers: {
//             'Authentication-Token':formData.get('token'),
//             'Content-Type': 'multipart/form-data'
//         }
//     }))
//    },
   getCommission (formData) { //获取邀请好友列表
    return handleRequest(request.post('/api/member/commissionList',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   getInviteList () { //获取邀请好友排行榜
    return handleRequest(request.post('/api/member/allCommissionList',{}))
   },
   getVipOrder (formData) { //获取充值记录
    return handleRequest(request.post('/api/vip-order/list',formData,{
        headers: {
            'Authentication-Token':formData.get('token'),
            'Content-Type': 'multipart/form-data'
        }
    }))
   },
   getDesigner (formData) { //获取设计师列表
    return handleRequest(request.post('/api/designer/list',formData,{}))
   },
   getDesignProductlist (formData) { //获取设计师素材列表
    return handleRequest(request.post('/api/designer/products',formData,{}))
   }, 
   getDesignInfo(formData){  //获取设计师信息页
    return handleRequest(request.post('/api/designer/designerDetail',formData,{}))
   },
   getNew(formData) { //获取用户消息列表
    return handleRequest(request.post('/api/member/getBulletins',formData,{}))
   }, 
   getNotice(formData){ //获取公告列表
    return handleRequest(request.post('/api/bulletins/list',formData,{}))
   },
   getNoticeDetail(formData){ //获取公告列表
    return handleRequest(request.post('/api/bulletins/detail',formData,{}))
   },
   intoRead (formData) { //已读
    return handleRequest(request.post('/api/member/tagRead',formData,{}))
   }, 
   getHomeProduct(){ //获取公告列表
    return handleRequest(request.post('/api/index/getHomeProduct',{},{}))
   },
   getHomeBanner (formData) {
    return handleRequest(request.post('/api/index/getHomeBanner',formData,{}))
   },
   payVipQd (formData) { //支付会员
    return handleRequest(request.post('/api/pay/vip',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   payDeposit (formData) { //支付定金
    return handleRequest(request.post('/api/pay/customerPays',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   payBalance (formData) { //支付尾款
    return handleRequest(request.post('/api/pay/balancePaymentPays',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   verifyToken (userToken) {
    return handleRequest(request.post('/api/member/checkoutLogin',{},{
        headers: {
            'Authentication-Token':userToken
        }
    }))
   },
   deleteFile (formData) { //删除文件
    return handleRequest(request.post('api/product/del',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },  
   getOrderStatus (formData) { //获取订单支付状态
    return handleRequest(request.post('/api/vip-order/orderStatus',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getWorkOrderStatus (formData) { //获取工单支付状态
    return handleRequest(request.post('/api/work-order/getWorkOrderStatus',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getVipType (formData) { //获取会员类型
    return handleRequest(request.post('/api/vip/getPrice',formData,{}))
   },
   getSetting(formData){ //获取配置数据
    return handleRequest(request.post('/api/setting/list',formData,{}))
   },
   confirmReceipt (formData) { //确认收货
    return handleRequest(request.post('/api/orders/confirmReceipt',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   luckyDraw (formData) { //大转盘抽奖
    return handleRequest(request.post('/api/award/turntable',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   fullCoupon (formData) { //满减券列表
    return handleRequest(request.post('/api/coupon/getMemberCoupon',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   getVeriCode (formData) { //获取短信验证码
    return handleRequest(request.post('/api/member/getVerificationCode',formData,{}))
   },
   checkVeriCode (formData) { //验证验证码
    return handleRequest(request.post('/api/member/checkVerificationCode',formData,{}))
   },
   bindMobile (formData) { //手机号认证
    return handleRequest(request.post('/api/member/bindingMobileOrEmail',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   },
   withDrawCoin (formData) { //提现
    return handleRequest(request.post('/api/member/withdrawIng',formData,{
      headers: {
          'Authentication-Token':formData.get('token'),
          'Content-Type': 'multipart/form-data'
      }
  }))
   }
}

