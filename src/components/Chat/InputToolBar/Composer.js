/**
 * Created by sjzhang on 2017/5/18.
 */
import React from 'react';
import {
	Platform,
	StyleSheet,
	TextInput,
} from 'react-native';

export default class Composer extends React.Component {
	render() {
		let {onChange, composerHeight, text} = this.props;
		return (
			<TextInput
				multiline={true}
				onChange={(e) => {
					onChange(e);
				}}
				style={[styles.textInput, {
					height: composerHeight,
				}]}
				value={text}
				underlineColorAndroid="transparent"
			/>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		lineHeight: 16,
		marginTop: 0,
		marginBottom: 3,
	},
});


Composer.propTypes = {
	onChange: React.PropTypes.func,
	composerHeight: React.PropTypes.number,
	text: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	placeholderTextColor: React.PropTypes.string,
	textInputProps: React.PropTypes.object,
	multiline: React.PropTypes.bool,
	textInputStyle: TextInput.propTypes.style,
};
