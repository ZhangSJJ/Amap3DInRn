package com.amp3dinrn;

import com.amp3dinrn.amap.AMapViewManager;
import com.amp3dinrn.device.DeviceModule;
import com.amp3dinrn.splash.RCTSplashScreenModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        AMapViewManager amapViewManager = new AMapViewManager(reactContext);
        return Arrays.<ViewManager>asList(
                amapViewManager
        );
    }
}
