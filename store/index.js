import model from '~/model/client-model.js'

const handleError = (err) => {
  console.log(err)
    // handle error
    // if (err.code === 401) {
    //   notify({
    //     content: '你得先登录啊！'
    //   })
    //   bus.$emit('auth')
    // }
  }

export const state = () => ({
  metaInfo:{
    title:'0',
    keywords:'',
    description:''
},
  baseUrl:'http://www.91tula.com/',
  loading:false,
  navigation:[],
  homebanner:[],
  count:[],
  userInfo:{},
  personInfo:{},
  userToken:'',
  showLogin:0,  //弹框登录默认隐藏
  showVip:0,  //非会员下载弹框
  category:[],//作品分类
  defaultchannel:[], //获知渠道
  myproduct:[], //我的作品列表
  condition:[],
  //分页
  page:1,  //当前页数
pageSize:10,  //每页条数
  countfile:1, //素材总数
  goods:[],
  // countgoods:1, //商品总数
  gooddetail:[],//商品详情
  goodorder:[], //商品订单
  evaluation:[],//口碑列表
  alliance:[],//联盟列表
  advices:[],//建议列表
  designcode:'',//设计师状态
  // signinfo:{},//签到
  workorder:[],//工单列表
  workinfo:{},//工单详情
  worklist:[], //我的工单列表 1发布  2接单
  employlist:[], // 工单参与竞价列表
  productlist:[],//素材列表  
  productinfo:{},//素材详情 
  homeproductlist:[],//首页素材列表 
  collectlist:[],
  commission:[], //积分，图拉币记录
  ranklist:[], //邀请好友排行榜
  viporder:[],  //充值记录
  invitelink:'', //邀请好友链接
  designer:[], //设计师列表
  designproduct:[], //设计师作品列表
  designinfo:{},//设计师信息
  notice:[], //公告
  noticedetail:{},//公告详情
  personnew:[],//个人消息列表
  setting:[],//配置数据
  viptype:[],//会员类型
  coupons:[],//满减券列表
  designlevel:{1:'设计助理',2:'设计师',3:'资深设计师',4:'设计指导'},
  publicStateName:{1:'安全雇佣',2:'审核拒绝',3:'待确认',4:'支付定金',5:'支付尾款',6:'已完成',7:'已过期',8:'已结算'},  //我的发布状态名
  acceptStateName:{1:'已竞价',3:'接受雇佣',4:'待付定金',5:'工单进行中',6:'已完成',8:'已结算'},  //我的接单状态名
  idClass:{0:'all',1:'png',2:'bjtp',3:'ui',4:'mbsc',5:'ppt',6:'syt',50:'word',51:'excel'},
  className:{'png':'免抠元素','ui':'网站UI','mbsc':'模板素材','bjtp':'背景图片','syt':'摄影图','word':'WORD','ppt':'PPT','excel':'EXCEL','all':'全部'},
  idName:{1:'免抠元素',3:'网站UI',4:'模板素材',2:'背景图片',6:'摄影图',50:'WORD',5:'PPT',51:'EXCEL',0:'全部'},
  auditRealName:{0:'未认证',1:'审核通过',2:'待审核',3:'审核拒绝'},  //实名审核状态  
  auditQQName:{0:'待审核',1:'审核拒绝',2:'未满',3:'已满'},  //QQ联盟群状态 
  softName:{'PSD':'Photoshop','AI':'Illustrator','EPS':'PostScript','CDR':'CorelDraw','SKETCE':'sketch','AE':'After Effects','C4D':'Cinema 4D','MAX':'3Dmax'},  //文件所使用软件 
  firstVip:{},  //第一个vip类型
  integral:0, //总积分
  platform_currency:0,//平台币
  wxshare:{} //微信分享所需参数
})
export const getters = {
  fullname(state){
    return 1
}
}
export const mutations = {
  metaInfo(state,metaInfo){
    state.metaInfo.title = metaInfo.title;
    state.metaInfo.keywords = metaInfo.keywords;
    state.metaInfo.description = metaInfo.description;
},
updateCount(state,num){  //num 只能一个参数，如果要传多个数据，num的object对象  {num,num2} mutation做的事情就是修改state
   state.count=num
},
startLoading (state) {
    state.loading = true
  },
endLoading (state) {
state.loading = false
},
fillNavigation(state,navigations){
    state.navigation=navigations
},
fillHomeBanner(state,homebanner){
    state.homebanner=homebanner
},
fillChannel(state,channel){
    state.defaultchannel=channel
},
fillCategory(state,category){
    state.category=category
},
fillMyProduct(state,product){
    state.myproduct=product.list
    state.countfile=product.pageParam.count
},
fillCondition(state,condition){
  state.condition=condition
},
fillDesignerStatus(state,code){
    state.designcode=code
},
doRegister(state, userInfo){
    state.user = userInfo
},
doLogin (state, userInfo) {
    state.user = userInfo
  },
// userToken(state,token){
// state.userToken=token
// }, 
//设置token
setToken(state, token) {
  // console.log('mutation',token)
    state.userToken = token;
    localStorage.setItem('token', token);
  },
setShowLogin(state, isShow) {
    state.showLogin = isShow;
  },
  setShowVip(state, isShow) {
    state.showVip = isShow;
  },
cancelToken(state) {
state.userToken = '';
localStorage.removeItem('token');
},
userStatus(state,flag)
{
  state.isLogin=flag
},
fillGoods(state,goods){
    state.goods=goods.list
    state.countfile=goods.page.count
},
fillGoodDetail(state,gooddetail){
  state.gooddetail=gooddetail
},
fillGoodorder(state,goodorder){
  state.goodorder=goodorder.list
    state.countfile=goodorder.pageData.count
    // state.countGoodOrders=goodorder.page.count
},
fillEvaluation(state,evaluation){
  state.evaluation=evaluation.list
    state.countfile=evaluation.pageParam.count
},
fillAlliance(state,alliance){
  state.alliance=alliance.list
    state.countfile=alliance.pageParam.count
},
fillAdvices(state,advice){
  state.advices=advice.list
    state.countfile=advice.pageParam.count
},
// fillSignin(state,signinfo){
// 	state.signinfo=signinfo
// },
fillWorkorder(state,workorder){
  state.workorder=workorder.list
    state.countfile=workorder.pageParam.count
},
fillWorkinfo(state,workinfo){
    state.workinfo=workinfo
},
fillpersonInfo(state,personInfo){
    state.personInfo=personInfo
},
fillworklist(state,worklist){
    state.worklist=worklist.list
    state.countfile=worklist.pageParam.count
},
fillEmploylist(state,employlist){
    state.employlist=employlist.list
    state.countfile=employlist.pageParam.count
    },
fillProductlist(state,productlist){
state.productlist=productlist.list
state.countfile=productlist.page.count
},
fillProductinfo(state,productinfo){
    state.productinfo=productinfo
    },
fillCollectlist(state,collectlist){
    state.collectlist=collectlist.list
    state.countfile=collectlist.page.count
    },
fillCommission(state,commission){
    state.commission=commission.list
    state.integral=commission.integral
    state.platform_currency=commission.platform_currency
    },
    fillInviteRank(state,ranklist){
        state.ranklist=ranklist.list
        },
    fillVipOrder(state,viporder){
        state.viporder=viporder.list
        },
// fillInvitelink(state,invitelink){
//     state.invitelink=invitelink
//     },
    fillDesigner(state,designer){
    state.designer=designer.list
    state.countfile=designer.pageParam.count
    },
fillDesignProductlist(state,designproduct){
    state.designproduct=designproduct.list
    state.countfile=designproduct.page.count
    },
fillDesignInfo(state,designinfo){
    state.designinfo=designinfo
    },
fillNotice(state,notice){
     state.notice=notice.list
     state.countfile=notice.page.count
    },
    fillNoticeDetail(state,noticedetail){
    state.noticedetail=noticedetail
},
fillHomeProduct(state,homeproductlist){
    state.homeproductlist=homeproductlist
    },
fillNew(state,personnew){
    state.personnew=personnew
    },
fillSetting(state,setting){
    state.setting=setting
    },
fillVipType(state,viptype){
    state.viptype=viptype,
    state.firstVip=viptype[0]
    }, 
fillCoupon(state,coupons){
    state.coupons=coupons.list
    }, 
    fillWxsdk(state,data){
      state.wxshare=data
      },
increment (state,num) {
    // 变更状态
    state.count=num+1
  }
}
export const actions = {
    //TODO ajax here
    fetchNavigation ({ commit }) {
      commit('startLoading')
      return model.getNavigation()  //本身是一个返回值，可以返回的
        .then(data => {
          commit('endLoading')
          commit('fillNavigation', data.data)
        })
        .catch(err => {
          handleError(err)
        })
    },
    fetchCategory ({ commit }) {
      commit('startLoading')
      return model.getCategory()  //本身是一个返回值，可以返回的
        .then(data => {
          commit('endLoading')
          commit('fillCategory', data.data.category)
        })
        .catch(err => {
          handleError(err)
        })
    },
    fetchMyProduct({ commit },formData) {
      commit('startLoading')
      return model.getMyProduct(formData)
        .then(data => {
          commit('endLoading')
          commit('fillMyProduct', data.data)
        })
        .catch(err => {
          handleError(err)
        })
    },
    
      fetchHomeBanner ({ commit },formData) {
        return model.getHomeBanner(formData)
          .then(data => {
            commit('fillHomeBanner', data.data)
          })
          .catch(err => {
            handleError(err)
          })
      },  
      fetchCondition ({ commit },formData) {
        commit('startLoading')
        return model.getCondition(formData)
          .then(data => {
            commit('endLoading')
            commit('fillCondition', data.data)
          })
          .catch(err => {
            handleError(err)
          })
      },
      fetchDefaultChannel({ commit },{token}) {
        commit('startLoading')
        return model.getDefaultChannel(token)
        .then(data => {
          commit('endLoading')
          commit('fillChannel', data.data)
        })
        .catch(err => {
          handleError(err)
        })
      }, 
      
      upImage({ commit },formData) {
        return model.upImage(formData)
      },
      upFileScource({ commit },{formData,config}) {
        return model.upFileScource(formData,config)
      },
      upMaterialImage({ commit },formData) {
        return model.upMaterialImage(formData)
      },
      upFileinfo({ commit },formData) {
        return model.upFileinfo(formData)
      },
      fetchDesignerStatus({ commit },formData) {
        commit('startLoading')
        return model.getDesignerStatus(formData)
        .then(data => {
          commit('endLoading')
          commit('fillDesignerStatus', data.code)
        })
        .catch(err => {
          handleError(err)
        })
      },
      // login ({ commit }, { username, password }) {
      //     model.login(username, password)
      //     .then(data => {
      //       commit('doLogin', data)
      //     }).catch(err => {
      //       handleError(err)
      //     })
      //   },
      // register ({ commit }, { mobile, code,nickname,password,confirm_password }) {
      //   return model.register( mobile,code,nickname,password,confirm_password)
      //  },
      register ({ commit }, formData) {
       return model.register(formData)
      },
      forgetPassword ({ commit }, formData) {
        return model.forgetPassword( formData)
       },
      login ({ commit }, { mobile,password}) {
        return model.login( mobile,password)
       },
       wechatlogin ({ commit }, {code}) {
        return model.wechatlogin(code)
       },
       logout ({ commit },formData){
        return model.logout(formData)
        // .then(data => {
        //   console.log(data)
        //   if(data.code==1){
        //     commit('cancelToken', '')
        //   }
        // })
        // .catch(err => {
        //   handleError(err)
        // })
       },
       //获取登录状态
      userLogin({commit}, flag) {
        commit("userStatus", flag)
      },
  
      settleInOne({commit},formData){
          return model.settleInOne(formData);
      },
      settleInTwo({commit},formData){
          return model.settleInTwo(formData);
      },
      savePersoninfo({commit},formData){
        return model.savePersoninfo(formData);
      },
      fetchPersoninfo({commit},userToken){
        return model.getPersoninfo(userToken)
        
      },
      //  fetchPersoninfo({commit},userToken){
      //   commit('startLoading')
      //   return model.getPersoninfo(userToken)
      //   .then(data => {
      //     commit('endLoading')
      //     commit('fillpersonInfo', data.data)
      //   })
      //   .catch(err => {
      //     handleError(err)
      //   })
      // },
      saveRealname({commit},formData){
        return model.saveRealname(formData);
      },
  
      fetchGood ({ commit },{page,pageSize}) {
        commit('startLoading')
        return model.getGood(page,pageSize)
          .then(data => {
            commit('endLoading')
            commit('fillGoods', data.data)
          })
          .catch(err => {
            handleError(err)
          })
      },
      fetchGoodDetail ({ commit },{goods_id}) {
        commit('startLoading')
        return model.getGoodDetail(goods_id)
          .then(data => { 
            commit('endLoading')
            commit('fillGoodDetail', data.data)
          })
          .catch(err => {
            handleError(err)
          })
      },
      placeOrder({commit},formData){
        return model.placeOrder(formData);
    },
    getGoodorder({commit},{page,pageSize,token}){
      commit('startLoading')
      return model.getGoodorder(page,pageSize,token)
          .then(data => {
            commit('endLoading')
            commit('fillGoodorder', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchEvaluation({commit},formData){
      commit('startLoading')
      return model.getEvaluation(formData)
          .then(data => {
            commit('endLoading')
            commit('fillEvaluation', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    upEvaluation({ commit },formData) {
      return model.upEvaluation(formData)
    },
    upAlliance({ commit },formData) {
      return model.upAlliance(formData)
    },
    fetchAlliance({commit},formData){
      commit('startLoading')
      return model.getAlliance(formData)
          .then(data => {
            commit('endLoading')
            commit('fillAlliance', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchAdvices({commit},formData){
      commit('startLoading')
      return model.getAdvices(formData)
          .then(data => {
            commit('endLoading')
            commit('fillAdvices', data.data)
          })
          .catch(err => {
            handleError(err)
          })
        },
    fetchsignIn({commit},formData){
      return model.signIn(formData)
          // .then(data => {
          //   console.log(data)
          //   commit('fillSignin', data.data)
          // })
          // .catch(err => {
          //   handleError(err)
          // })
    },
    upAdvices({ commit },formData) {
      return model.upAdvices(formData)
    },
    createWork({ commit },formData) {
      return model.createWork(formData)
    },
    fetchWorkorder({commit},formData){
      commit('startLoading')
      return model.getWorkorder(formData)
          .then(data => {
            commit('endLoading')
            commit('fillWorkorder', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchWorkinfo({commit},formData){
      commit('startLoading')
      return model.getWorkinfo(formData)
          .then(data => {
            commit('endLoading')
            commit('fillWorkinfo', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    createOffer({ commit },formData) {
      return model.createOffer(formData)
    },
    fetchWorklist({commit},formData){
      commit('startLoading')
      return model.getWorklist(formData)
          .then(data => {
            commit('endLoading')
            commit('fillworklist', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchEmploylist({commit},formData){
      commit('startLoading')
      return model.getEmploylist(formData)
          .then(data => {
            commit('endLoading')
            commit('fillEmploylist', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    createEmploy({ commit },formData) {
      return model.createEmploy(formData)
    },
    fetchProductlist({commit},formData){
      commit('startLoading')
      return model.getProductlist(formData)
          .then(data => {
            commit('endLoading')
            commit('fillProductlist', data.data)
          })
          .catch(err => {
            commit('endLoading')
            handleError(err)
          })
    },
    fetchProductinfo({commit},{id}){
      commit('startLoading')
      return model.getProductinfo(id)
          .then(data => {
            commit('endLoading')
            commit('fillProductinfo', data.data)
          })
          .catch(err => {
            commit('endLoading')
            handleError(err)
          })
    },
    confirmOrder({ commit },formData) {
      return model.confirmOrder(formData)
    },
    customerPays({ commit },formData) {
      return model.customerPays(formData)
    },
    balancePaymentPays({ commit },formData) {
      return model.balancePaymentPays(formData)
    },
    operateCollect({ commit },formData) {
      return model.operateCollect(formData)
    },
    fetchCollectlist({commit},formData){
      commit('startLoading')
      return model.getCollectlist(formData)
          .then(data => {
            commit('endLoading')
            commit('fillCollectlist', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },  
    downFile({ commit },formData) {
      return model.downFile(formData)
    },
    downContract({ commit },param) {
      return model.downContract(param)
    },
    fetchCommission({commit},formData){
      commit('startLoading')
      return model.getCommission(formData)
          .then(data => {
            commit('endLoading')
            commit('fillCommission', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchInviteList({commit}){
      commit('startLoading')
      return model.getInviteList()
          .then(data => {
            commit('endLoading')
            commit('fillInviteRank', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchVipOrder({commit},formData){
      commit('startLoading')
      return model.getVipOrder(formData)
          .then(data => {
            commit('endLoading')
            commit('fillVipOrder', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    // inviteUrl({commit},{code}){
    //   commit('startLoading')
    //   return model.inviteUrl(code)
    //       .then(data => {
    //         commit('endLoading')
    //         commit('fillInvitelink', data)
    //       })
    //       .catch(err => {
    //         handleError(err)
    //       })
    // },
    fetchDesigner({commit},formData){
      commit('startLoading')
      return model.getDesigner(formData)
          .then(data => {
            commit('endLoading')
            commit('fillDesigner', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchDesignProductlist({commit},formData){
      commit('startLoading')
      return model.getDesignProductlist(formData)
          .then(data => {
            commit('endLoading')
            commit('fillDesignProductlist', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    }, 
    fetchDesignInfo({commit},{id}){
      commit('startLoading')
      return model.getDesignInfo(id)
          .then(data => {
            console.log(data)
            commit('endLoading')
            commit('fillDesignInfo', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchNotice({commit},formData){
      commit('startLoading')
      return model.getNotice(formData)
          .then(data => {
            commit('endLoading')
            commit('fillNotice', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchNoticeDetail({commit},formData){
      commit('startLoading')
      return model.getNoticeDetail(formData)
          .then(data => {
            commit('endLoading')
            commit('fillNoticeDetail', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchNew({commit},formData){
      commit('startLoading')
      return model.getNew(formData)
          .then(data => {
            commit('endLoading')
            commit('fillNew', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchHomeProduct({commit},formData){
      commit('startLoading')
      return model.getHomeProduct(formData)
          .then(data => {
            commit('endLoading')
            commit('fillHomeProduct', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchSetting({commit},formData){
      commit('startLoading')
      return model.getSetting(formData)
          .then(data => {
            // console.log('data',data)
            commit('endLoading')
            commit('fillSetting', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    intoRead({ commit },formData) {
      return model.intoRead(formData)
    },
    payVipQd({ commit },formData) {
      return model.payVipQd(formData)
    },
    payDeposit({ commit },formData) {
      return model.payDeposit(formData)
    },
    payBalance({ commit },formData) {
      return model.payBalance(formData)
    },
    verifyToken({ commit },userToken) {
      return model.verifyToken(userToken)
    },
    fetchOrderStatus({ commit },formData) {
      return model.getOrderStatus(formData)
    },
    fetchWorkOrderStatus({ commit },formData) {
      return model.getWorkOrderStatus(formData)
    },
    fetchVipType({ commit },formData) {
      commit('startLoading')
      return model.getVipType(formData)
          .then(data => {
            commit('endLoading')
            commit('fillVipType', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    deleteFile({ commit },formData) {
      return model.deleteFile(formData)
    },
    confirmReceipt({ commit },formData) {  
      return model.confirmReceipt(formData)
    },
    luckyDraw({ commit },formData) {  
      return model.luckyDraw(formData)
    },
    fetchCoupon({ commit },formData) {
      commit('startLoading')
      return model.fullCoupon(formData)
          .then(data => {
            // console.log(data)
            commit('endLoading')
            commit('fillCoupon', data.data)
          })
          .catch(err => {
            handleError(err)
          })
    },
    fetchVeriCode({commit},formData){
      return model.getVeriCode(formData)
    },
    checkVeriCode({commit},formData){
      return model.checkVeriCode(formData)
    },
    
    bindMobile({commit},formData){
      return model.bindMobile(formData)
    },
    withDrawCoin({commit},formData){
      return model.withDrawCoin(formData)
    },
    shareSdk({commit},params){
      return model.shareSdk(params)
    },
    // shareSdk({commit},formData){
    //   return model.shareSdk(formData).then(data => {
    //     // console.log(data)
    //     commit('fillWxsdk', data.data)
    //   })
    //   .catch(err => {
    //     handleError(err)
    //   })
    // },
       increment ({ commit }) {
          commit('increment')
        }
}