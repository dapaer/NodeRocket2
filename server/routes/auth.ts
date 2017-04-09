import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config/config";
import result from "../sys/entity/result";
import dataUtil from "../sys/util/dataUtil";

var jwt = require('jsonwebtoken');

var winston = require('winston');

const authRouter: Router = Router();

var User = require('../models/user');  

 authRouter.post('/signup', function(req, res) {
    winston.info("entering signup",req.body.username , " password:" + req.body.password);
    if(!req.body.username || !req.body.password) {
      res.json({ success: false, message: 'Please enter username and password.' });
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
       winston.info("saving user");
      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          winston.error("create user error", err);
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
  });

  // Authenticate the user and get a JSON Web Token to include in the header of future requests.
  authRouter.post('/signin', function(req, res) {
    winston.info("enter sign in with user ",req.body.username , " password:" + req.body.password );
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  });
export { authRouter }
