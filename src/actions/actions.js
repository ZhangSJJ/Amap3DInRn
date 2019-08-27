/**
 * Created by sjzhang on 2016/11/16.
 */
'use strict';
import * as messageActions from './messageActions';
import * as userActions from './userActions';

const actions = {
	...messageActions,
	...userActions,
};

export default actions;
