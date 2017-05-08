package com.amp3dinrn.amap;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.util.Log;
import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.*;
import com.amap.api.maps.model.*;
import com.amap.api.maps.utils.overlay.SmoothMoveMarker;
import com.amp3dinrn.R;
import com.amp3dinrn.amap.util.SensorEventHelper;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sjzhang on 2017/3/6.
 */
public class AMapViewManager extends SimpleViewManager<MapView> implements LocationSource,
        AMapLocationListener {
    public static final String RCT_CLASS = "RCTMapView";
    public static final String ON_LOCATION_CHANGED_EVENT = "ON_LOCATION_CHANGED_EVENT";

    private Map markers;

    private Context context;
    private MapView mapView;
    private AMap aMap;
    private UiSettings mUiSettings;
    SmoothMoveMarker smoothMarker;

    private LocationSource.OnLocationChangedListener mListener;
    private AMapLocationClient mlocationClient;
    private AMapLocationClientOption mLocationOption;

    private static final int STROKE_COLOR = Color.argb(180, 3, 145, 255);
    private static final int FILL_COLOR = Color.argb(10, 0, 0, 180);
    private boolean mFirstFix = false;
    private Marker mLocMarker;
    private SensorEventHelper mSensorHelper;
    private Circle mCircle;

    private MarkerOptions markerOption;

    public AMapViewManager(ReactApplicationContext reactContext) {
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return RCT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(ON_LOCATION_CHANGED_EVENT, ON_LOCATION_CHANGED_EVENT);
        return constants;
    }

    @Override
    protected MapView createViewInstance(ThemedReactContext reactContext) {
        mapView = new MapView(reactContext);
        mapView.onCreate(null);
        aMap = mapView.getMap();
        markers = new HashMap();
        mUiSettings = aMap.getUiSettings();
        init();
        return mapView;
    }

    private void init() {
        if (aMap == null) {
            aMap = mapView.getMap();
        }
        setUpMap();
        mSensorHelper = new SensorEventHelper(this.context);
        if (mSensorHelper != null) {
            mSensorHelper.registerSensorListener();
        }
    }

    /**
     * 设置一些amap的属性
     */
    private void setUpMap() {
        aMap.setLocationSource(this);// 设置定位监听
        mUiSettings.setMyLocationButtonEnabled(false);// 设置默认定位按钮是否显示
        mUiSettings.setZoomControlsEnabled(false);
        aMap.setMyLocationEnabled(true);// 设置为true表示显示定位层并可触发定位，false表示隐藏定位层并不可触发定位，默认是false
        // 设置定位的类型为定位模式 ，可以由定位、跟随或地图根据面向方向旋转几种
        aMap.setMyLocationType(AMap.LOCATION_TYPE_LOCATE);
    }

    /**
     * LogoPosition
     *
     * @param view
     * @param value
     */
    @ReactProp(name = "logoPosition")
    public void setLogoPosition(final MapView view, String value) {
        if (this.mUiSettings == null) {
            this.mUiSettings = view.getMap().getUiSettings();
        }
        switch (value) {
            case "left":
                this.mUiSettings.setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_LEFT);
                break;
            case "middle":
                this.mUiSettings.setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_CENTER);
                break;
            case "right":
                this.mUiSettings.setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_RIGHT);
                break;
        }
    }

    @ReactProp(name = "zoomBtnShow", defaultBoolean = false)
    public void setZoomControlsEnabled(final MapView view, boolean value) {
        if (this.mUiSettings == null) {
            this.mUiSettings = view.getMap().getUiSettings();
        }
        this.mUiSettings.setZoomControlsEnabled(value);
    }

    @ReactProp(name = "markers")
    public void setMarkers(final MapView mapView, @Nullable ReadableMap options) {

        ReadableMapKeySetIterator readableMapKeySetIterator = options.keySetIterator();
        while (readableMapKeySetIterator.hasNextKey()) {
            String key = readableMapKeySetIterator.nextKey();
            ReadableMap map = options.getMap(key);

            ReadableArray array = map.getArray("latLng");
            //判断点是否在线
            if (map.getBoolean("onLine")) {
                //判断点是否存在
                if (markers.containsKey(key)) {
                    MarkerPoint markerPoint = (MarkerPoint) markers.get(key);
                    //判断点是否移动
                    if (array.getDouble(0) == markerPoint.getCurrentPoint().latitude
                            && array.getDouble(1) == markerPoint.getCurrentPoint().longitude) {
                        return;
                    } else {
                        //移动点的位置
                        markerPoint.setLastPoint(markerPoint.getCurrentPoint());
                        markerPoint.setCurrentPoint(new LatLng(array.getDouble(0), array.getDouble(1)));
                        markerPoint.moveMarker();
                    }
                } else {
                    //第一次出现，add marker
                    MarkerPoint markerPoint = new MarkerPoint(aMap, this.context, key);
                    markerPoint.setAvatar(map.getString("avatar"));
                    markerPoint.setCurrentPoint(new LatLng(array.getDouble(0), array.getDouble(1)));
                    markers.put(key, markerPoint);
                    markerPoint.moveMarker();
                }
            } else {
                if (markers.containsKey(key)) {
                    MarkerPoint markerPoint = (MarkerPoint) markers.get(key);
                    markerPoint.clearMarker();
                    markers.remove(key);
                }
            }
        }
    }


    @Override
    public void onLocationChanged(AMapLocation amapLocation) {
        if (mListener != null && amapLocation != null) {
            if (amapLocation != null
                    && amapLocation.getErrorCode() == 0) {
                LatLng location = new LatLng(amapLocation.getLatitude(), amapLocation.getLongitude());
                if (amapLocation.getAccuracy() > 100) {
                    //精度超过100米舍弃
                    return;
                }
                if (!mFirstFix) {
                    mFirstFix = true;
                    addCircle(location, amapLocation.getAccuracy());//添加定位精度圆
                    addMarker(location);//添加定位图标
                    mSensorHelper.setCurrentMarker(mLocMarker);//定位图标旋转
                    aMap.animateCamera(CameraUpdateFactory.newLatLngZoom(location, 18));
                } else {
                    mCircle.setCenter(location);
                    mCircle.setRadius(amapLocation.getAccuracy());
                    mLocMarker.setPosition(location);
//                    aMap.animateCamera(CameraUpdateFactory.changeLatLng(location));
                }
                sendEvent(ON_LOCATION_CHANGED_EVENT, amapLocationToObject(amapLocation));
            } else {
                String errText = "定位失败," + amapLocation.getErrorCode() + ": " + amapLocation.getErrorInfo();
                Log.e("AmapErr", errText);
            }
        }
    }

    @Override
    public void activate(OnLocationChangedListener listener) {
        mListener = listener;
        if (mlocationClient == null) {
            mlocationClient = new AMapLocationClient(this.context);
            mLocationOption = new AMapLocationClientOption();
            //设置定位监听
            mlocationClient.setLocationListener(this);
            //设置为高精度定位模式
            mLocationOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
            //定位的Client将会采用设备传感器计算海拔，角度和速度
            mLocationOption.setSensorEnable(true);
            mLocationOption.setInterval(3000);
            //设置定位参数
            mlocationClient.setLocationOption(mLocationOption);
            // 此方法为每隔固定时间会发起一次定位请求，为了减少电量消耗或网络流量消耗，
            // 注意设置合适的定位时间的间隔（最小间隔支持为2000ms），并且在合适时间调用stopLocation()方法来取消定位请求
            // 在定位结束后，在合适的生命周期调用onDestroy()方法
            // 在单次定位情况下，定位无论成功与否，都无需调用stopLocation()方法移除请求，定位sdk内部会移除
            mlocationClient.startLocation();
        }
    }

    @Override
    public void deactivate() {
        mListener = null;
        if (mlocationClient != null) {
            mlocationClient.stopLocation();
            mlocationClient.onDestroy();
        }
        mlocationClient = null;
    }

    /**
     * 添加Circle
     *
     * @param latlng 坐标
     * @param radius 半径
     */
    private void addCircle(LatLng latlng, double radius) {
        CircleOptions options = new CircleOptions();
        options.strokeWidth(1f);
        options.fillColor(FILL_COLOR);
        options.strokeColor(STROKE_COLOR);
        options.center(latlng);
        options.radius(radius);
        mCircle = aMap.addCircle(options);
    }

    /**
     * 添加Marker
     */
    private void addMarker(LatLng latlng) {
        if (mLocMarker != null) {
            return;
        }
        Bitmap bMap = BitmapFactory.decodeResource(this.context.getResources(),
                R.drawable.navi_map_gps_locked);
        BitmapDescriptor des = BitmapDescriptorFactory.fromBitmap(bMap);

//		BitmapDescriptor des = BitmapDescriptorFactory.fromResource(R.drawable.navi_map_gps_locked);
        MarkerOptions options = new MarkerOptions();
        options.icon(des);
        options.anchor(0.5f, 0.5f);
        options.position(latlng);
        mLocMarker = aMap.addMarker(options);
    }

    /**
     * 向js发送params
     *
     * @param eventName
     * @param params
     */
    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        if (this.context != null) {
            ((ReactApplicationContext) this.context).getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    private WritableMap amapLocationToObject(AMapLocation amapLocation) {
        WritableMap map = Arguments.createMap();

        Double latitude = amapLocation.getLatitude();
        Double longitude = amapLocation.getLongitude();

        map.putInt("locationType", amapLocation.getLocationType());
        map.putDouble("latitude", latitude);
        map.putDouble("longitude", longitude);


        // GPS Only
        map.putDouble("accuracy", amapLocation.getAccuracy());
        map.putInt("satellites", amapLocation.getSatellites());
        map.putDouble("altitude", amapLocation.getAltitude());
        map.putDouble("speed", amapLocation.getSpeed());
        map.putDouble("bearing", amapLocation.getBearing());

        map.putString("address", amapLocation.getAddress());
        map.putString("adCode", amapLocation.getAdCode());
        map.putString("country", amapLocation.getCountry());
        map.putString("province", amapLocation.getProvince());
        map.putString("poiName", amapLocation.getPoiName());
        map.putString("provider", amapLocation.getProvider());
        map.putString("locationDetail", amapLocation.getLocationDetail());
        map.putString("street", amapLocation.getStreet());
        map.putString("streetNum", amapLocation.getStreetNum());
        map.putString("city", amapLocation.getCity());
        map.putString("cityCode", amapLocation.getCityCode());
        map.putString("country", amapLocation.getCountry());
        map.putString("district", amapLocation.getDistrict());
        // map.putString("aoiName", amapLocation.getAOIName());

        return map;
    }
}
