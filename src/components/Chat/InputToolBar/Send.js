/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

import {commonStyles} from '../../../styles/Styles';


class InputToolBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
			toUserTyping: false
		}
	}

	render() {
		return (
			<View style={{
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 4,
				height: 50,
				backgroundColor: "#FFFFFF"
			}}>
				<View style={{
					flex: 1,
					borderBottomColor: '#00ff18',
					borderBottomWidth: 1,
					height: 32,
					marginRight: 5,
				}}>
					<TextInput
						underlineColorAndroid={"transparent"}
						padding={0}
						style={{fontSize: 18}}
						multiline={true}
						onChangeText={this.changeText.bind(this)}
						value={this.state.message}
						onEndEditing={this.endEditing.bind(this)}
					/>
				</View>
				<TouchableOpacity
					style={{
						width: 50,
						height: 32,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#00ff18",
						borderRadius: 2
					}}
					onPress={this.sendMessage.bind(this)}
					activeOpacity={0.5}>
					<Text>{"发送"}</Text>
				</TouchableOpacity>
			</View>

		);
	}


}

export default InputToolBar;