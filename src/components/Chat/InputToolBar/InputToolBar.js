/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Composer from './Composer';
import Send from './Send';

class InputToolBar extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Composer{...this.props}/>
				<Send {...this.props}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: '#b2b2b2',
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		alignItems: 'flex-end',
	}
});

export default InputToolBar;