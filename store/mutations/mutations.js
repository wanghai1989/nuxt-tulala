



export default {
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
//  isLogin(state){
//   if(localStorage.getItem('userToken')){
//      state.userToken=localStorage.getItem('userToken')
//   }else{
//      state.userToken=''
//   }
//  },

    increment (state,num) {
        // 变更状态
        state.count=num+1
      }
}