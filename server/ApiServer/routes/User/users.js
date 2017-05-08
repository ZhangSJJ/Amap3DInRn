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
			avatar: "http://photo.blog.sina.com.cn/showpic.html#blogid=4b31056f0102wswa&url=http://album.sina.com.cn/pic/001nn8Mnzy77Qqaijl4b6",
			nickName: "嗨",
			signature: "这个人太懒，什么都没有留下"
		};
	var response = {error_code: 0, data: data};
	res.send(JSON.stringify(response));

});

module.exports = router;