export const secret: string = "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!";
export const length: number = 128;
export const digest: string = "sha256";


import fileUtil from "./../util/fileUtil";
import stringUtil from "./../util/stringUtil";

const appConfigJson = require("../appConfig.json");
const db = appConfigJson.db;
const appInfo = appConfigJson.appInfo;
const mongoose = require('mongoose');


/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ');  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    


export default class config{
  static secret: 'dapaer';
  static appConfigJson  = appConfigJson;
  static servicesObj:any={};
  static scanPackageDirs:any = appInfo.scanPackages;//扫描service的包路径
  //配置数据库信息
  static configDataBase(){
		if(db.databaseEngine==="mongodb"){
			//mongodb setting 判断是否设置权限校验
			let configInfoMongUrl = db.auth ? db.databaseEngine+'://'+db.userName+':'+db.passWord+'@'+db.url+':'+db.port+'/'+db.database : db.databaseEngine+'://'+db.url+':'+db.port+'/'+db.database;
			let mongoUrl = process.env.MONGODB_URI || configInfoMongUrl;
			mongoose.Promise = global.Promise;//内置使用的是bluebird,现在换成原生的,后期有空再弄
			mongoose.connect(mongoUrl, {  
				server: {
					auto_reconnect: true,
					poolSize: 10,
					socketOptions:{
						keepAlive: 1 ,
						// socketTimeoutMS: 100,
						// connectionTimeout: 100
					}
				}
			},function(err, res) {  
				if(err) {
					console.log('[mongoose log] Error connecting to: ' + configInfoMongUrl + '. ' + err);
				} else {
					console.log('[mongoose log] Successfully connected to: ' + configInfoMongUrl);
				}
			});
		}
  };
  //配置服务对象
  static configServiceObj(){
	  for(let i = 0;i<config.scanPackageDirs.length;i++){
		var fileList = fileUtil.getFileList(global['root_dirName']+this.scanPackageDirs[i]);
		for(let j = 0;j<fileList.length;j++){
			var curFile = fileList[j];
			//处理后缀名
			var fileName = curFile.name.substr(0,curFile.name.lastIndexOf('.'));
			if(curFile.name.endsWith('Service.js')){
				let humpFileName = stringUtil.changeToHump(fileName);
				config.servicesObj[humpFileName] = require(curFile.path);
			}
		}
	}
  };
}


process.on('uncaughtException',function(err){console.log('error, but oh well', err.message); })


