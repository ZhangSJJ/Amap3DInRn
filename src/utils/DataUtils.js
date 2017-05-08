/**
 * Created by sjzhang on 2017/1/28.
 */
export function convertLongTime(time) {
	let d = new Date(Number(time));
	let y = d.getFullYear();
	let mon = d.getMonth() + 1;
	let date = d.getDate();
	let h = d.getHours();
	let m = d.getMinutes();
	let ms = d.getSeconds();

	mon = mon < 10 ? `0${mon}` : mon;
	date = date < 10 ? `0${date}` : date;

	h = h < 10 ? `0${h}` : h;
	m = m < 10 ? `0${m}` : m;
	ms = ms < 10 ? `0${ms}` : ms;

	return `${y}-${mon}-${date} ${h}:${m}:${ms}`;
}

export function convertMiddleTime(time) {
	let d = new Date(Number(time));
	let y = d.getFullYear();
	let mon = d.getMonth() + 1;
	let date = d.getDate();
	mon = mon < 10 ? `0${mon}` : mon;
	return `${y}年${mon}月${date}日`;
}
export function convertShortTime(time) {
	let d = new Date(Number(time));
	let h = d.getHours();
	let m = d.getMinutes();
	m = m < 10 ? `0${m}` : m;
	h = h < 10 ? `0${h}` : h;
	return `${h}:${m}`
}

export function convertTime(time) {
	let now = Date.now();
	if (now - time > 86400000) {
		return convertMiddleTime(time);
	} else {
		return convertShortTime(time);
	}
}

export function createRoomId() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}