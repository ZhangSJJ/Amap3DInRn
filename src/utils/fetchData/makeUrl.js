/**
 * Created by sjzhang on 2016/11/17.
 */
'use strict';
function makeUrl(url, data) {
	let ret = url;
	if (data) {
		let params = [];
		for (let key in data) {
			params.push(`${key}=${data[key]}`)
		}
		ret = `${url}?${params.join('&')}`
	}
	return ret;
}

export default makeUrl;