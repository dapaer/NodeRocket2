import fileUtil from '../util/fileUtil';
import dataUtil from '../util/dataUtil';
import result from '../entity/result';
import * as formidable from 'formidable';
import { SYSTEM_BOOLEAN_FALSE } from '../entity/dictPub';
const fs = require('fs');
/**
 * fileService
 */
class fileService{
	 async uploadBase64ToPng(req,res,param){
        let png_extName = '.png';
        let fileName = await fileUtil.writeBase64ToPng(dataUtil.generateID()+png_extName,param.base64);
        res.send(result.configResult(fileName['split']('/public')[1]));
    }
    upload(req, res, params){
		var message = '';
		var form = new formidable.IncomingForm();   //创建上传表单
		form.encoding = 'utf-8';        //设置编码
        let dir = 'upload/';
		form.uploadDir = 'public/'+dir;     //设置上传目录
		form.keepExtensions = true;     //保留后缀
		form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

		form.parse(req, function(err, fields, files) {
			if (err) {
				console.log(err);
                res.send(result.configResult({},"服务器更新维护中请稍后",SYSTEM_BOOLEAN_FALSE));
			}

			var filename = files.file.name;

			// 对文件名进行处理，以应对上传同名文件的情况
			var nameArray = filename.split('.');
			var type = nameArray[nameArray.length-1];
			var name = '';
			for(var i=0; i<nameArray.length-1; i++){
				name = name + nameArray[i];
			}
			var rand = Math.random()*100 + 900;
			var num = (new Date()).getTime();

			var avatarName = name + num +  '.' + type;

			var newPath = form.uploadDir + avatarName ;
			fs.renameSync(files.file.path, newPath);  //重命名

            res.send(result.configResult(`/${dir}${avatarName}`));
			
		});
	}
}
module.exports = new fileService();