const nodemailer = require('nodemailer');
import config from '../config/config';
const appConfigJson = require("../appConfig.json");
const yunpian = appConfigJson.yunpian;
import dataUtil from '../util/dataUtil';
import request from '../util/httpHelper';
//获取email相关配置信息

const mailInfo = config.appConfigJson.mail;
const transporter = nodemailer.createTransport({
    host:mailInfo.host,
    port: mailInfo.post,
    auth: {
        user: mailInfo.account,
        pass: mailInfo.password
    }
});

/**
 * 附件接口
 * @author dapaer
 */
interface attachment {
  //文件名称
  filename: string;
  //文件内容
  content?:any;
  //文件路径（和content不兼容）
  path?:string;
  //编码
  encoding?:string;

}

/**
 * 消息工具类
 * @author dapaer
 */
export default class messageUtil{
    /**
     * 发送email
     * @param toEmail 收件人
     * @param subject 主题
     * @param text text
     * @param html html内容
     * @param attachments 附件数组
     */
       static sendEmail(toEmail:string,subject:string,text:string,html:string,attachments?:Array<attachment>){
        return new Promise(function(resolve,rej) {
            transporter.sendMail({
                        from: mailInfo.account,
                        to: toEmail,
                        subject:subject,
                        text: text,
                        html:html,
                        attachments:attachments
                    },function(err,data){
                        if(err){
                            rej(err)
                            console.log(err);
                        }
                        resolve(data);
                    });
        })
    }

    /**
     * 通过云片网发送短信验证码
     * 
     * @static
     * @param {string} code
     * @param {string} mobile
     * @returns
     * 
     * @memberOf messageUtil
     */
    static sendSms(code:string,mobile:string){
        var postData = {  
            'apikey': yunpian.apikey,
            'mobile':mobile,
            'tpl_id':yunpian.tpl_id,
            'tpl_value':dataUtil.dataReplace(yunpian.tpl_value,{code:code}),  
        };
        let url:string = "";
        url += yunpian.sms_host;
        url += yunpian.send_tpl_sms_uri;
        return request.post(url,postData);
    }
}
