const redis = require("redis");
const cache = require("../appConfig").cache;
import dataUtil from "./dataUtil"; 
let cacheOptions:any = {
	host:cache.host,
	post:cache.post,
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            throw new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            throw new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
};




//判断是否需要权限验证
if(cache.isAuth){
	cacheOptions.password = cache.password;
}

let client = redis.createClient(cacheOptions);

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function () {
    console.log("client connect... ");
});

client.on("reconnecting", function () {
    console.log("client reconnecting... ");
});

/**
 * 缓存操作工具类
 * @author dapaer
 */
export default class cacheUtil{
	/**
     * 设置字符串缓存(系统自动序列化值)
     * @param key 缓存的键
     * @param val 缓存的值（可以是任意类型，系统帮忙做了序列化）
     */
    static setStringCache(key:string,val:any){
        return new Promise((resolve,rej)=>{
            client.set(key,JSON.stringify(val),(err,reply)=>{
                resolve(reply);
            })
        })
    }

    /**
     * 根据多个key获取多个val
     */
    static getMStringCache(...key:string[]){
        return new Promise((resolve,rej)=>{
            client.mget(key,(err,reply)=>{
                resolve(reply);
            })
        })
    }

     //获取字符串缓存
    static getStringCache(key:string){
        return new Promise((resolve,rej)=>{
            client.get(key,(err,reply)=>{
                resolve(JSON.parse(reply));
            })
        })
    }

    /**
     * 设置hex缓存(系统不自动序列化，需要序列号的请自行调用)
     * @param cacheName 缓存名称
     * @param obj 要求key＝》val对象
     */
    static setHexCahce(cacheName:string,obj:any){
             return new Promise((resolve,rej)=>{
                client.hmset(cacheName,obj,(err,reply)=>{
                    resolve(reply);
                })
            })
    }

    /**
     * 添加hex缓存的键值
     * @param cacheName 缓存名称
     * @param obj 要求key＝》val对象
     */
    static addHexCahce(cacheName:string,key:string,val:string){
             return new Promise((resolve,rej)=>{
                client.hset(cacheName,key,val,(err,reply)=>{
                    resolve(reply);
                })
            })
    }

    /**
     * 获取对象hex缓存里面的某个key对于的值，key不传则获取该缓存的所有对象
     * @param cacheName 缓存名称
     * @param key key(可以不传)
     */
    static getHexCahce(cacheName:string,key?:string){
        if(dataUtil.isEmpty(key)){
             return new Promise((resolve,rej)=>{
                client.hgetall(cacheName,(err,reply)=>{
                    resolve(reply);
                })
            }) 
        }
        return new Promise((resolve,rej)=>{
            client.hget(cacheName,key,(err,reply)=>{
                resolve(reply);
            })
        })
    }

   

}



//cacheUtil.getHexCahce("user2","name").then(data=>console.log(data));
//cacheUtil.setHexCahce("user2",{age:20,sex:'male'}).then(data=>console.log(data));
cacheUtil.getHexCahce("user2").then(data=>console.log(data));
cacheUtil.setStringCache("mike2",{age:20,sex:"male"});
cacheUtil.getStringCache("mike").then(data=>console.log(data));