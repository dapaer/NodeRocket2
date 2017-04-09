const _ = require('lodash');
const mongoose = require("mongoose");	//	顶会议用户组件
const Schema = mongoose.Schema;	//	创建模型

async function syncFindPageByCondition(qObj,page,ctrlEntity) {
	var data = await executeFn(ctrlEntity,ctrlEntity.find,qObj,null,{skip:((page.page*1)-1)*(page.pageSize*1),limit:page.pageSize*1});
	var count = await executeFn(ctrlEntity,ctrlEntity.count,qObj);
	page.count = count;
	return {
		$data:data,
		$pageInfo:page
	};
}

async function syncFindPageByConditionWithPopulate(qObj,page,populate,ctrlEntity) {
    let result = await new Promise((res,rej)=>{
        ctrlEntity.find(qObj,null,{skip:((page.page*1)-1)*(page.pageSize*1),limit:page.pageSize*1})
		.populate(populate)
		.exec(async (err, data) => {
			if(err){
				throw err;
			}
			page.count = await executeFn(ctrlEntity,ctrlEntity.count,qObj);
            res({
		        $data:data,
		        $pageInfo:page
        	});
		})
    })
    return result;
}





var initSchema = function(obj){
    var schema = new Schema(obj);
    schema.statics.saveEntity=function(entity){
        //console.log("you call save",entity,this.create)
        return executeFn(this,this.create,entity);
    }

	
    /**
     * 分页查询
     * @param qObj 查询条件
     * @param page 分页对象
     */
    schema.statics.findPageByCondition=function(qObj,page){
       var curEntity = this;
       return new Promise(function(resolve,rej) {
		   syncFindPageByCondition(qObj,page,curEntity).then(function(data){
            	resolve(data);
		   })
                
		});
    };

    /**
     * 分页查询
     * @param qObj 查询条件
     * @param populate 关联查询关键字
     * @param page 分页对象
     */
    schema.statics.findPageByConditionWithPopulate=function(qObj,populate,page){
       var curEntity = this;
       return new Promise(function(resolve,rej) {
		   syncFindPageByConditionWithPopulate(qObj,page,populate,curEntity).then(function(data){
            	resolve(data);
		   })
                
		});
    };

    //只返回一条记录
    schema.statics.findOneByCondition=function(qObj,fields,options){
        return executeFn(this,this.findOne,qObj,fields,options);
    };

    schema.statics.findByCondition=function(qObj,cond?,fields?){
        if(!!fields&&!!cond){
         return executeFn(this,this.find,qObj,fields,cond);
        }
        if(!!cond){
            return executeFn(this,this.find,qObj,null,cond);
        }
        return executeFn(this,this.find,qObj);
        
    };
    schema.statics.queryById=function(id){
        return executeFn(this,this.findById,id);
    };

    schema.statics.updateEntity = function(qObj,sObj){
        if(!_.has(sObj,'$set')){
            sObj = {'$set':sObj};
        }
        return executeFn(this,this.update,qObj,sObj);
    };

    schema.statics.countByParam=function(qObj){
        return executeFn(this,this.count,qObj);
    };

    schema.statics.deleteEntity = function(condition){
        return executeFn(this,this.remove,condition);
    };
  /*  shcema.statics.findOne=function(entity){
        return executeFn(this,this.findOne,entity);
    }*/
    return schema;
}

var executeFn = function(obj,fn,...args){
   // console.log('args',args,obj);
    return new Promise(function(resolve,rej) {

        args.push(function(err,data){
          //  console.log('args',args,err);
        if(err){
            console.log("mongodb run err",err);
            throw "mongodb run err"
        }
            resolve(data);
        });
        fn.apply(obj,args);
    });
}

export default {
    initSchema:initSchema,
    model:function(tableName,schema){
        return mongoose.model(tableName,schema);
    }
}