import request from '../util/httpHelper';
import dataUtil from '../util/dataUtil';
const appConfigJson = require("../appConfig.json");
const wechat = appConfigJson.wechat;
/**
 * wechat
 * 
 * @class wechatService
 */
class wechatService{
	/**
	 * 获取get wechat code url
	 */
	getWechatOauthCode(redirectUri:string) {
		let url:string = "https://open.weixin.qq.com/connect/qrconnect?";
		url += "appid=" 
		url += wechat.appid;
		url += "&response_type=" 
		url += wechat.response_type;
		url += "&redirect_uri=" 
		url += dataUtil.isEmpty(redirectUri)?wechat.redirect_uri:redirectUri;
        url += "&scope=";
        url += wechat.scope;
		return url;
	};
	/**
	 * 获取access_token
	 */
	getWechatOauthToken(redirectUri:string,code) {
		let url:string = "https://api.weixin.qq.com/sns/oauth2/access_token?";
		url += "appid=" 
		url += wechat.appid;
		url += "&code=" 
		url += code;
		url += "&grant_type=" 
		url += dataUtil.isEmpty(redirectUri)?wechat.redirect_uri:redirectUri;
        url += "&secret=";
        url += wechat.secret;
		return request.get(url);
	};
	/**
	 * 获取对象
	 */
	getWechatEntity(openid,accessToken) {
		let url:string = "https://api.weixin.qq.com/sns/userinfo?";
		url += "openid=" + openid;
		url += "&access_token=" + accessToken;
		return request.get(url);
	};
}
module.exports = new wechatService();