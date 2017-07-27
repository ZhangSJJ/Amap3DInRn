/**
 * Created by sjzhang on 2017/6/3.
 */
/**
 * Created by sjzhang on 2017/5/18.
 */
import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MeStyles, commonStyles} from '../../styles/Styles';
import DeviceInfo from '../../native/module/DeviceInfo';

class Me extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.handlePress.bind(this)}
				style={MeStyles.container}>
				<View style={[MeStyles.tipWrap]}>
					<Text style={commonStyles.textColorWhite}>{"我"}</Text>
				</View>
			</TouchableOpacity>
		);
	}


	handlePress() {
		let {navigator} = this.props;
		navigator.push({name: "user_info", uid: DeviceInfo.iMei});
	}
}

export default Me;