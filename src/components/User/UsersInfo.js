/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/actions';
import DeviceInfo from '../../native/module/DeviceInfo';
import AppSocket from '../../utils/SocketHander';
import BackToolBar from '../Common/BackToolBar';
import Loading from '../Common/Loading';
import {createRoomId} from '../../utils/DataUtils';

const url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491580274800&di=33bd031f1892b29619405033827b8077&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201304%2F10%2F104028xfxsklfilosaa1jh.jpg";

class PersonInfo extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.actions = bindActionCreators(actions, dispatch);
	}

	render() {
		let {navigator, friendsUserInfo, uid} = this.props;
		let userInfo = friendsUserInfo[uid];
		return (
			<View style={{flex: 1, backgroundColor: "#EEEEEE"}}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={"详细资料"}
				             style={{backgroundColor: "#444444"}}/>
				{
					!userInfo ? <Loading backColor={"#EEEEEE"}/> :
						<View style={{flex: 1}}>
							<View style={{
								flexDirection: "row",
								height: 96,
								backgroundColor: "white",
								justifyContent: "center",
								alignItems: "center",
								paddingHorizontal: 15,
								marginTop: 20
							}}>
								<Image source={{uri: userInfo.avatar}}
								       style={{height: 76, width: 76}}/>
								<View style={{flex: 1, height: 76, paddingLeft: 20}}>
									<View style={{flex: 1, justifyContent: "center"}}>
										<Text numberOfLines={1} style={{color: "#3E3E3E"}}>{userInfo.nickName}</Text>
									</View>
									<View style={{height: 20, justifyContent: "center"}}>
										<Text numberOfLines={1}
										      style={{color: "#BBBBBB"}}>{`个性签名：${userInfo.signature}`}</Text>
									</View>
								</View>
							</View>

							<TouchableOpacity
								style={{height: 50, marginTop: 20, paddingHorizontal: 15}}
								onPress={this.onPress.bind(this)}
								activeOpacity={0.8}>
								<View style={{
									flex: 1,
									backgroundColor: "#46b950",
									borderRadius: 4,
									justifyContent: "center",
									alignItems: "center"
								}}>
									<Text style={{fontSize: 16, color: "#FFFFFF"}}>{"发消息"}</Text>
								</View>
							</TouchableOpacity>
						</View>
				}
			</View>
		);
	}

	onPress() {
		let {uid, navigator, friendsUserInfo} = this.props;
		let fromUid = DeviceInfo.iMei;
		WisdomXY.privateRoomIdDict[uid] = WisdomXY.privateRoomIdDict[uid] || createRoomId();
		let roomId = WisdomXY.privateRoomIdDict[uid];
		AppSocket.emit("lunch_private_chat", {fromUid, toUid: uid, roomId});
		navigator.push({name: "private_chat", userInfo: friendsUserInfo[uid], toUid: uid, roomId});
	}

	componentWillMount() {
		let {uid, friendsUserInfo} = this.props;
		if (!friendsUserInfo[uid]) {
			this.actions.getUserInfo(uid);
		}
	}
}

export default connect(state => ({
	friendsUserInfo: state.userInfo.friendsUserInfo
}))(PersonInfo);