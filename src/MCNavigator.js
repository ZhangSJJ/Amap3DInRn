/**
 * create by shangjie.zhang on 2016/10/29
 */
'use strict';

import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import DeviceInfo from './native/module/DeviceInfo';
import AppSocket from './utils/SocketHander';


import MapPageView from './components/HomePage/MapPageView';
import PersonInfo from './components/User/UsersInfo';
import PrivateChat from './components/Chat/PrivateChat';
import MessageList from './components/Chat/MessageList';
import MyUserInfo from './components/User/MyUserInfo';
import EditUserInfo from './components/User/EditUserInfo';

const ConvertProps = (Com) => {
    class WrapComponent extends Component {
        render() {
            const { navigation } = this.props;
            const props = { ...this.props, ...navigation.state.params, navigator: navigation };
            return (<Com {...props}/>);
        }
    }

    return WrapComponent;
};


const stackNavigator = createStackNavigator({
        homePage: {
            screen: ConvertProps(MapPageView)
        },
        user_info: {
            screen: ConvertProps(PersonInfo)
        },
        private_chat: {
            screen: ConvertProps(PrivateChat)
        },
        message_list: {
            screen: ConvertProps(MessageList)
        },
        my_user_info: {
            screen: ConvertProps(MyUserInfo)
        },
        edit_user_info: {
            screen: ConvertProps(EditUserInfo)
        },
    },
    {
        headerMode: 'none',  // 标题导航
        initialRouteName: 'homePage', // 默认先加载的页面组件
        mode: 'modal'       // 定义跳转风格(card、modal)
    });


const AppContainer = createAppContainer(stackNavigator);


class MCNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppContainer
                ref={nav => {
                    this.navigator = nav;
                }}
            />
        );
    }

}

export default MCNavigator;