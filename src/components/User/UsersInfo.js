/**
 * Created by sjzhang on 2017/4/7.
 */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/actions';
import DeviceInfo from '../../native/module/DeviceInfo';
import AppSocket from '../../utils/SocketHander';
import BackToolBar from '../Common/BackToolBar';
import Loading from '../Common/Loading';
import { createRoomId } from '../../utils/DataUtils';
import { UserInfoStyles, commonStyles } from '../../styles/Styles';

const url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491580274800&di=33bd031f1892b29619405033827b8077&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201304%2F10%2F104028xfxsklfilosaa1jh.jpg";

class AvatarInfo extends Component {
    render() {
        let { friendsUserInfo, uid } = this.props;
        let userInfo = friendsUserInfo[uid];

        let contentArray = [];
        contentArray.push(
            <View key={"avatar_image"} style={UserInfoStyles.avatarImage}>
                <Image source={{ uri: userInfo.avatar }}
                       style={UserInfoStyles.avatarImage}/>
            </View>
        );
        contentArray.push(
            <View style={UserInfoStyles.avatarOthers} key={"avatar_info"}>
                <View style={UserInfoStyles.nickNameWrap}>
                    <Text numberOfLines={1}
                          style={UserInfoStyles.nickName}>{userInfo.nickName}</Text>
                </View>
                <View style={UserInfoStyles.signatureWrap}>
                    <Text numberOfLines={1}
                          style={UserInfoStyles.signature}>{`个性签名：${userInfo.signature}`}</Text>
                </View>
            </View>
        );
        if (uid === DeviceInfo.iMei) {
            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.handlePress.bind(this)}
                    style={UserInfoStyles.avatarWrap}>
                    {contentArray}
                </TouchableOpacity>
            );
        }
        return (
            <View style={UserInfoStyles.avatarWrap}>
                {contentArray}
            </View>
        );
    }

    handlePress() {
        let { navigator, friendsUserInfo, uid, actions } = this.props;
        navigator.push("my_user_info", { userInfo: friendsUserInfo[uid], actions });
    }
}

class SendMessageBtn extends Component {
    render() {
        return (
            <TouchableOpacity
                style={UserInfoStyles.sendMessageWrap}
                onPress={this.onPress.bind(this)}
                activeOpacity={0.8}>
                <View style={UserInfoStyles.sendMessageView}>
                    <Text style={UserInfoStyles.sendMessageText}>{"发消息"}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onPress() {
        let { uid, navigator, friendsUserInfo } = this.props;
        let fromUid = DeviceInfo.iMei;
        WisdomXY.privateRoomIdDict[uid] = WisdomXY.privateRoomIdDict[uid] || createRoomId();
        let roomId = WisdomXY.privateRoomIdDict[uid];
        AppSocket.emit("lunch_private_chat", { fromUid, toUid: uid, roomId });
        navigator.push("private_chat", { userInfo: friendsUserInfo[uid], toUid: uid, roomId });
    }
}

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        this.actions = bindActionCreators(actions, dispatch);
    }

    render() {
        let { navigator, friendsUserInfo, uid } = this.props;
        let userInfo = friendsUserInfo[uid];
        return (
            <View style={commonStyles.container}>
                <BackToolBar navigator={navigator}
                             titleColor={"white"}
                             title={"详细资料"}
                             style={commonStyles.backToolBar}/>
                {
                    !userInfo ? <Loading backColor={"#EEEEEE"}/> :
                        <View style={commonStyles.flex1}>
                            <AvatarInfo {...this.props} actions={this.actions}/>
                            <SendMessageBtn {...this.props}/>
                        </View>
                }
            </View>
        );
    }


    componentDidMount() {
        let { uid, friendsUserInfo } = this.props;
        if (!friendsUserInfo[uid]) {
            this.actions.getUserinfoFormStorageAndServer(uid);
        }
    }
}

export default connect(state => ({
    friendsUserInfo: state.userInfo.friendsUserInfo
}))(PersonInfo);