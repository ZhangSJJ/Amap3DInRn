/**
 * Created by sjzhang on 2017/4/6.
 */
import {hostname, port} from '../constants/ConstantValue';
import io from'../lib/socket.io';

let AppSocket = {};
AppSocket.domain = "http://" + hostname + ":" + port;
AppSocket.socket = io(AppSocket.domain);

AppSocket.on = (event, callback)=> {
	AppSocket.socket.on(event, data=> {
		callback(data);
	});
};

AppSocket.emit = (event, data)=> {
	AppSocket.socket.emit(event, data);
};
AppSocket.off = (event)=> {
	if (AppSocket.socket.hasListeners(event)) {
		AppSocket.socket.off(event);
	}
};

export default AppSocket;