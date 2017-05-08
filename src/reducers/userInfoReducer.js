/**
 * Created by sjzhang on 2016/11/16.
 */

'use strict';

import {handleActions} from 'redux-actions';
import  {ActionTypes} from '../constants/ActionTypes';
import DeviceInfo from '../native/module/DeviceInfo';

const initialState = {
	friendsUserInfo: {}
};

const userInfoReducer = handleActions({
	[ActionTypes.RECEIVE_FRIENDS_USER_INFO]: (state, action) => {
		let friendsUserInfo = {...state.friendsUserInfo};
		let {payload:{data, uid}} = action;
		friendsUserInfo[uid] = data;
		return {
			...state,
			friendsUserInfo
		};
	}
}, initialState);

export default userInfoReducer;