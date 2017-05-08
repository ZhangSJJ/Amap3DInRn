/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AppSocket from '../../utils/SocketHander';
import MapView from '../../native/component/RCTNativeComponent';
import DeviceInfo from '../../native/module/DeviceInfo';
class MapPageView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: {}
		};
	}


	render() {
		return (
			<View style={{flex: 1}}>
				<MapView style={{flex: 1}}
				         startLoacation={true}

				         markers={this.state.markers}
				         logoPosition={"middle"}/>
				{
					WisdomXY.messageListIconShow ?
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={this.handlePress.bind(this)}
							style={{
								height: 40,
								width: 100,
								position: "absolute",
								bottom: 10,
								left: 10,
								justifyContent: "center",
								alignItems: "center"

							}}>
							<View style={{
								backgroundColor: "#03A9F4", width: 80,
								height: 30, justifyContent: "center",
								alignItems: "center", borderRadius: 15
							}}>
								<Text style={{color: "white"}}>{"消息列表"}</Text>
							</View>

							{
								WisdomXY.messageUnReadCount ?
									<View style={{
										position: "absolute",
										width: 20,
										height: 20,
										backgroundColor: "red",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 20,
										right: 0,
										top: 0
									}}>
										<Text style={{color: "white"}}>{WisdomXY.messageUnReadCount}</Text>
									</View>
									:
									null
							}


						</TouchableOpacity>
						:
						null
				}
			</View>

		);
	}

	handlePress() {
		let {navigator} = this.props;
		navigator.push({name: "message_list"});
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