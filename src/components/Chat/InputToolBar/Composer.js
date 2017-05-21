/**
 * Created by sjzhang on 2017/5/18.
 */
import React, {Component, PropTypes} from 'react';
import {
	StyleSheet,
	TextInput,
	View
} from 'react-native';

class Composer extends Component {
	render() {
		let {onChange, composerHeight, text, onEndEditing} = this.props;
		return (
			<View style={styles.inputContainer}>
				<TextInput
					multiline={true}
					onChange={(e) => {
						onChange && onChange(e);
					}}
					style={[styles.textInput, {
						height: composerHeight,
					}]}
					value={text}
					onEndEditing={()=> {
						onEndEditing && onEndEditing();
					}}
					underlineColorAndroid="transparent"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		borderBottomColor: '#00ff18',
		borderBottomWidth: 1,
		marginBottom: 4,
		marginHorizontal: 4,
		paddingVertical: 4
	},
	textInput: {
		fontSize: 18,
		padding: 0
	},
});

Composer.propTypes = {
	onChange: PropTypes.func,
	onEndEditing: PropTypes.func,
	composerHeight: PropTypes.number,
	text: PropTypes.string,
};

export default Composer;