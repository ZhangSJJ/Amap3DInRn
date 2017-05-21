/**
 * Created by sjzhang on 2017/5/18.
 */
import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MessageTipStyles, commonStyles} from '../../styles/Styles';

class MessageTip extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {tipShow, messageUnReadCount} = this.props;

		if (!tipShow) {
			return null;
		}

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.handlePress.bind(this)}
				style={MessageTipStyles.container}>
				<View style={MessageTipStyles.tipWrap}>
					<Text style={commonStyles.textColorWhite}>{"消息列表"}</Text>
				</View>

				{
					messageUnReadCount ?
						<View style={MessageTipStyles.messageUnReadCount}>
							<Text style={commonStyles.textColorWhite}>{messageUnReadCount}</Text>
						</View>
						:
						null
				}
			</TouchableOpacity>
		);
	}


	handlePress() {
		let {navigator} = this.props;
		navigator.push({name: "message_list"});
	}

	shouldComponentUpdate(nextProps) {
		let {tipShow, messageUnReadCount} = this.props;
		return nextProps.tipShow != tipShow || nextProps.messageUnReadCount != messageUnReadCount;
	}
}

MessageTip.propTypes = {
	tipShow: PropTypes.bool.isRequired,
	messageUnReadCount: PropTypes.number.isRequired,
};

export default MessageTip;