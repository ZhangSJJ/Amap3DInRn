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
import BackToolBar from '../Common/BackToolBar';
import InputToolBar from './InputToolBar/InputToolBar';
import ChatContent from './ChatContent';
import {commonStyles} from '../../styles/Styles';

const MAX_COMPOSER_HEIGHT = 63.5;
const MIN_COMPOSER_HEIGHT = 33;


class PrivateChat extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.actions = bindActionCreators(actions, dispatch);
		this.state = {
			message: "",
			toUserTyping: false,
			composerHeight: MIN_COMPOSER_HEIGHT
		}
	}

	render() {
		let {toUserTyping, message, composerHeight} = this.state;
		let {userInfo, navigator, privateMessageInfo, roomId} = this.props;
		let messageInfo = privateMessageInfo[roomId] || {};
		let messageArray = messageInfo.message || [];
		return (
			<View style={commonStyles.container}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={toUserTyping ? "对方正在输入..." : userInfo.nickName}
				             style={commonStyles.backToolBar}/>
				<ChatContent messageArray={messageArray}/>
				<InputToolBar onEndEditing={this.endEditing.bind(this)}
				              text={message}
				              composerHeight={composerHeight}
				              onSend={this.sendMessage.bind(this)}
				              onChange={this.onChange.bind(this)}/>
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
		this.setState({message: "", composerHeight: MIN_COMPOSER_HEIGHT});
	}

	onChange(e) {
		let {toUid, roomId} = this.props;
		let typingUid = DeviceInfo.iMei;
		AppSocket.emit("private_chat_message_type", {
			typingUid,
			fromUid: typingUid,
			toUid,
			actionType: "typing",
			roomId
		});

		let newComposerHeight = MIN_COMPOSER_HEIGHT;
		if (e.nativeEvent && e.nativeEvent.contentSize) {
			newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, e.nativeEvent.contentSize.height));
		}

		const message = e.nativeEvent.text;
		this.setState({
			message,
			composerHeight: newComposerHeight,
		});
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
		WisdomXY.userInRoomIdNow = 0;
		//通知对方我停止输入
		this.endEditing();
	}
}

export default connect(state => ({
	privateMessageInfo: state.messageInfo.privateMessageInfo
}))(PrivateChat);