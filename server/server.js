/**
 * Created by sjzhang on 2017/5/8.
 */
var app = require('./ApiServer/apiServer');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var position = {
    '866947020186826': {
        latLng: [31.970313317491032, 118.75170203065447],
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2579044471,4108191309&fm=26&gp=0.jpg',
        onLine: true
    }
};

setInterval(function () {
    io.emit('share_position', position);
    // console.log(convertLongTime(Date.now()), position)
}, 3000);

io.on('connection', function (socket) {
    socket.roomIdDict = [];// 避免聊天室重复创建（A发起聊天，B也发起聊天）
    socket.toUsers = [];// 避免聊天室重复创建（A向B重复发起聊天）
    socket.on('share_position', function (obj) {
        //向所有客户端广播发布的消息
        position = Object.assign(position, obj);
        if (!socket.iMei) {
            socket.iMei = Object.keys(obj)[0];
        }
    });

    socket.on('clear_position', function (iMei) {
        //向所有客户端广播发布的消息
        // io.emit('clear_position', iMei);
        position[iMei] && (position[iMei].onLine = false);
        io.emit('share_position', position);
        delete position[iMei];
    });

    socket.on('disconnect', function () {
        position[socket.iMei] && (position[socket.iMei].onLine = false);
        io.emit('share_position', position);
        delete position[socket.iMei];
    });


    /***************chat*****************/
    socket.on("lunch_private_chat", function (data) {
        console.log('==========' + data.fromUid + "向" + data.toUid + "发起聊天");

        console.log("socket.roomIdDict", socket.roomIdDict)
        console.log("socket.toUsers", socket.toUsers)

        if (socket.roomIdDict.indexOf(data.roomId) > -1 || socket.toUsers.indexOf(data.toUid) > -1) {
            console.log("聊天室已经存在!roomId：" + data.roomId);
            return;
        }

        io.emit(data.toUid, {
            action: "lunch_private_chat",
            fromUid: data.fromUid,
            toUid: data.toUid,
            roomId: data.roomId
        });
    });
    socket.on("to_user_join_private_chat_room", function (data) {
        console.log('==========接收方' + data.toUid + "接受邀请并进入聊天室！" + data.roomId);
        socket.roomIdDict.push(data.roomId);
        socket.toUsers.push(data.fromUid);
        socket.join(data.roomId);
        io.emit(data.fromUid, {
            action: "join_private_chat_room",
            roomId: data.roomId,
            fromUid: data.fromUid,
            toUid: data.toUid
        });
    });
    socket.on("from_user_join_private_chat_room", function (data) {
        socket.roomIdDict.push(data.roomId);
        socket.toUsers.push(data.toUid);
        socket.join(data.roomId);
        console.log('==========发起方' + data.fromUid + "进入" + data.toUid + "创建的聊天室：" + data.roomId);
    });

    socket.on("private_chat_message_send", function (data) {
        console.log("==========" + JSON.stringify(data));
        data.messageRead = false;
        io.in(data.roomId).emit("private_chat_message_receive", data);
    });

    socket.on("private_chat_message_type", function (data) {
        io.in(data.roomId).emit("private_chat_message_type", data);
    });

});

http.listen(4001, function () {
    console.log('listening on *:4001');
});

function convertLongTime(time) {
    var d = new Date(Number(time));
    var y = d.getFullYear();
    var mon = d.getMonth() + 1;
    var date = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var ms = d.getSeconds();
    mon = mon < 10 ? "0" + mon : mon;
    date = date < 10 ? "0" + date : date;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    ms = ms < 10 ? "0" + ms : ms;
    return y + "-" + mon + "-" + date + " " + h + ":" + m + ":" + ms;
}