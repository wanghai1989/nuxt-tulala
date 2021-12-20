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
    '/mine/mobile-bind'
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
        if(requireLogin.indexOf(to.path)>-1){
            if(!token) next({path: '/user/login'})
            store.dispatch('verifyToken',token).then(data => { 
                if(data.code==1){
                    store.state.userToken=token
                    const designState=store.state.personInfo.designer_status
                    if(designState==104 && to.path=='/enter/design-basic')
                    {next({path: '/enter/design-egg'})} 
                    if((designState==102 || designState==103) && to.path=='/enter/design-basic')
                    {next({path: '/enter/design-result'})} 
                        next()
                }else{
                    // localStorage.setItem('preRoute', to.fullPath);
                    // if(isMobile)
                    // next({path: '/m/mobile-login'})
                    // else
                    next({path: '/user/login'})
                }
                })
        }
        
        next()
    })
  }