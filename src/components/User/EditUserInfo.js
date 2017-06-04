/**
 * Created by sjzhang on 2017/6/3.
 */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import BackToolBar from '../Common/BackToolBar';
import {EditUserInfoStyles, commonStyles, MyUserInfoStyles} from '../../styles/Styles';
import Composer from '../Chat/InputToolBar/Composer';

const MAX_COMPOSER_HEIGHT = 63.5;
const MIN_COMPOSER_HEIGHT = 33;
class EditUserInfo extends Component {
	constructor(props) {
		super(props);
		let {userInfo, infoColumn}= this.props;
		this.state = {
			info: userInfo[infoColumn],
			toUserTyping: false,
			composerHeight: MIN_COMPOSER_HEIGHT
		}
	}

	render() {
		let {navigator, userInfo, infoType, infoColumn} = this.props;
		let {composerHeight, info} = this.state;
		return (
			<View style={commonStyles.container}>
				<BackToolBar navigator={navigator}
				             titleColor={"white"}
				             title={"个人信息"}
				             rightItem={<View
					             style={[EditUserInfoStyles.rightItemView, {opacity: info === userInfo[infoColumn] ? .5 : 1}]}><Text
					             style={commonStyles.textColorWhite}>{"保存"}</Text></View>}
				             style={commonStyles.backToolBar}/>

				<View style={commonStyles.flex1}>
					<View
						style={EditUserInfoStyles.inputView}>
						<Composer text={info}
						          composerHeight={composerHeight}
						          onChange={this.onChange.bind(this)}/>
					</View>
				</View>


			</View>
		);
	}

	onChange(e) {
		let newComposerHeight = MIN_COMPOSER_HEIGHT;
		if (e.nativeEvent && e.nativeEvent.contentSize) {
			newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, e.nativeEvent.contentSize.height));
		}

		const info = e.nativeEvent.text;
		this.setState({
			info,
			composerHeight: newComposerHeight,
		});
	}
}

export default EditUserInfo;