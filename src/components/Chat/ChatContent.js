/**
 * Created by sjzhang on 2017/4/9.
 */

import React, {Component} from 'react';
import {View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import DeviceInfo from '../../native/module/DeviceInfo';
import {convertShortTime} from '../../utils/DataUtils';
let {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const toImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1491735054&di=23d0f964762a0904813f37e180c64b54&src=http://static.freepik.com/free-photo/super-simple-avatar_318-1018.jpg";
const fromImage = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492333036&di=f003955c488854454efdff18779b7a34&imgtype=jpg&er=1&src=http%3A%2F%2Fico.ooopic.com%2Fajax%2Ficonpng%2F%3Fid%3D319012.png";


class MessageView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {messageInfo:{fromUid, toUid, message}, fromImageUri, toImageUri} = this.props;

		let contentArray = [];
		let messageContent = (
			<View key={"message_content"} style={{
				backgroundColor: DeviceInfo.iMei == fromUid ? "#1be811" : "white",
				minHeight: 40,
				justifyContent: "center",
				paddingHorizontal: 10,
				paddingVertical: 4,
				borderRadius: 4,
				maxWidth: WIDTH - 70,
				marginHorizontal: 20
			}}>
				<Text style={{
					fontSize: 16,
					color: "#444444"
				}}>{message}</Text>
			</View>
		);
		let imageContent = (
			<View key={"image_content"} style={{width: 40, height: 40, backgroundColor: "#FFFFFF"}}>
				<Image style={{width: 40, height: 40}}
				       source={{uri: DeviceInfo.iMei == fromUid ? fromImageUri : toImageUri}}/>
			</View>
		);
		let justifyContent = "flex-start";
		if (DeviceInfo.iMei == fromUid) {
			contentArray.push(messageContent);
			contentArray.push(imageContent);
			justifyContent = "flex-end";
		} else {
			contentArray.push(imageContent);
			contentArray.push(messageContent);
		}

		return (
			<View style={{
				flexDirection: "row",
				justifyContent: justifyContent,
				paddingHorizontal: 5,
				marginTop: 10
			}}>
				{contentArray}
			</View>
		);
	}

}


class ChatContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {messageArray, friendsUserInfo, toUid} = this.props;
		let fromImageUri = friendsUserInfo[DeviceInfo.iMei].avatar;
		let toImageUri = friendsUserInfo[toUid].avatar;
		if (!messageArray || messageArray.length === 0) {
			return <View style={{flex: 1}}/>;
		}
		return (

			<ScrollView
				onLayout={()=> {
					this._scrollView && this._scrollView.scrollToEnd({animated: true});
				}}
				ref={view=>this._scrollView = view} style={{flex: 1, marginBottom: 10}}>

				<View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}><Text
					style={{
						color: "#FFFFFF",
						backgroundColor: "#CCCCCC",
						paddingHorizontal: 4,
						borderRadius: 2
					}}>{convertShortTime(messageArray[0].time)}</Text></View>
				{
					messageArray.map((messageInfo, index)=> {
						return (
							<MessageView key={index}
							             messageInfo={messageInfo}
							             toImageUri={toImageUri}
							             fromImageUri={fromImageUri}/>
						)
					})
				}
			</ScrollView>
		);
	}

	// componentDidUpdate() {
	// 	this._scrollView && this._scrollView.scrollToEnd({animated: true});
	// }

	// componentWillReceiveProps() {
	// 	this._scrollView && this._scrollView.scrollToEnd({animated: true});
	// }

	componentDidMount() {
		this._scrollView && this._scrollView.scrollToEnd({animated: true});
	}
}

export default ChatContent;