import request from '../util/httpHelper';
import dataUtil from '../util/dataUtil';
const appConfigJson = require("../appConfig.json");
const facebook = appConfigJson.facebook;
const proxy = appConfigJson.proxy;
/**
 * facebook
 * 
 * @class facebookService
 */
class facebookService{
	/**
	 * 获取get facebook code url
	 */
	getFacebookOauthCode(redirectUri:string) {
		let url:string = "https://www.facebook.com/v2.8/dialog/oauth?";
		url += "client_id=" 
		url += facebook.client_id;
		url += "&scope=" 
		url += facebook.scope;
		url += "&redirect_uri=" 
		url += dataUtil.isEmpty(redirectUri)?facebook.redirect_uri:redirectUri;
		return url;
	};
	/**
	 * 获取access_token
	 */
	getFacebookOauthToken(redirectUri:string,param) {
		let url:string = "https://graph.facebook.com/v2.8/oauth/access_token?";
		url += "client_id=" + facebook.client_id;
		url += "&scope=" + facebook.scope;
		url += "&redirect_uri=" 
		url +=  dataUtil.isEmpty(redirectUri)?facebook.redirect_uri:redirectUri;
		url += "&client_secret=" + facebook.client_secret; 
		url += "&code=" + param.code;
		if(proxy.proxy){
			let proxyObj = {
						proxy:proxy.proxy,
						post:proxy.port
					}
			return request.proxyGet(url,proxyObj);
		}else{
			return request.get(url);
		}
		
	};
	/**
	 * 获取facebook对象
	 */
	getFacebookEntity(accessToken) {
		let url:string = "https://graph.facebook.com/v2.8/me?";
		url += "client_id=" + facebook.client_id;
		url += "&fields=" + "id%2Cfirst_name%2Clast_name%2Cemail%2Cpicture%2Cname";
		url += "&access_token=" + accessToken;
		if(proxy.proxy){
			let proxyObj = {
						proxy:proxy.proxy,
						post:proxy.port
					}
			return request.proxyGet(url,proxyObj);
		}else{
			return request.get(url);
		}
	};
}
module.exports = new facebookService();