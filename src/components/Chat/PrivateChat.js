/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import DeviceInfo from '../../native/module/DeviceInfo';
import AppSocket from '../../utils/SocketHander';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/actions';
import WXYFetch from '../../utils/fetchData/WXYFetch';
import BackToolBar from '../Common/BackToolBar';
import Loading from '../Common/Loading';
import ChatContent from './ChatContent';

const toImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491738269445&di=f1a5ece74e9ee63718da0e8c7736f69c&imgtype=0&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D109229.png";
const fromImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492333036&di=f003955c488854454efdff18779b7a34&imgtype=jpg&er=1&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D319012.png";


class PrivateChat extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.actions = bindActionCreators(actions, dispatch);
		this.state = {
			message: "",
			toUserTyping: false
		}
	}

	render() {
		let {toUserTyping} = this.state;
		let {userInfo, toUid, navigator, privateMessageInfo, roomId} = this.props;
		let messageInfo = privateMessageInfo[roomId] || {};
		let messageArray = messageInfo.message || [];
		return (
			<View style={{flex: 1, backgroundColor: "#EEEEEE"}}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={toUserTyping ? "对方正在输入..." : userInfo.nickName}
				             style={{backgroundColor: "#444444"}}/>
				<ChatContent messageArray={messageArray}/>
				<View style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 4,
					height: 50,
					backgroundColor: "#FFFFFF"
				}}>
					<View style={{
						flex: 1,
						borderBottomColor: '#00ff18',
						borderBottomWidth: 1,
						height: 32,
						marginRight: 5,
					}}>
						<TextInput
							underlineColorAndroid={"transparent"}
							padding={0}
							style={{fontSize: 18}}
							multiline={true}
							onChangeText={this.changeText.bind(this)}
							value={this.state.message}
							onEndEditing={this.endEditing.bind(this)}
						/>
					</View>
					<TouchableOpacity
						style={{
							width: 50,
							height: 32,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#00ff18",
							borderRadius: 2
						}}
						onPress={this.sendMessage.bind(this)}
						activeOpacity={0.5}>
						<Text>{"发送"}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	sendMessage() {
		let {toUid, roomId} = this.props;
		let {message} = this.state;
		if (!message) {
			return;
		}
		AppSocket.emit("private_chat_message_send", {message, fromUid: DeviceInfo.iMei, toUid, roomId});
		this.setState({message: ""});
	}

	changeText(message) {
		let {toUid, roomId} = this.props;
		let typingUid = DeviceInfo.iMei;
		AppSocket.emit("private_chat_message_type", {
			typingUid,
			fromUid: typingUid,
			toUid,
			actionType: "typing",
			roomId
		});
		this.setState({message});
	}

	endEditing() {
		let {toUid, roomId} = this.props;
		let typingUid = DeviceInfo.iMei;
		AppSocket.emit("private_chat_message_type", {
			typingUid,
			fromUid: typingUid,
			toUid,
			actionType: "end_type",
			roomId
		});
	}

	componentWillMount() {
		let {toUid} = this.props;
		AppSocket.on("private_chat_message_type", (data)=> {
			if (data.typingUid != DeviceInfo.iMei && data.fromUid == toUid) {
				let toUserTyping = data.actionType == "typing";
				if (this.state.toUserTyping != toUserTyping) {
					this.setState({toUserTyping});
				}
			}
		});

		//将所有toUid的消息设置为已读
		let {roomId} = this.props;
		this.actions.setAllToUidMessageRead(roomId);
	}

	componentWillUnmount() {
		AppSocket.off("private_chat_message_type");
		//将所有toUid的消息设置为已读
		let {roomId} = this.props;
		this.actions.setAllToUidMessageRead(roomId);
		//通知对方我停止输入
		this.endEditing();
	}
}

export default connect(state => ({
	privateMessageInfo: state.messageInfo.privateMessageInfo
}))(PrivateChat);