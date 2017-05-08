/**
 * Created by sjzhang on 2016/11/16.
 */
'use strict';
import {combineReducers} from 'redux';
import messageReducer from './messageReducer';
import userInfoReducer from './userInfoReducer';


const rootReducer = combineReducers({
	messageInfo: messageReducer,
	userInfo: userInfoReducer
});

export default rootReducer;
