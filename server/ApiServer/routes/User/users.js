/**
 * Created by sjzhang on 2017/4/8.
 */
var URL = require('url');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var UserInfoData = require("../data/UserInfoData.json");
var defaultUserInfo = {
	avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495356687735&di=570b69de6951aee4db230ed9ec360d72&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fgif%2Fw%2F63%2F68.jpg",
	nickName: "嗨",
	signature: "这个人太懒，什么都没有留下"
};
router.get('/getUserInfo', function (req, res) {
	var params = URL.parse(req.url, true).query;
	var uid = params.uid;
	var data = UserInfoData[uid] || defaultUserInfo;
	var response = {error_code: 0, data: data};
	res.send(JSON.stringify(response));

});

router.post('/updateUserInfo', function (req, res) {
	//没有验证token
	var response = {error_code: 0};
	var params = req.body;
	if (!params || !params.uid) {
		response.error_code = 1;
		response.msg = "input error";
		res.send(JSON.stringify(response));
		return;
	}

	var uid = params.uid;
	// if (!UserInfoData[uid]) {
	// 	response.error_code = 1;
	// 	response.msg = "user info is not exist";
	// 	res.send(JSON.stringify(response));
	// 	return;
	// }

	var dataInfo = UserInfoData[uid] || defaultUserInfo;
	var data = {};
	dataInfo = Object.assign({}, dataInfo, params);
	UserInfoData[uid] = dataInfo;

	fs.writeFile('./ApiServer/routes/data/UserInfoData.json', JSON.stringify(UserInfoData), function (err) {
		if (err) {
			response.error_code = 2;
			response.msg = "db error";
		} else {
			response.error_code = 0;
			response.msg = "success";
		}
		res.send(JSON.stringify(response));
	});
});

module.exports = router;