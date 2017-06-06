/**
 * Created by sjzhang on 2017/5/18.
 */
import React from 'react';
import ReactNative from 'react-native';
const {Dimensions, StyleSheet} = ReactNative;

export function getImageDimension(x, y) {
	return {
		x,
		y,
		x2y: x / y
	}
}

let {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
	flex1: {
		flex: 1
	},
	textColorWhite: {
		color: "white"
	},
	backToolBar: {
		backgroundColor: "#444444"
	},
	container: {
		flex: 1,
		backgroundColor: "#EEEEEE"
	}
});

export const McAppStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});

export const MessageTipStyles = StyleSheet.create({
	container: {
		height: 40,
		width: 100,
		position: "absolute",
		bottom: 10,
		left: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	tipWrap: {
		backgroundColor: "#03A9F4",
		width: 80,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15
	},
	messageUnReadCount: {
		position: "absolute",
		width: 20,
		height: 20,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		right: 0,
		top: 0
	}
});

export const MeStyles = StyleSheet.create({
	container: {
		height: 40,
		width: 70,
		position: "absolute",
		bottom: 10,
		right: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	tipWrap: {
		backgroundColor: "#03A9F4",
		width: 50,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15
	},
	messageUnReadCount: {
		position: "absolute",
		width: 20,
		height: 20,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		right: 0,
		top: 0
	}
});


export const UserInfoStyles = StyleSheet.create({
	avatarWrap: {
		flexDirection: "row",
		height: 86,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 15,
		marginTop: 20
	},
	avatarImage: {
		height: 66,
		width: 66
	},
	avatarOthers: {
		flex: 1,
		height: 76,
		paddingLeft: 20
	},
	nickNameWrap: {
		flex: 1,
		justifyContent: "center"
	},
	nickName: {
		color: "#3E3E3E"
	},
	signatureWrap: {
		height: 20,
		justifyContent: "center"
	},
	signature: {
		color: "#BBBBBB"
	},
	sendMessageWrap: {
		height: 50,
		marginTop: 20,
		paddingHorizontal: 15
	},
	sendMessageView: {
		flex: 1,
		backgroundColor: "#46b950",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center"
	},
	sendMessageText: {
		fontSize: 16,
		color: "#FFFFFF"
	}
});

export const MyUserInfoStyles = StyleSheet.create({
	avatarInfoContainer: {
		flexDirection: "row",
		height: 86,
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		marginTop: 20,
		borderBottomWidth: 1,
		borderColor: "#e8e8e8"
	},
	basicInfoContainer: {
		flexDirection: "row",
		height: 50,
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderColor: "#e8e8e8"
	},
});

export const EditUserInfoStyles = StyleSheet.create({
	rightItemView: {
		backgroundColor: "#03A9F4",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 2
	},
	inputView: {
		flexDirection: "row",
		backgroundColor: "white",
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderColor: "#e8e8e8",
		marginTop: 20
	},
	loadingModalContainer: {
		width: WIDTH * .2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(70, 70, 70,1)',
		borderRadius: 2,
		paddingVertical: 6
	}
});