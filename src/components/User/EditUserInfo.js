/**
 * Created by sjzhang on 2017/6/3.
 */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackToolBar from '../Common/BackToolBar';
import LoadingModal from '../Common/LoadingModal';
import { EditUserInfoStyles, commonStyles } from '../../styles/Styles';
import Composer from '../Chat/InputToolBar/Composer';
import DeviceInfo from '../../native/module/DeviceInfo';

const MAX_COMPOSER_HEIGHT = 63.5;
const MIN_COMPOSER_HEIGHT = 33;

class EditUserInfo extends Component {
    constructor(props) {
        super(props);
        let { userInfo, info: { value } } = this.props;
        this.state = {
            text: userInfo[value],
            toUserTyping: false,
            composerHeight: MIN_COMPOSER_HEIGHT
        }
    }

    render() {
        let { navigator, userInfo, info: { value, maxLength, backBarText } } = this.props;
        let { composerHeight, text } = this.state;
        return (
            <View style={commonStyles.container}>
                <BackToolBar navigator={navigator}
                             titleColor={"white"}
                             title={backBarText}
                             rightItem={<View
                                 style={[EditUserInfoStyles.rightItemView, { opacity: text === userInfo[value] ? .5 : 1 }]}><Text
                                 style={commonStyles.textColorWhite}>{"保存"}</Text></View>}
                             rightItemClick={this.saveInfo.bind(this)}
                             style={commonStyles.backToolBar}/>

                <View style={commonStyles.flex1}>
                    <View
                        style={EditUserInfoStyles.inputView}>
                        <Composer text={text}
                                  composerHeight={composerHeight}
                                  maxLength={maxLength}
                                  onChange={this.onChange.bind(this)}/>
                    </View>
                </View>
                <LoadingModal ref={view => this._loadingModal = view}>
                    <View style={EditUserInfoStyles.loadingModalContainer}>
                        <ActivityIndicator
                            animating={true}
                            size="small"/>
                        <Text style={commonStyles.textColorWhite}>{"正在保存"}</Text>
                    </View>
                </LoadingModal>
            </View>
        );
    }

    onChange(e) {
        let newComposerHeight = MIN_COMPOSER_HEIGHT;
        if (e.nativeEvent && e.nativeEvent.contentSize) {
            newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, e.nativeEvent.contentSize.height));
        }

        const text = e.nativeEvent.text;
        this.setState({
            text,
            composerHeight: newComposerHeight,
        });
    }

    saveInfo() {
        let { navigator, userInfo, info: { value }, actions } = this.props;
        let { text } = this.state;
        if (text === "" || text === userInfo[value]) {
            return;
        }

        this._loadingModal && this._loadingModal.open();

        let params = { uid: DeviceInfo.iMei, [value]: text };
        actions.updateUserInfo(params, (flag) => {
            if (flag) {
                //存一份到本地
                let newUserInfo = { ...userInfo, [value]: text };
                WisdomXY.storage.setItemWithKeyId("userInfo", DeviceInfo.iMei, newUserInfo);
                navigator.pop();
            } else {
                alert("error")
                this._loadingModal && this._loadingModal.close();
            }

        });

    }
}

export default EditUserInfo;
