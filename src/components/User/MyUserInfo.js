/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import BackToolBar from '../Common/BackToolBar';
import {UserInfoStyles, MyUserInfoStyles, commonStyles} from '../../styles/Styles';
import {USER_INFO_TYPE} from '../../constants/ConstantValue';

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
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.handlePress.bind(this, info)}
				style={[MyUserInfoStyles.basicInfoContainer, index === 0 ? {marginTop: 20} : undefined]}>
				<View><Text>{info.key}</Text></View>
				<View><Text>{userInfo[info.value]}</Text></View>
			</TouchableOpacity>
		);
	}

	handlePress(info) {
		let {navigator, userInfo} = this.props;
		navigator.push({name: "edit_user_info", userInfo, infoType: info.btnId, infoColumn: info.value});
	}
}

const basic = [
	{
		key: "头像",
		value: "avatar",
		btnId: USER_INFO_TYPE.AVATAR
	},
	{
		key: "昵称",
		value: "nickName",
		btnId: USER_INFO_TYPE.NICKNAME
	},
	{
		key: "账号",
		value: "account",
		btnId: USER_INFO_TYPE.ACCOUNT
	},
	{
		key: "我的地址",
		value: "address",
		btnId: USER_INFO_TYPE.ADDRESS
	}
];

const otherInfo = [
	{
		key: "性别",
		value: "sex",
		btnId: USER_INFO_TYPE.SEX
	},
	{
		key: "地区",
		value: "area",
		btnId: USER_INFO_TYPE.AREA
	},
	{
		key: "个性签名",
		value: "signature",
		btnId: USER_INFO_TYPE.SIGNATURE
	}
];

class MyUserInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {navigator} = this.props;
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