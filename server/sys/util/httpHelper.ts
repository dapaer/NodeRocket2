const request = require('request');
import loggerUtil from './loggerUtil';
interface proxyObj{
    proxy:string,
    post?:string
}

/**
 * 获取代理url
 * @param proxyObj 代理对象
 */
let getProxyUrl = function(proxyObj:proxyObj){
    return proxyObj.post? proxyObj.proxy+':'+proxyObj.post : proxyObj.proxy;
}

/**
 * http请求帮助类
 * @author dapaer
 */
export default class httpHelper{
    /**
     * get方式请求调用
     * @param url 请求地址
     */
    static get(url:string){
        return new Promise(function(resolve,rej) {
            loggerUtil.logHttp("get",url);
            request.get(url,function(err,httpResponse, data){
                if(!!err){
                    loggerUtil.error("http_post_err",err);
                }
                resolve(data);
            });
         }); 
    }

    /**
     * post方式请求调用
     * @param url request url
     * @param postData request params
     * 
     */
    static post(url:string,postData){
        loggerUtil.logHttp("post",url,postData);
        return new Promise(function(resolve,rej){
            request.post({url:url, form: postData}, function(err,httpResponse,data){ 
                if(!!err){
                    loggerUtil.error("http_post_err",err);
                }
                resolve(data);
             })
        })
    }

    /**
     * get方式请求代理调用
     * @param url 请求地址
     * @param proxy 代理对象{proxy;url,post:post}
     */
    static proxyGet(url:string,proxy:proxyObj){
        let proxyUrl = getProxyUrl(proxy);
        loggerUtil.logHttp("getProxy",proxyUrl);
        let r = request.defaults({'proxy':proxyUrl});
         return new Promise(function(resolve,rej) {
            r.get(url,function(err,httpResponse, data){
                if(!!err){
                    loggerUtil.error("http_post_err",err);
                }
                resolve(data);
            });
         }); 
    }

    /**
     * post方式请求调用
     * @param url request url
     * @param postData request params
     * @param proxy 代理对象{proxy;url,post:post}
     */
    static proxyPost(url:string,postData,proxy:proxyObj){
        let proxyUrl = getProxyUrl(proxy);
        loggerUtil.logHttp("postProxy",proxyUrl,postData);
        let r = request.defaults({'proxy':proxyUrl});
        return new Promise(function(resolve,rej){
            r.post({url:url, form: postData}, function(err,httpResponse,data){ 
                if(!!err){
                    loggerUtil.error("http_post_err",err);
                }
                resolve(data);
             })
        })
    }
}
