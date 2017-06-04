/**
 * Created by sjzhang on 2016/11/17.
 */
'use strict';
import makeUrl from './makeUrl';
function fetchServerData(url, data, method = "GET") {
	if (method === "GET") {
		return fetch(makeUrl(url, data), {
			method: 'GET'
		});
	} else if (method === "POST") {
		return fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
}

function fetchStaticData(url, data) {
	// WisdomXY.info_log("fetchStaticData", url, data);
	return fetch(makeUrl(url, data));
}
const WXYFetch = {fetchServerData, fetchStaticData};

export default WXYFetch;