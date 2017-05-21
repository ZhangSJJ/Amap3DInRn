/**
 * Created by sjzhang on 2017/4/8.
 */
var URL = require('url');
var express = require('express');
var router = express.Router();
var TextData = require("../../TextData")
router.get('/getUserInfo', function (req, res, next) {
	var params = URL.parse(req.url, true).query;

	var uid = params.uid;
	var data = TextData[uid] || {
			avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495356687735&di=570b69de6951aee4db230ed9ec360d72&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fgif%2Fw%2F63%2F68.jpg",
			nickName: "嗨",
			signature: "这个人太懒，什么都没有留下"
		};
	var response = {error_code: 0, data: data};
	res.send(JSON.stringify(response));

});

module.exports = router;