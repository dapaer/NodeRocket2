/**
 * 字符串处理工具类
 * @author dapaer
 */
export default class stringUtil{
	/**
	 *获取Action名称
	 *url url
	 **/
	static getActionName(url) {
		var expStr = url.split('!');
		var tempArr = expStr[0].split('/');
		return tempArr[tempArr.length - 1];
	}
	/**
	 *获取Action名称
	 *url url
	 **/
	static getMethodName(url) {
		var arr = url.split('!');
		return arr[arr.length - 1].split('?')[0];
	}
	/**
	 * 转换成驼峰命名
	 * @param str 要转换的字符串
	 * @returns {string}
	 * @author dapaer
     */
	static changeToHump(str){
		var firstChat = str[0].toLocaleLowerCase();
		if(str.length==1){
			return firstChat;
		}
		return firstChat.toLocaleLowerCase()+str.substr(1,str.length-1);
	}

}
