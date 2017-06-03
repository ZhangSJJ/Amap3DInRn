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
import {UserInfoStyles, MyUserInfoStyles, commonStyles} from '../../styles/Styles';

class AvatarInfo extends Component {
	render() {
		let {userInfo} = this.props;
		return (
			<View style={MyUserInfoStyles.avatarInfoContainer}>
				<View><Text>{"头像"}</Text></View>
				<Image source={{uri: userInfo.avatar}}
				       style={UserInfoStyles.avatarImage}/>
			</View>
		);
	}
}

class BasicInfo extends Component {
	render() {
		let {info, userInfo, index} = this.props;
		return (
			<View style={[MyUserInfoStyles.basicInfoContainer, index === 0 ? {marginTop: 20} : undefined]}>
				<View><Text>{info.key}</Text></View>
				<View><Text>{userInfo[info.value]}</Text></View>
			</View>
		);
	}
}

const basic = [
	{
		key: "头像",
		value: "avatar",
		btnId: "avatar"
	},
	{
		key: "昵称",
		value: "nickName",
		btnId: "nickname"
	},
	{
		key: "账号",
		value: "account",
		btnId: "account"
	},
	{
		key: "我的地址",
		value: "address",
		btnId: "address"
	}
];

const otherInfo = [
	{
		key: "性别",
		value: "sex",

		btnId: "sex"
	},
	{
		key: "地区",
		value: "area",
		btnId: "area"
	},
	{
		key: "个性签名",
		value: "signature",
		btnId: "signature"
	}
];

class MyUserInfo extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.actions = bindActionCreators(actions, dispatch);
	}

	render() {
		let {navigator, userInfo} = this.props;
		return (
			<View style={commonStyles.container}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={"个人信息"}
				             style={commonStyles.backToolBar}/>

				<View style={commonStyles.flex1}>
					{
						basic.map((info, index)=> {
							if (info.btnId === "avatar") {
								return (
									<AvatarInfo {...this.props} key={`${info.btnId}_${index}`}/>
								);
							}
							return (
								<BasicInfo {...this.props} index={index} info={info} key={`${info.btnId}_${index}`}/>
							);
						})
					}

					{
						otherInfo.map((info, index)=> {
							return (
								<BasicInfo {...this.props} index={index} info={info} key={`${info.btnId}_${index}`}/>
							);
						})
					}
				</View>


			</View>
		);
	}
}

export default MyUserInfo;