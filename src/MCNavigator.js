/**
 * create by shangjie.zhang on 2016/10/29
 */
'use strict';

import React, {Component} from 'react';
import {View, Navigator, BackAndroid} from 'react-native';
import DeviceInfo from './native/module/DeviceInfo';
import AppSocket from './utils/SocketHander';


import MapPageView from './components/HomePage/MapPageView';
import PersonInfo from './components/User/UsersInfo';
import PrivateChat from './components/Chat/PrivateChat';
import MessageList from './components/Chat/MessageList';
import MyUserInfo from './components/User/MyUserInfo';
import EditUserInfo from './components/User/EditUserInfo';

class MCNavigator extends Component {
	constructor(props) {
		super(props);
		this.handleBackButton = this.handleBackButton.bind(this)
	}

	render() {
		return (
			<Navigator
				ref="navigator"
				initialRoute={{name: "homePage"}}
				configureScene={(route) => Navigator.SceneConfigs.PushFromRight}
				renderScene={this.renderScene.bind(this)}>
			</Navigator>
		);
	}


	renderScene(route, navigator) {
		if (route.name === "user_info") {
			return <PersonInfo {...route} navigator={navigator}/>
		} else if (route.name === "private_chat") {
			return <PrivateChat {...route} navigator={navigator}/>
		} else if (route.name === "message_list") {
			return <MessageList {...route} navigator={navigator}/>
		} else if (route.name === "my_user_info") {
			return <MyUserInfo {...route} navigator={navigator}/>
		} else if (route.name === "edit_user_info") {
			return <EditUserInfo {...route} navigator={navigator}/>
		}
		return <MapPageView {...route} navigator={navigator}/>
	}

	handleBackButton() {
		const {navigator} = this.refs;
		if (navigator && navigator.getCurrentRoutes().length > 1) {
			navigator.pop();
			return true;
		}
		AppSocket.off('share_position');
		AppSocket.emit('clear_position', DeviceInfo.iMei);
		return false;
	}

	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
	}

}

export default MCNavigator;