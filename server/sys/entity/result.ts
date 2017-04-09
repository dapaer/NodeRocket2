import {SYSTEM_BOOLEAN_TRUE,SYSTEM_BOOLEAN_FALSE} from "./dictPub"

/**
 * 结果集实体类
 * @author dapaer
 */
export default class Result{
	public obj : any;
	//消息：表达当前结果集的情况，eg.success＝"FALSE"时，改信息显示报错内容
	public message:string;
	//改请求是否成功的唯一标识
	public success:string = SYSTEM_BOOLEAN_TRUE;

	//返回编码
	public code:string;

	//分页参数
	public pageInfo:any;

	constructor(obj ?: any,message?:string,success?:string,code?:string,pageInfo?:any){
		if(obj){
			this.obj = obj;
		}
		if(message){
			this.message = message;
		}
		if(success){
			this.success = success;
		}
		if(code){
			this.code = code;
		}
		if(pageInfo){
			this.pageInfo = pageInfo;
		}
		if(code){
			this.code = code;
		}
	}

	configError(message:string,code?:string){
		this.success = SYSTEM_BOOLEAN_FALSE;
		this.message = message;
		this.code = code;
	}

	/**
	 * 将global的配置移动至此处
	 */
	static configResult(obj:any,message?:string,success?:string,code?:string){
		if(obj.$pageInfo&&obj.$data){//如果是分页的情况
			return new Result(obj.$data,message,success,code,obj.$pageInfo);
		}
		return new Result(obj,message,success);
	}
}



