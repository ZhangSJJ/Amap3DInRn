package com.amp3dinrn.amap;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.view.View;
import android.widget.ImageView;
import com.amap.api.maps.AMap;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amp3dinrn.R;
import com.amp3dinrn.amap.util.CircleImageView;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by sjzhang on 2017/3/11.
 */
public class MarkerPoint {
    private Context context;
    private SmoothMarker smoothMoveMarker;
    private LatLng currentPoint;
    private LatLng lastPoint;
    private String avatar;
    private Bitmap bitmap;
    private ImageView imageView;
    private String uid;

    public MarkerPoint(AMap amap, Context context, String uid) {
        this.context = context;
        this.smoothMoveMarker = new SmoothMarker(amap, context);
        this.uid = uid;
        this.smoothMoveMarker.setUid(uid);
    }

    public void setCurrentPoint(LatLng point) {
        this.currentPoint = point;
    }

    public void setLastPoint(LatLng point) {
        this.lastPoint = point;
    }

    public SmoothMarker getSmoothMoveMarker() {
        return this.smoothMoveMarker;
    }

    public LatLng getCurrentPoint() {
        return this.currentPoint;
    }

    public LatLng getLastPoint() {
        return this.lastPoint;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void clearMarker() {
        if (this.smoothMoveMarker != null) {
            this.smoothMoveMarker.clearMarker();
        }
    }

    public void moveMarker() {
        List<LatLng> points = new ArrayList<LatLng>();
        if (this.lastPoint != null) {
            points.add(this.lastPoint);
        }
        points.add(this.currentPoint);
        // 设置 平滑移动的 图标

        View view = View.inflate(this.context, R.layout.marker, null);
        imageView = (ImageView) view.findViewById(R.id.icon_image_back);
        setNetworkBitmap();
        this.smoothMoveMarker.setDescriptor(BitmapDescriptorFactory.fromView(view));

//        // 取轨迹点的第一个点 作为 平滑移动的启动
//        LatLng drivePoint = points.get(0);
//        Pair<Integer, LatLng> pair = SpatialRelationUtil.calShortestDistancePoint(points, drivePoint);
//        points.set(pair.first, drivePoint);
//        List<LatLng> subList = points.subList(pair.first, points.size());
        // 设置轨迹点
        this.smoothMoveMarker.setPoints(points);
        // 设置平滑移动的总时间  单位  毫秒
        this.smoothMoveMarker.setTotalDuration(3000);
        // 开始移动
        this.smoothMoveMarker.startSmoothMove();
    }

    public void setNetworkBitmap() {
        if ("".equals(avatar) || avatar == null) {
            return;
        }
        Runnable networkImg = new Runnable() {
            @TargetApi(Build.VERSION_CODES.KITKAT)
            @Override
            public void run() {
                try {
                    URL conn = new URL(avatar);
                    InputStream in = conn.openConnection().getInputStream();
                    Bitmap bm = BitmapFactory.decodeStream(in);
                    bm = CircleImageView.getCroppedBitmap(bm, bm.getWidth() > bm.getHeight() ? bm.getHeight() : bm.getWidth());
//                    bm.setHeight(20);
//                    bm.setWidth(20);
                    bitmap = bm;
                    in.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
        new Thread(networkImg).start();
        while (bitmap == null) {
            continue;
        }
        imageView.setImageBitmap(bitmap);
    }
}
