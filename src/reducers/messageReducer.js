/**
 * Created by sjzhang on 2016/11/16.
 */

'use strict';

import {handleActions} from 'redux-actions';
import  {ActionTypes} from '../constants/ActionTypes';
import DeviceInfo from '../native/module/DeviceInfo';

const initialState = {
	privateMessageInfo: {}
};

const messageReducer = handleActions({
	[ActionTypes.RECEIVE_PRIVATE_MESSAGE]: (state, action) => {
		let privateMessageInfo = {...state.privateMessageInfo};
		let {payload:{data}} = action;
		let roomId = data.roomId;
		privateMessageInfo[roomId] = privateMessageInfo[roomId] || {};
		privateMessageInfo[roomId].message = privateMessageInfo[roomId].message || [];
		privateMessageInfo[roomId].message.push(data);
		privateMessageInfo[roomId].lastMessageTime = data.time;
		//设置全局变量，当前未读消息的条数
		WisdomXY.computeMessageUnRead(privateMessageInfo, DeviceInfo.iMei);
		return {
			...state,
			privateMessageInfo
		};
	},
	[ActionTypes.SET_PRIVATE_MESSAGE_READ]: (state, action) => {
		let privateMessageInfo = {...state.privateMessageInfo};
		let {payload:roomId} = action;
		privateMessageInfo[roomId] = privateMessageInfo[roomId] || {};
		privateMessageInfo[roomId].message = privateMessageInfo[roomId].message || [];
		privateMessageInfo[roomId].message.map(data=> {
			if (!data.messageRead) {
				data.messageRead = true;
			}
		});
		//设置全局变量，当前未读消息的条数
		WisdomXY.computeMessageUnRead(privateMessageInfo, DeviceInfo.iMei);
		return {
			...state,
			privateMessageInfo
		};
	}
}, initialState);

export default messageReducer;