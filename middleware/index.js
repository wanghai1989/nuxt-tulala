export default function({route,store,redirect}){
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
//     let isMobile=to.meta.mobile
//     let token =localStorage.getItem('token')
//     if(requireLogin.indexOf(route.path)>-1) {
//           store.dispatch('verifyToken',token).then(data => { 
//             if(data.code==1){
//               const designState=store.state.personInfo.designer_status
//               if(designState==104 && to.path=='/enter/design-basic')
//                  {next({path: '/enter/design-egg'})} 
//               if((designState==102 || designState==103) && to.path=='/enter/design-basic')
//                  {next({path: '/enter/design-result'})} 
//                   next()
//             }else{
//               if(isMobile)
//               next({path: '/m/mobile-login'})
//               else
//               next({path: '/user/login'})
//             }
//           })
// }
}