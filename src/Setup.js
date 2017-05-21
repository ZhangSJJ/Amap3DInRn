/**
 * Created by sjzhang on 2017/4/6.
 */
'use strict';
import env_init from './utils/environment';
import React, {Component} from 'react';
import configureStore from './store/store';
import {Provider} from 'react-redux';
import actions from './actions/actions';
import Splash from './native/module/Splash';
import {MESSAGE_TYPE} from './constants/ConstantValue';
import AppSocket from './utils/SocketHander';
import DeviceInfo from './native/module/DeviceInfo';
import MCApp from './MCApp';

class MoCApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			store: configureStore()
		}
	}


	render() {
		return (
			<Provider store={this.state.store}>
				<MCApp/>
			</Provider>
		);
	}

	componentWillMount() {
		let _this = this;
		//发起聊天-->建立聊天室
		AppSocket.on(DeviceInfo.iMei, (data)=> {
			if (data.action == "lunch_private_chat") {
				WisdomXY.privateRoomIdDict[data.fromUid] = data.roomId;
				AppSocket.emit("to_user_join_private_chat_room", data)
			} else if (data.action == "join_private_chat_room") {
				AppSocket.emit("from_user_join_private_chat_room", data)
			}
		});

		//接收消息
		AppSocket.on("private_chat_message_receive", (data)=> {
			data.time = Date.now();
			this.state.store.dispatch(actions.receiveMessage(data, MESSAGE_TYPE.PRIVATE_MESSAGE));
		});
	}

	componentWillUnmount() {
		AppSocket.off(DeviceInfo.iMei);
		AppSocket.off("private_chat_message_receive");
	}

	componentDidMount() {
		Splash.close({
			animationType: Splash.animationType.scale,
			duration: 850,
			delay: 500,
		});
	}
}

export default MoCApp;