/**
 * Created by sjzhang on 2017/6/3.
 */
'use strict';

/**
 * Async Storage has been extracted from react-native core and will be removed in a future release.
 * It can now be installed and imported from '@react-native-community/async-storage'
 * instead of 'react-native'. See https://github.com/react-native-community/react-native-async-storage
 */
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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

    setItemWithKeyId(key, id, value) {
        return this.setItemWithKey(this._getKey(key, id), value);
    }

    setItemWithKey(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    getItemWithKeyId(key, id) {
        return this.getItemWithKey(this._getKey(key, id));
    }

    getItemWithKey(key) {
        return AsyncStorage.getItem(key);
    }

    removeItemWithKeyId(key, id) {
        return this.removeItemWithKey(this._getKey(key, id));
    }

    removeItemWithKey(key) {
        return AsyncStorage.removeItem(key);
    }
}

export default Storage;