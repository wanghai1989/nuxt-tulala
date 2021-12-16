import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

// const isDev = process.env.NODE_ENV === 'development'
// export default ()=>{
//     return new Vuex.Store({   //每次服务器端渲染都需要新生成一个store，所以用方法
//     //    strict:isDev,  //true时，外部就无法修改数据了
//        state:defaultState,
//        mutations,  //通过mutations修改初始化数据  es6写法
//        getters,
//        actions
          
//     })
// }


export default () => {
    const store = new Vuex.Store({
    //   strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    })
  
    if (module.hot) {  //加入不会刷新页面
      module.hot.accept([
        './state/state',
        './mutations/mutations',
        './actions/actions',
        './getters/getters'
      ], () => {
        const newState = require('./state/state').default
        const newMutations = require('./mutations/mutations').default
        const newActions = require('./actions/actions').default
        const newGetters = require('./getters/getters').default
  
        store.hotUpdate({
          state: newState,
          mutations: newMutations,
          getters: newGetters,
          actions: newActions
        })
      })
    }
  
    return store
  }
  