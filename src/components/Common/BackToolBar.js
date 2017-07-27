/**
 * Created by sjzhang on 2017/1/29.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../../utils/font-icon/icons';

class BackToolBar extends Component {
	handleGoBack() {
		let {goBack} = this.props;
		if (goBack && goBack()) {
			return;
		}
		const {navigator} = this.props;
		if (navigator && navigator.getCurrentRoutes().length > 1) {
			navigator.pop();
		} else {
			navigator.replace({});
		}
	}

	render() {
		const {title, titleColor = '#aaa', style, rightItem, titleStyle, rightItemClick} = this.props;
		return (
			<View style={[styles.toolBar, style]}>
				{/*goBack*/}
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={this.handleGoBack.bind(this)}>
					<View style={[styles.toolBarButton, {width: 40}]}>
						<Icon name="back" size={26} color={titleColor}/>
					</View>
				</TouchableOpacity>
				{/*Title*/}
				<View style={[styles.ViewSelectorContainer, titleStyle]}>
					<View style={[styles.ViewSelector, {alignItems: 'flex-start', paddingLeft: 20}]}>
						<Text numberOfLines={1} style={[styles.ViewSelectorText, {color: titleColor}]}>
							{title}
						</Text>
					</View>
				</View>
				{/*rightItem*/}
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={rightItemClick}>
					<View style={styles.toolBarButton}>
						{rightItem}
					</View>
				</TouchableOpacity>
			</View>
		)
	}

}
const toolBarHeight = 48;

let styles = StyleSheet.create({
	toolBar: {
		height: toolBarHeight,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	toolBarButton: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	ViewSelectorContainer: {
		flex: 1
	},
	ViewSelector: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	ViewSelectorText: {
		fontSize: 18,
		// textAlign: 'center'
	}
});

export default BackToolBar;