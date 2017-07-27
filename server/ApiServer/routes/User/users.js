/**
 * Created by sjzhang on 2017/4/8.
 */
var URL = require('url');
var express = require('express');
var fs = require('fs');
//parse multipart/form-data
var multer = require('multer');
var destination = 'ApiServer/routes/data/images/avatar/';
var upload = multer({dest: destination});

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

// 单图上传
router.post('/upload', upload.single("avatar"), function (req, res) {
	var file = req.file;
	//以下代码得到文件后缀
	var name = file.originalname;
	var nameArray = name.split('');
	var nameMime = [];
	var l = nameArray.pop();
	nameMime.unshift(l);
	while (nameArray.length != 0 && l != '.') {
		l = nameArray.pop();
		nameMime.unshift(l);
	}
	//Mime是文件的后缀
	var Mime = nameMime.join('');
	res.send("done");
	//重命名文件 加上文件后缀
	fs.renameSync('./' + destination + file.filename, './' + destination + file.fieldname + Mime);
});


//test h5 event source
router.get('/eventsource', function (req, res) {
	console.log(111)
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");

	res.write(
		"event: myEvent" + "\n" +
		'data: {"msg": '+ Date.now() +'}\n\n'+
		'data: {"msg": "asdfsdfsdf"}\n\n'
	);

});



module.exports = router;