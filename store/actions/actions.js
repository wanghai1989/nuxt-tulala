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


  export default { 
    // setPosition: ({
    //   commit
    // }, position) => {
    //   commit('setPosition', position)
    // }
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
          // .then(data => {
          //   commit('fillHomeBanner', data.data)
          // })
          // .catch(err => {
          //   handleError(err)
          // })
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
       wechatlogin ({ commit }, formData) {
        return model.wechatlogin(formData)
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
       fetchPersoninfo({commit},formData){
        commit('startLoading')
        return model.getPersoninfo(formData)
        .then(data => {
          commit('endLoading')
          commit('fillpersonInfo', data.data)
        })
        .catch(err => {
          handleError(err)
        })
      },
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
    fetchProductinfo({commit},formData){
      commit('startLoading')
      return model.getProductinfo(formData)
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
    fetchDesignInfo({commit},formData){
      commit('startLoading')
      return model.getDesignInfo(formData)
          .then(data => {
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
            console.log(data)
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
       increment ({ commit }) {
          commit('increment')
        }
  
      }