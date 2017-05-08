/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import DeviceInfo from '../../native/module/DeviceInfo';
import AppSocket from '../../utils/SocketHander';
import {convertTime} from '../../utils/DataUtils';
const fromImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492333036&di=f003955c488854454efdff18779b7a34&imgtype=jpg&er=1&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D319012.png";

class MessageListContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {message, lastMessageTime, friendsUserInfo} = this.props;
		//todo 将来要根据当前页面来判断消息是否已读，条数放在全局变量里
		let count = message.filter(data=>!data.messageRead).length;
		let latestMessage = message[message.length - 1];
		let {fromUid, toUid} = latestMessage;
		if (toUid == DeviceInfo.iMei) {
			toUid = fromUid;
		}
		let userInfo = friendsUserInfo[String(toUid)];
		return (
			userInfo ?
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={this.handlePress.bind(this)}
					style={{
						height: 70,
						paddingHorizontal: 15,
						flexDirection: "row",
						alignItems: "center",
						borderBottomWidth: 1,
						borderColor: "#e5e5e5"
					}}>
					<View style={{height: 70, width: 65, justifyContent: "center"}}>
						<View style={{height: 50, width: 50, backgroundColor: "white"}}>
							{
								userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
								                         style={{height: 50, width: 50}}/>
									: null
							}

						</View>
						{
							count ? <View style={{
								position: "absolute",
								backgroundColor: "red",
								height: 20,
								width: 20,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 20,
								top: 4,
								left: 36
							}}>
								<Text style={{color: "white", fontSize: 12}}>{count}</Text>
							</View>
								: null
						}

					</View>
					<View style={{
						height: 50,
						flex: 1,
						justifyContent: "center"
					}}>
						<View style={{flexDirection: "row", flex: 1}}>
							<View style={{flex: 1}}>
								<Text numberOfLines={1}
								      style={{color: "black", fontSize: 17}}>{userInfo.nickName}</Text>
							</View>
							<View style={{maxWidth: 90, minWidth: 40, alignItems: "flex-end"}}>
								<Text style={{fontSize: 12}}>{convertTime(lastMessageTime)}</Text>
							</View>

						</View>
						<View style={{flex: 1, justifyContent: "center"}}><Text
							numberOfLines={1}>{latestMessage.message}</Text></View>
					</View>
				</TouchableOpacity>
				:
				null
		);
	}

	handlePress() {
		let {navigator, message, roomId, friendsUserInfo} = this.props;
		let latestMessage = message[message.length - 1];
		let {fromUid, toUid} = latestMessage;
		if (fromUid != DeviceInfo.iMei) {
			toUid = fromUid;
			fromUid = DeviceInfo.iMei;
		}
		AppSocket.emit("lunch_private_chat", {fromUid, toUid, roomId: latestMessage.roomId});
		navigator.push({
			name: "private_chat",
			userInfo: friendsUserInfo[toUid],
			toUid: latestMessage.fromUid,
			roomId: latestMessage.roomId
		});
	}

	componentWillMount() {
		let {message, friendsUserInfo, actions} = this.props;
		let lastMessage = message[message.length - 1];
		let {fromUid, toUid} = lastMessage;
		if (toUid == DeviceInfo.iMei) {
			toUid = fromUid;
		}
		if (!friendsUserInfo[toUid]) {
			actions.getUserInfo(toUid);
		}
	}

	componentWillUnmount() {

	}
}

export default MessageListContent;