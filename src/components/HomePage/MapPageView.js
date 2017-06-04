/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AppSocket from '../../utils/SocketHander';
import MapView from '../../native/component/RCTNativeComponent';
import DeviceInfo from '../../native/module/DeviceInfo';
import MessageTip from './MessageTip';
import {commonStyles} from '../../styles/Styles';
import Me from './Me';
class MapPageView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: {}
		};
	}

	render() {
		let {navigator} = this.props;
		return (
			<View style={commonStyles.flex1}>
				<MapView style={commonStyles.flex1}
				         startLoacation={true}
				         markers={this.state.markers}
				         logoPosition={"middle"}/>
				<MessageTip tipShow={WisdomXY.messageListIconShow}
				            navigator={navigator}
				            messageUnReadCount={WisdomXY.messageUnReadCount}/>
				<Me navigator={navigator}/>
			</View>
		);
	}

	componentWillMount() {
		let {navigator} = this.props;
		let _this = this;
		AppSocket.on('share_position', function (position) {
			delete position[DeviceInfo.iMei];
			_this.setState({markers: position});
		});
		this.locationChangeListener = MapView.addEventListener((data) => {
			AppSocket.emit('share_position', {
				[DeviceInfo.iMei]: {
					latLng: [data.latitude, data.longitude],
					avatar: "",
					onLine: true
				}
			});
		}, "ON_LOCATION_CHANGED_EVENT");

		this.markerClickListener = MapView.addEventListener((data) => {
			navigator.push({name: "user_info", ...data});
		}, "marker_click");
	}

	componentWillUnmount() {
		this.locationChangeListener.remove();
		this.markerClickListener.remove();
		AppSocket.off('share_position');
		AppSocket.emit('clear_position', DeviceInfo.iMei);
	}
}

export default connect(state => ({
	privateMessageInfo: state.messageInfo.privateMessageInfo
}))(MapPageView);