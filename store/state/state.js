export default {  //需要的字段一次性声明好
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
    // isLogin: false,
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
    typeName:{'png':'免抠元素','ui':'网站UI','mbsc':'模板素材','bjtp':'背景图片','syt':'摄影图','word':'WORD','ppt':'PPT','excel':'EXCEL','all':'全部'},
    auditRealName:{0:'未认证',1:'审核通过',2:'待审核',3:'审核拒绝'},  //实名审核状态  
    auditQQName:{0:'待审核',1:'审核拒绝',2:'未满',3:'已满'},  //QQ联盟群状态 
    softName:{'PSD':'Photoshop','AI':'Illustrator','EPS':'PostScript','CDR':'CorelDraw','SKETCE':'sketch','AE':'After Effects','C4D':'Cinema 4D','MAX':'3Dmax'},  //文件所使用软件 
    firstVip:{},  //第一个vip类型
    integral:0, //总积分
    platform_currency:0,//平台币

    // publiclist:[], //我的发布
    // countGoodOrders:1,//订单数量
    test:'33'
    
}

