/**
 * Created by sjzhang on 2016/11/17.
 */
'use strict'
// log
global.WisdomXY = global.WisdomXY || {
		PRINT_DEBUG_LOG: false,
		PRINT_ERROR_LOG: false,
		PRINT_WARNING_LOG: false,
		PRINT_INFO_LOG: false,
	};

if (__DEV__) {
	WisdomXY.PRINT_DEBUG_LOG = true;
	WisdomXY.PRINT_ERROR_LOG = true;
	WisdomXY.PRINT_WARNING_LOG = true;
	WisdomXY.PRINT_INFO_LOG = true;
}


WisdomXY.debug_log = (...args) => {
	if (WisdomXY.PRINT_DEBUG_LOG) {
		console.log((new Date()).toLocaleTimeString(), args);
	}
};

WisdomXY.error_log = (...args) => {
	if (WisdomXY.PRINT_ERROR_LOG) {
		console.error((new Date()).toLocaleTimeString(), args);
	}
};

WisdomXY.warning_log = (...args) => {
	if (WisdomXY.PRINT_WARNING_LOG) {
		console.warn((new Date()).toLocaleTimeString(), args);
	}
};

WisdomXY.info_log = (...args) => {
	if (WisdomXY.PRINT_INFO_LOG) {
		console.info((new Date()).toLocaleTimeString(), args);
	}
};

WisdomXY.computeMessageUnRead = (messageInfo, uid) => {
	let count = 0;
	Object.keys(messageInfo).map(key=> {
		count += messageInfo[key].message.filter(data=> !data.messageRead && data.fromUid != uid).length;
	});
	WisdomXY.messageUnReadCount = count;
	if (!WisdomXY.messageListIconShow && WisdomXY.messageUnReadCount) {
		WisdomXY.messageListIconShow = true;
	}
};
//当前未读消息条数
WisdomXY.messageUnReadCount = 0;
WisdomXY.messageListIconShow = false;
WisdomXY.privateRoomIdDict = {};

export default WisdomXY != null && WisdomXY != undefined;