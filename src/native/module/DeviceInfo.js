/**
 * Created by sjzhang on 2017/3/7.
 */
import {NativeModules} from 'react-native';
const RNDeviceInfo = NativeModules.RNDeviceInfo;

RNDeviceInfo.getUniqueID = ()=> {
	return RNDeviceInfo.uniqueId;
};
RNDeviceInfo.getImeiId = ()=> {
	return RNDeviceInfo.iMei;
};
RNDeviceInfo.getInstanceID = ()=> {
	return RNDeviceInfo.instanceId;
};
RNDeviceInfo.getDeviceId = ()=> {
	return RNDeviceInfo.deviceId;
};
RNDeviceInfo.getManufacturer = ()=> {
	return RNDeviceInfo.systemManufacturer;
};
RNDeviceInfo.getModel = ()=> {
	return RNDeviceInfo.model;
};
RNDeviceInfo.getBrand = ()=> {
	return RNDeviceInfo.brand;
};
RNDeviceInfo.getSystemName = ()=> {
	return RNDeviceInfo.systemName;
};
RNDeviceInfo.getSystemVersion = ()=> {
	return RNDeviceInfo.systemVersion;
};
RNDeviceInfo.getBundleId = ()=> {
	return RNDeviceInfo.bundleId;
};
RNDeviceInfo.getBuildNumber = ()=> {
	return RNDeviceInfo.buildNumber;
};
RNDeviceInfo.getVersion = ()=> {
	return RNDeviceInfo.appVersion;
};
RNDeviceInfo.getReadableVersion = ()=> {
	return RNDeviceInfo.appVersion + "." + RNDeviceInfo.buildNumber;
};
RNDeviceInfo.getDeviceName = ()=> {
	return RNDeviceInfo.deviceName;
};
RNDeviceInfo.getUserAgent = ()=> {
	return RNDeviceInfo.userAgent;
};
RNDeviceInfo.getDeviceLocale = ()=> {
	return RNDeviceInfo.deviceLocale;
};
RNDeviceInfo.getDeviceCountry = ()=> {
	return RNDeviceInfo.deviceCountry;
};
RNDeviceInfo.getTimezone = ()=> {
	return RNDeviceInfo.timezone;
};
RNDeviceInfo.isEmulator = ()=> {
	return RNDeviceInfo.isEmulator;
};
RNDeviceInfo.isTablet = ()=> {
	return RNDeviceInfo.isTablet;
};

export default RNDeviceInfo;