/**
 * Created by sjzhang on 2017/4/22.
 */
'use strict';
import {createAction} from 'redux-actions';
import  {ActionTypes} from '../constants/ActionTypes';
import {httpServer} from '../constants/ConstantValue';
import WXYFetch from '../utils/fetchData/WXYFetch';

const receiveFriendsUserInfo = createAction(ActionTypes.RECEIVE_FRIENDS_USER_INFO);


export function getUserInfo(uid) {
	return dispatch => {
		WXYFetch.fetchServerData(`${httpServer}/users/getUserInfo`, {uid}, "GET")
			.then(response => {
				return response.json();
			}).then(json=> {
				if (json.error_code != 0) {
					return;
				}
				dispatch(receiveFriendsUserInfo({data: json.data, uid}));
				//存一份到本地
				WisdomXY.storage.setItemWithKeyId("userInfo", uid, json);
			}
		).catch(e => {
			dispatch(receiveFriendsUserInfo(e));
		});
	};
}

export function setUserInfo(data) {
	return dispatch=> {
		dispatch(receiveFriendsUserInfo(data));
	}
}
