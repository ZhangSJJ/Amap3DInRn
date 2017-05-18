/**
 * Created by sjzhang on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

class Send extends Component {
	render() {
		let {text, onSend}= this.props;
		if (text.trim().length > 0) {
			return (
				<TouchableOpacity
					style={styles.container}
					onPress={onSend}
				>
					<Text style={styles.text}>{"发送"}</Text>
				</TouchableOpacity>
			);
		}
		return <View/>;
	}
}

const styles = StyleSheet.create({
	container: {
		height: 44,
		justifyContent: 'flex-end',
	},
	text: {
		color: '#0084ff',
		fontWeight: '600',
		fontSize: 17,
		backgroundColor: 'transparent',
		marginBottom: 12,
		marginLeft: 10,
		marginRight: 10,
	},
});

Send.propTypes = {
	text: PropTypes.string,
	onSend: PropTypes.func,
};

export default Send;