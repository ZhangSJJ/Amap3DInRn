/**
 * Created by sjzhang on 2017/1/29.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    NativeModules,
    Platform,
    PixelRatio,
    processColor,
    Text,
} from 'react-native';


const DEFAULT_ICON_SIZE = 12;
const DEFAULT_ICON_COLOR = 'black';

export default function createIconSet(glyphMap, fontFamily, fontFile) {
    let fontReference = fontFamily;
    // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
    if (Platform.OS === 'android' && fontFile) {
        fontReference = fontFile.replace(/\.(otf|ttf)$/, '');
    }

    if (Platform.OS === 'windows' && fontFile) {
        fontReference = `Assets/${fontFile}#${fontFamily}`;
    }

    const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));

    class Icon extends Component {
        static propTypes = {
            ...Text.propTypes,
            name: IconNamePropType.isRequired,
            size: PropTypes.number,
            color: PropTypes.string,
        };

        static defaultProps = {
            size: DEFAULT_ICON_SIZE,
            allowFontScaling: false,
        };

        setNativeProps(nativeProps) {
            if (this.root) {
                this.root.setNativeProps(nativeProps);
            }
        }

        root = null;
        handleRef = (ref) => {
            this.root = ref;
        };

        render() {
            const { name, size, color, style, ...props } = this.props;

            let glyph = glyphMap[name] || '?';
            if (typeof glyph === 'number') {
                glyph = String.fromCharCode(glyph);
            }

            const styleDefaults = {
                fontSize: size,
                color,
            };

            const styleOverrides = {
                fontFamily: fontReference,
                fontWeight: 'normal',
                fontStyle: 'normal',
            };

            props.style = [styleDefaults, style, styleOverrides];
            props.ref = this.handleRef;

            return (<Text {...props}>{glyph}{this.props.children}</Text>);
        }
    }

    return Icon;
}
