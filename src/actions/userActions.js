/**
 * Created by sjzhang on 2017/4/22.
 */
'use strict';
import {createAction} from 'redux-actions';
import  {ActionTypes} from '../constants/ActionTypes';
import {httpServer} from '../constants/ConstantValue';
import WXYFetch from '../utils/fetchData/WXYFetch';

const receiveFriendsUserInfo = createAction(ActionTypes.RECEIVE_FRIENDS_USER_INFO);


export function getUserInfo(uid, callback = ()=> {
}) {
	return dispatch => {
		WXYFetch.fetchServerData(`${httpServer}/users/getUserInfo`, {uid}, "GET")
			.then(response => {
				return response.json();
			}).then(json=> {
				if (json.error_code != 0) {
					return;
				}
				dispatch(receiveFriendsUserInfo({data: json.data, uid}));
				callback();
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

export function updateUserInfo(params, callback = ()=> {
}) {
	return dispatch => {
		WXYFetch.fetchServerData(`${httpServer}/users/updateUserInfo`, params, "POST")
			.then(response => {
				return response.json();
			}).then(json=> {
				if (json.error_code != 0) {
					callback(false);
					return;
				}
				dispatch(receiveFriendsUserInfo({uid: params.uid, data: params}));
				callback(true);
			}
		).catch(e => {
			// dispatch(receiveFriendsUserInfo(e));
			callback(false);
		});
	};
}
