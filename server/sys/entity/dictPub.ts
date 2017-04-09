/**
 * 字典类
 * @author dapaer
 */
//系统常量true
export const SYSTEM_BOOLEAN_TRUE = "TRUE";
//系统常量false
export const SYSTEM_BOOLEAN_FALSE = "FALSE";
//验证码类常量
export const valiCode =  {
    type:{
        SIGN_UP:'SIGN_UP',
        PASSWORD_CHANGE:'PASSWORD_CHANGE'
    },
    use_way:{
        PHONE:"PHONE",
        MAIL:"MAIL"
    }
    
}
//队列优先级
export const queuePriority = {
    low:'low',
    normal: 'normal',
    high: 'high',
    medium: 'medium',
    critical: 'critical'
}

export const orderDict = {
    source:{
        manual:'MANUAL',//自主下单
        copy:'COPY',//跟单
        algo:'ALGO'//程序算法
    },
    state:{
        pending:'PENDING',//等待确认
        filled:'FILLED',//全部完成
        partial:'PARTIAL',//部分完成
        rejected:'REJECTED',//被拒绝
        canceled:'CANCELED'//取消
    },
    operation:{
        SELL:'sell',//卖
        BUY:'buy'//买
    }
}

//登录token过期时间 
export const SYSTEM_TOKEN_EXPIRES_MAX = 86400;
//邮箱激活token过期时间
export const SYSTEM_TOKEN_EXPIRES_1D = 86400;
//10分钟 = 600 sec
export const SYSTEM_TIME_10MIN = 600;
//1分钟 = 60 sec
export const SYSTEM_TIME_1MIN = 60;

//用户未登录
export const USER_LOG_OUT = "USER_LOG_OUT";
//用户未设置昵称
export const NICKNAME_IS_NULL = "NICKNAME_IS_NULL";