const fs = require('fs');
import {existsSync,writeFile,mkdirSync} from 'fs';
import {join} from 'path';

/**
 * 文件操作工具类
 * @author dapaer
 */
export default class fileUtil {

    /**
     * 遍历文件夹
     * @param path 文件路径
     * @author dapaer
     * @returns {Array}
     */
    static getFileList(path:string)
    {
        var filesList = [];
        fileUtil.readFile(path,filesList);
        return filesList;
    }

    /**
     * 读取文件夹所有文件，此处采取同步读取策略
     * @param path 文件路径
     * @param filesList 文件对象存储数组：[{size:xxx,name:xxx,path:xxx}]
     */
    static readFile(path:string,filesList:any)
    {
        var files = fs.readdirSync(path);//需要用到同步读取
        files.forEach(walk);
        function walk(file)
        {
            var states = fs.statSync(path+'/'+file);
            if(states.isDirectory())
            {
                fileUtil.readFile(path+'/'+file,filesList);
            }
            else
            {
                //创建一个对象保存信息
                let obj = new FileInfo(states.size,file,path+'/'+file);
                filesList.push(obj);
            }
        }
    }

    /**
     * 写文件操作
     * @param fileName 文件名
     * @param data 数据
     */
    static writeFile(fileName:string,data:any,)
    {
        return new Promise((res,rej)=>{
             fs.writeFile(fileName,data,'utf-8',function(err)
            {
                if(err){
                    throw err;
                }
                res(fileName);
            });
        })
       
        
    }

    static existFile(path:string){
        try{
            fs.accessSync(path,fs.F_OK);
        }catch(e){
            return false;
        }
        return true;
    }

    /**
     *  将base64转为png文件
     */
    static writeBase64ToPng(fileName:string,data){
        var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        
        let path = join(global['root_dirName'], '../public', '/uploads/');;
        let isExist = fileUtil.existFile(path);
        if(!isExist){
            mkdirSync(path);
        }
        let fullName = path+fileName;
        return fileUtil.writeFile(fullName,dataBuffer)
    }

} ;

/**
 * 文件信息对象
 * @author dapaer
 */
class FileInfo{
    constructor(
        public size:number,
        public name:string,
        public path:string
    ){

    }
}

