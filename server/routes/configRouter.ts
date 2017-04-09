import { Router, Request, Response, NextFunction } from "express";
import StringUtil from "../sys/util/stringUtil";
import DataUtil from "../sys/util/dataUtil";
import Result from "../sys/entity/result";
import config from "../sys/config/config";
import loggerUtil from '../sys/util/loggerUtil';
import { secret, length, digest } from "../config/config";

import { USER_LOG_OUT,NICKNAME_IS_NULL} from '../sys/entity/dictPub';

import {Domain,create} from 'domain';
import {EventEmitter} from 'events';

let util =  require('util');

var jwt = require('jsonwebtoken');

var winston = require('winston');

const configRouter: Router = Router();

const getUserInfo = function(token:string){
  return jwt.verify(token, secret);
}





 configRouter.all(/^\/([A-Z,a-z,0-9])+!([A-Z,a-z,0-9])+$/,function(req:Request&{isWhiteList:boolean},res:Response){
  var url =  req.url;
  var actionName = StringUtil.getActionName(url);
  var methodName = StringUtil.getMethodName(url);
  var action = config.servicesObj[actionName];
  var params:any = DataUtil.getParam(req,true);
  let userInfo = null;
  //获取用户token
  let userToken = params.access_token || req.headers['x-access-token'];
  if(!!userToken){
    try{
      userInfo =  getUserInfo(userToken);
      // if(!userInfo.nickname){
      //   res.send(new Result(userInfo._id,"昵称为空","FALSE",NICKNAME_IS_NULL,null));
      // }
      let expDate = new Date(userInfo.exp*1000).getTime();
		  let now = new Date().getTime();
      //过期
      if(expDate<now){
        res.send(new Result(null,"登录超时，请重新登录","FALSE",USER_LOG_OUT));
      }
    }catch(err){
        res.send(new Result(err.stack,"登录超时，请重新登录","FALSE",USER_LOG_OUT));
    }

  }
  
  const  pageObj = DataUtil.getPageParam(req);
  loggerUtil.logRequest(url,params);

  if(action&&util.isFunction(action[methodName])){
    var errorDomain = create();
    errorDomain.add(req);
    errorDomain.add(res);
    errorDomain.on('error', function(err) {//利用domain捕获全局error解决异步问题
      try {
        res.send(new Result(err.stack,"服务器异常,请联系管理员","FALSE"));
      } catch (err) {
        loggerUtil.error(err.stack);
        res.send(new Result(err.stack,"服务器异常,请联系管理员","FALSE"));
      }
    });
    errorDomain.run(function() {
      try {
        action[methodName](req,res,params,userInfo,pageObj);
      } catch (err) {
        loggerUtil.error(err)
        res.send(new Result(err.stack,"服务器异常,请联系管理员","FALSE"));
      }
    });
    
   }else{
      var result = new Result();
      result.configError(actionName+"类或"+methodName+"方法未实现!!!");
      res.send(result);
    }
  });

export { configRouter }
