import home from '../models/home';
import result from '../sys/entity/result';
import dataUtil from '../sys/util/dataUtil';


import * as _ from 'lodash';


/**
 * homeService服务类
 */
class HomeService{
	/**
	 * 保存home内容
	 */
	saveEntity(req,res,param,userInfo){
		let now = new Date();
        
		let entity = {
            name:  param.name,
            content:   param.content,
            num:param.num
		}; 
		//保存订单信息
		home.saveEntity(entity).then(
			data=>{
				return res.json(result.configResult(data));
			}
		);
	}



	/**
	 * 根据关键字查询
	 */
	queryByKeyWord(req,res,param,userInfo){
		home.findByCondition({
			$or:[
				{name:new RegExp(param.keyWord)},
				{content:new RegExp(param.keyWord)}
			]
		}).then(
			data=>{
				return res.json(result.configResult(data));
			}
		);
	}
	
    /**
	 * 根据关键字查询
	 */
	queryByParam(req,res,param,userInfo){
		home.findByCondition(param).then(
			data=>{
				return res.json(result.configResult(data));
			}
		);
	}
	
}
module.exports = new HomeService();