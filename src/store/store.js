/**
 * Created by sjzhang on 2016/11/16.
 */
'use strict';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware // 允许我们 dispatch() 函数
)(createStore);

export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}
