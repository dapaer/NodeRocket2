import {  Request, Response, NextFunction } from "express";
import  config  from "./config";

import StringUtil from "./../util/stringUtil";

import DataUtil from "./../util/dataUtil";

import Result from "../entity/result";

import { secret, length, digest } from "../config/config";

import { USER_LOG_OUT } from '../entity/dictPub'


export const whiteListInterceptor = function(req: Request&{isWhiteList:boolean}, res: Response, next) {
    let whiteList = config.appConfigJson.appInfo.whitelist;
    let url =  req.url;
    let actionName = StringUtil.getActionName(url);
    let methodName = StringUtil.getMethodName(url);
    let params:any = DataUtil.getParam(req,true);
    if(whiteList[actionName]&&whiteList[actionName].indexOf(methodName)>=0){
        req.isWhiteList = true;
        next();
    }else{
        //获取用户token
        let userToken = params.access_token || req.headers['x-access-token'];
        if(!userToken){
            let result = new Result();
            result.configError("用户未登录",USER_LOG_OUT);
            res.send(result);
        }else{
            next();
        }
    }
}