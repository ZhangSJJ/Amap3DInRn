package com.amap3d;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.amap3d.amap.AMapViewManager;
import com.amap3d.device.DeviceModule;
import com.amap3d.splash.RCTSplashScreenModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * Created by sjzhang on 2017/3/6.
 */
public class JSReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new DeviceModule(reactContext));
        modules.add(new RCTSplashScreenModule(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        AMapViewManager amapViewManager = new AMapViewManager(reactContext);
        return Arrays.<ViewManager>asList(
                amapViewManager
        );
    }
}
