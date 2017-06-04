/**
 * Created by sjzhang on 2017/4/6.
 */

export const hostname = "192.168.137.1";
export const port = 3000;
export const httpServer = `http://${hostname}:${port}`;

// 'http://10.0.40.89:300
//  http://121.52.235.231:40425;

export const MESSAGE_TYPE = {
	PRIVATE_MESSAGE: "PRIVATE_MESSAGE",
	GROUP_MESSAGE: "GROUP_MESSAGE"
};

export const USER_INFO_TYPE = {
	AVATAR: "avatar",
	NICKNAME: "nickname",
	ACCOUNT: "account",
	ADDRESS: "address",
	SEX: "sex",
	AREA: "area",
	SIGNATURE: "signature"
};