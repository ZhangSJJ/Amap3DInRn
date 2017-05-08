/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import DeviceInfo from '../../native/module/DeviceInfo';
import AppSocket from '../../utils/SocketHander';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../../actions/actions';
import WXYFetch from '../../utils/fetchData/WXYFetch';
import BackToolBar from '../Common/BackToolBar';
import Loading from '../Common/Loading';
import MessageListContent from './MessageListContent';

const toImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491738269445&di=f1a5ece74e9ee63718da0e8c7736f69c&imgtype=0&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D109229.png";
const fromImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492333036&di=f003955c488854454efdff18779b7a34&imgtype=jpg&er=1&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D319012.png";


class MessageList extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		this.actions = bindActionCreators(actions, dispatch);

	}

	render() {
		let {privateMessageInfo, friendsUserInfo, navigator} = this.props;
		let messageInfoArray = [];
		Object.keys(privateMessageInfo).map(key=> {
			messageInfoArray.push(privateMessageInfo[key]);
		});
		messageInfoArray.sort((a, b)=> {
			if (a.lastMessageTime > b.lastMessageTime) {
				return -1
			} else if (a.lastMessageTime < b.lastMessageTime) {
				return 1;
			} else {
				return 0
			}
		});
		return (
			<View style={{flex: 1, backgroundColor: "#EEEEEE"}}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={"消息列表"}
				             style={{backgroundColor: "#444444"}}/>
				<ScrollView>
					{
						messageInfoArray.map((data, index)=> {
							return (
								<MessageListContent message={data.message}
								                    navigator={navigator}
								                    lastMessageTime={data.lastMessageTime}
								                    actions={this.actions}
								                    friendsUserInfo={friendsUserInfo}
								                    key={index}/>
							);
						})
					}

				</ScrollView>
			</View>
		);
	}


	componentWillMount() {

	}

	componentWillUnmount() {

	}
}

export default connect(state => ({
	privateMessageInfo: state.messageInfo.privateMessageInfo,
	friendsUserInfo: state.userInfo.friendsUserInfo
}))(MessageList);