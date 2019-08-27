/**
 * @format
 */

import { AppRegistry, View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { name as appName } from './app.json';

import MoCApp from './src/Setup';

import DeviceInfo from './src/native/module/DeviceInfo';

import { createAppContainer, createStackNavigator, createSwitchNavigator, NavigationActions } from 'react-navigation';

class LoginScreen extends Component {
    render() {
    debugger
        return (
            <TouchableOpacity style={{ height: 100, width: 100, backgroundColor: 'red' }}
                              onPress={() => {
                                  this.props.navigation.push('Register', { aa: 123 })

                              }}>
                <Text>Login</Text>
            </TouchableOpacity>
        );
    }
}

class RegisterScreen extends Component {
    render() {
debugger
        return (
            <TouchableOpacity style={{ height: 100, width: 100, backgroundColor: 'red' }}
                              onPress={() => {
                                  this.props.navigation.pop()
                              }}>
                <Text>RegisterScreen</Text>
            </TouchableOpacity>
        );
    }
}


//登陆、注册等导航器
const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        },
    }
    ,
    {
        initialRouteName: 'Login',
        navigationOptions: { // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            header: null,
            gesturesEnabled: true
        },
        mode: 'modal', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'none',
    });


const AppContainer = createAppContainer(LoginStack);


class App extends React.Component {
    someEvent() {
        this.navigator &&
        this.navigator.dispatch(
            NavigationActions.navigate({ routeName: 'ssss' })
        );
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

AppRegistry.registerComponent(appName, () => MoCApp);
