/**
 * Created by sjzhang on 2017/4/8.
 */
var express = require('express');
var apiServer = express();
///=======路由信息 （接口地址）开始 存放在./routes目录下===========//
var users = require('./routes/User/users'); //用户接口
apiServer.use('/users', users);//在app中注册users接口

module.exports = apiServer;