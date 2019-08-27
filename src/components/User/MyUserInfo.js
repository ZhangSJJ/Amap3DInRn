/**
 * Created by sjzhang on 2017/4/7.
 */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from '../../native/module/DeviceInfo';
import BackToolBar from '../Common/BackToolBar';
import { UserInfoStyles, MyUserInfoStyles, commonStyles } from '../../styles/Styles';
import { USER_INFO_TYPE } from '../../constants/ConstantValue';

class AvatarInfo extends Component {
    render() {
        let { friendsUserInfo } = this.props;
        let userInfo = friendsUserInfo[DeviceInfo.iMei];
        return (
            <View style={MyUserInfoStyles.avatarInfoContainer}>
                <View><Text>{"头像"}</Text></View>
                <Image source={{ uri: userInfo.avatar }}
                       style={UserInfoStyles.avatarImage}/>
            </View>
        );
    }
}

class BasicInfo extends Component {
    render() {
        let { info, friendsUserInfo, index } = this.props;
        let userInfo = friendsUserInfo[DeviceInfo.iMei];
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.handlePress.bind(this, info)}
                style={[MyUserInfoStyles.basicInfoContainer, index === 0 ? { marginTop: 20 } : undefined]}>
                <View><Text>{info.key}</Text></View>
                <View><Text>{userInfo[info.value]}</Text></View>
            </TouchableOpacity>
        );
    }

    handlePress(info) {
        let { navigator, friendsUserInfo, actions } = this.props;
        let userInfo = friendsUserInfo[DeviceInfo.iMei];
        navigator.push("edit_user_info", { userInfo, info, actions });
    }
}

const basic = [
    {
        key: "头像",
        value: "avatar",
        btnId: USER_INFO_TYPE.AVATAR,
        maxLength: 30,
        backBarText: "更换头像"
    },
    {
        key: "昵称",
        value: "nickName",
        btnId: USER_INFO_TYPE.NICKNAME,
        maxLength: 30,
        backBarText: "更改昵称"
    },
    {
        key: "账号",
        value: "account",
        btnId: USER_INFO_TYPE.ACCOUNT,
        maxLength: 30,
        backBarText: "设置账号"
    },
    {
        key: "我的地址",
        value: "address",
        btnId: USER_INFO_TYPE.ADDRESS,
        maxLength: 30,
        backBarText: "添加地址"
    }
];

const otherInfo = [
    {
        key: "性别",
        value: "sex",
        btnId: USER_INFO_TYPE.SEX,
        maxLength: 30,
        backBarText: "更改性别"
    },
    {
        key: "地区",
        value: "area",
        btnId: USER_INFO_TYPE.AREA,
        maxLength: 30,
        backBarText: "更改地区"
    },
    {
        key: "个性签名",
        value: "signature",
        btnId: USER_INFO_TYPE.SIGNATURE,
        maxLength: 30,
        backBarText: "个性签名"
    }
];

class MyUserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { navigator } = this.props;
        return (
            <View style={commonStyles.container}>
                <BackToolBar navigator={navigator}
                             titleColor={"white"}
                             title={"个人信息"}
                             style={commonStyles.backToolBar}/>

                <View style={commonStyles.flex1}>
                    {
                        basic.map((info, index) => {
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
                        otherInfo.map((info, index) => {
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

export default connect(state => ({
    friendsUserInfo: state.userInfo.friendsUserInfo
}))(MyUserInfo);