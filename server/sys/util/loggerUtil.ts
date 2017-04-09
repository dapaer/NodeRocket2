const winston = require('winston');
winston.level = 'debug';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { 'timestamp': true });
/**
 * 日志打印工具类//TODO 待完成、待集成winston
 * @author dapaer
 */
export default class loggerUtil{

   static info(...args){
       winston.log.apply(winston, ['info'].concat(args));
    }

    static error(...args){
        winston.log.apply(winston, ['error'].concat(args));
    }

    static debug(...args){
        winston.log.apply(winston, ['debug'].concat(args));
    }

     static warn(...args){
        winston.log.apply(winston, ['warn'].concat(args));
    }

    static logRequest(url:string,param:any){
        let requestObj = {
            url:url,
            param:param
        }
        loggerUtil.info("server_requestLog:%j",requestObj);
    }

    static logHttp(method:string,url:string,param?:any){
        let requestObj:any = {
            method:method,
            url:url
        }
        if(!!param){
            requestObj.param = param;
        }
        loggerUtil.info("http_requestLog:%j",requestObj);
    }

    static logPublishQueue(name:string,pripority:string,job){
        loggerUtil.info(`publish queue: ${ name } ,pripority : ${pripority} and the job is  %j`,job);
    }

    static logProgressQueue(name:string,concurrency:number,job){
        loggerUtil.info(`progress queue: ${ name } ,concurrency : ${concurrency} and the job is  %j`,job);
    }
}
