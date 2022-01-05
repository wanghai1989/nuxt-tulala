/* 挂载导航路由守卫 */
const requireLogin=[
    '/mine',
    '/mine/upload-file',
    '/mine/my-file',
    '/mine/my-collect',
    '/mine/down-record',
    '/mine/my-works',
    '/mine/my-goodorder',
    '/mine/person-info',
    '/mine/vip-info',
    '/mine/basic-info',
    '/mine/basic-info',
    '/mine/mobile-bind',
    '/vip/pay-vip',
    '/m/mobile-mine',
    '/m/mobile-taskpublic',
    '/m/mobile-taskaccept',
    '/m/mobile-invite'
]
export default ({
    app,
    store
  })=>{
        // to 将访问的路径
        // from 代表从那个路径跳转而来
        // next 是一个函数，表示放行 next（'/login'） 强制跳转
    app.router.beforeEach((to, from, next) => {
        const token =localStorage.getItem('token')
        const isMobile=to.path.indexOf('/m/')==-1?false:true
        
        if(isMobile){
            if(requireLogin.indexOf(to.path)>-1){
                if(!token) {  next({path: '/m/mobile-login',query:{backUrl:to.path}})    } 
                else{
                    store.dispatch('verifyToken',token).then(data => { 
                        if(data.code==1){
                            store.commit('setToken', token)
                            store.dispatch('fetchPersoninfo',token).then(data => { 
                                store.commit('fillpersonInfo', data.data)
                                next()
                            })
                        }else{
                            store.commit('cancelToken', token)
                            next( next({path: '/m/mobile-login',query:{backUrl:to.path}})  )
                        }
                    })
                }
            }
            else{
                if(token)  store.commit('setToken', token)
                next()
            }
        }else{
                store.dispatch('verifyToken',token).then(data => { 
                    if(data.code==1){
                        store.commit('setToken', token)
                        store.dispatch('fetchPersoninfo',token).then(data => { 
                            store.commit('fillpersonInfo', data.data)
                            const designState=store.state.personInfo.designer_status
                            if(designState==104 && to.path=='/enter/design-basic')
                            {next({path: '/enter/design-egg'})} 
                            if((designState==102 || designState==103) && to.path=='/enter/design-basic')
                            {
                                next({path: '/enter/design-result'})
                            } 
                            })
                        next()
                    }
                    else{
                        store.commit('cancelToken', token)
                        if(requireLogin.indexOf(to.path)>-1){
                            // localStorage.setItem('preRoute', to.path);
                            next({path: '/user/login',query:{backUrl:to.path}})     
                        }
                        next()  
                    }
                })
           
        }
    })
  }