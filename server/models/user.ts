var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
import dataUtil from '../sys/util/dataUtil';
const bcrypt = require('bcrypt');

import schemaHelper from "../sys/util/schemaHelper";
let entityScheMa =schemaHelper.initSchema({
  nickname:{
    type: String,
  },
  username: {
    type: String
  },
  avatar:{thumb:String, url:String},
  email: {
    type: String,
    lowercase: true,
    //unique: true,
  },
  password: {
    type: String
  },
  mobile:{
    mobile:String,
    countrycode:String
  },

  social: {

    wechat:{},
    facebook:{}
  },
  meta: {
    age: Number,
    website: String
  },
  copiers:[{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  stock:{
    recent:[{  //  最近访问过的股票
      type: Schema.Types.ObjectId, ref: 'AssetInfo'
    }],  
    watch:[{ // 关注的股票
      type: Schema.Types.ObjectId, ref: 'AssetInfo'
    }],   
  },
  brokers:[{
    type: Schema.Types.ObjectId, ref: 'Broker'
  }],
  balance: {  // 用户账户金额
    HKD:Number,
    RMB: Number,
    USD: Number,
  },
  type:String, //trial （模拟用户),regular (普通用户,无港股 深度行情),professinoal(付费用户), algo(程式交易用户)
  //timestamps:true,
  salt: String,
  created_at: Date,
  updated_at: Date,
});

// Saves the user's password hashed (plain text password storage is not good)
entityScheMa.pre('save', function (next) {
  const user = this;
  if (this.password &&(this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
entityScheMa.methods.comparePassword = function(pw) {
  return new Promise((resolve,rej) =>{
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        rej(err);
      }
      resolve(isMatch);
    });
  });
};


export default schemaHelper.model('User', entityScheMa); 