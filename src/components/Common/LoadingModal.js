/**
 * Created by sjzhang on 2017/1/22.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, StyleSheet, ActivityIndicator} from 'react-native';

class LoadingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(this.props.visible ? 1 : 0),
			visible: this.props.visible || false
		};
	}

	render() {
		let {opacity, visible} = this.state;
		let {children} = this.props;
		if (!visible) return (<View height={0}/>);
		return (
			<Animated.View style={[styles.modal, {opacity: opacity}]}>
				{ children || this._renderActivityIndicator()}
			</Animated.View>
		);
	}

	open() {
		this.setState({
			visible: true
		});
		this.animatedEvent = Animated.timing(
			this.state.opacity, {toValue: 1, duration: 350}
		);
		this.animatedEvent.start();
	}

	close() {
		this.animatedEvent = Animated.timing(
			this.state.opacity, {toValue: 0, duration: 350}
		);
		this.animatedEvent.start(() => {
			this.setState({
				visible: false
			});
		});
	}

	_renderActivityIndicator() {
		return (
			<View style={styles.indicatorView}>
				<ActivityIndicator
					style={{position: 'relative', left: 1, top: 1,}}
					animating={true}
					color={'#fff'}
					size={'large'}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	modal: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		position: "absolute",
		justifyContent: "center",
		alignItems: "center"
	},
	indicatorView: {
		width: 100,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(70, 70, 70,1)',
		borderRadius: 2
	}

});

LoadingModal.propTypes = {
	visible: PropTypes.bool
};

export default LoadingModal;