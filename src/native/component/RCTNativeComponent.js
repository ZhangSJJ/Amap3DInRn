/**
 * Created by sjzhang on 2017/3/4.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, DeviceEventEmitter} from 'react-native';
let iface = {
	name: 'RCTGaoDeMap',
	propTypes: {
		logoPosition: PropTypes.string,
	}
};

const RCTMapView = requireNativeComponent('RCTMapView');
class MapView extends Component{
	render(){
		return <RCTMapView {...this.props}/>
	}

	static addEventListener(handler, eventName) {
		const listener = DeviceEventEmitter.addListener(
			eventName,
			handler,
		);
		return listener;
	}
}

export default MapView;




