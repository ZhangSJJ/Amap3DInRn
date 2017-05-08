/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
import MCNavigator from './MCNavigator';
const {
	View,
	StatusBar
} = ReactNative;

class MCApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: "#fff"}}>
				<StatusBar
					backgroundColor="#333333"
					hidden={false}
				/>
				<MCNavigator {...this.props}/>
			</View>
		);
	}
}

export default MCApp;