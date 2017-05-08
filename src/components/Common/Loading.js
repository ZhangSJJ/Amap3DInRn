/**
 * Created by sjzhang on 2017/4/8.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

class Loading extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {backColor} = this.props;
		return (
			<View style={[styles.loading, backColor ? {backgroundColor: backColor} : undefined]}>
				<ActivityIndicator
					animating={true}
					size="small"/>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	loading: {
		marginTop: 30
	}
});

export default Loading;