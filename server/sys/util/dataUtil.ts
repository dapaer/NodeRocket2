let staticNum:number = 0;
const _ = require('lodash');
/**
 * 数据操作工具类
 * @author dapaer
 */
export default class dataUtil{
	/**
	 * 解析request中的基本查询参数并返回
	 * @param req request对象
	 * @returns {*}
     */
	static getParam(req,isfilterPage){
		let params = {};
		if(req.query){
			for(var key in req.query){
				if(isfilterPage&&(key==='page' || key === 'pageSize')){//除去分页情况
					continue;
				}
				params[key] = req.query[key];
			}
		}
		if(req.body){
			for(var key in req.body){
				if(isfilterPage&&(key==='page' || key === 'pageSize')){//除去分页情况
					continue;
				}
				params[key] = req.body[key];
			}
		}
		return params;
	}
	/**
	 * 设置分页信息对象(set the pageObj)
	 * @param req request对象
	 * @returns {{page: *, pageSize: *}}
     */
	static setPageParam(req){
		let params = dataUtil.getParam(req,false);
		req.session.pageObj = {page:params['page'],pageSize:params['pageSize']};
	}
	/**
	 * 获取分页信息对象(get the pageObj)
	 * @param req request对象
	 * @returns {{page: *, pageSize: *}}
	 */
	static getPageParam(req){
		let params = dataUtil.getParam(req,false);
		return {page:params['page'],pageSize:params['pageSize']};
	}

	static isEmpty(data){
        if(!data||data==""||data.length==0){
            return true;
        }
        return false;
    };
    static isFunction (func){
        return func instanceof Function;
    };
    static generateID(){
        staticNum>9? staticNum=0:staticNum++;//防止冲突
        return new Date().getTime()+staticNum;
    };

	/**
	 * 数据替换方法
	 * @param data 需要进行模版替换的数据(替换的内容用${}、{{}}或者<%- %> 包裹着即可)
	 * @param replaceObj 替换对象
	 */
	static dataReplace(data:string,replaceObj){
		let compiled = _.template(data);
		return compiled(replaceObj);
	}

	/**
	 * 获取验证码
	 * @param len 验证码位数
	 */
	static generatorValiCode(len:number){
		let now = (new Date()).getTime()+"";
		return now.slice(-len);
		//return Math.floor(Math.random()*Math.pow(10, len))
	}
	/**
	 * 随机生成一个用户名
	 */
	static generatorUserName(){
		let name = Math.random().toString(36).substr(2);
		return name;
	}

	/**
	 * 复制属性
	 * @param src 原对象
	 * @param isFilteEmpty 是否过滤空值
	 */
	static copyProperty(src,isFilteEmpty){
		let dest = {};
		for(let key in src){
			if(!!src[key]||!isFilteEmpty){
				dest[key] = src[key];
			}
		}
		return dest;
	}

	/**
	 * 获取数组里面的某个key生成keys数组
	 * @param arr 数组
	 * @param key 关键字
	 */
	static getKeysByArr(arr:Array<any>,key:string):Array<any>{
		let resultArr = [];
		arr.map(x=>{
			resultArr.push(x[key]);
		})
		return resultArr;
	}
}
