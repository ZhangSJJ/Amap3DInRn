/**
 * Created by sjzhang on 2017/4/22.
 */
'use strict';
import {createAction} from 'redux-actions';
import  {ActionTypes} from '../constants/ActionTypes';
import {MESSAGE_TYPE} from '../constants/ConstantValue';

const receivePrivateMessage = createAction(ActionTypes.RECEIVE_PRIVATE_MESSAGE);
const setMessageRead = createAction(ActionTypes.SET_PRIVATE_MESSAGE_READ);

const receiveActions = {
	[MESSAGE_TYPE.PRIVATE_MESSAGE]: receivePrivateMessage
};

export function receiveMessage(data, messageType) {
	return dispatch => {
		dispatch(receiveActions[messageType]({data}));
	};
}

export function setAllToUidMessageRead(roomId) {
	return dispatch => {
		dispatch(setMessageRead(roomId));
	};
}