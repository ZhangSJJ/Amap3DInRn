/**
 * Created by sjzhang on 2017/6/3.
 */
'use strict';
import {AsyncStorage} from 'react-native';

class Storage {
	// 构造
	constructor() {

	}

	_getKey(key, id) {
		let realKey = key;
		if (id) {
			realKey += ':::' + id;
		}
		return realKey;
	}

	setItemWithKeyId(key, id, value, callback) {
		return this.setItemWithKey(this._getKey(key, id), value, callback);
	}

	setItemWithKey(key, value, callback) {
		return AsyncStorage.setItem(key, JSON.stringify(value), callback);
	}

	getItemWithKeyId(key, id, callback) {
		return this.getItemWithKey(this._getKey(key, id), callback);
	}

	getItemWithKey(key, callback) {
		return AsyncStorage.getItem(key, callback);
	}

	removeItemWithKeyId(key, id, callback) {
		return this.removeItemWithKey(this._getKey(key, id), callback);
	}

	removeItemWithKey(key, callback) {
		return AsyncStorage.removeItem(key, callback);
	}
}

export default Storage;