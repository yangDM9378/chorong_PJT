/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ssafy.androidstudio.hellogeospatial.helpers

import android.opengl.GLSurfaceView
import android.view.View
import android.widget.TextView
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import com.google.android.gms.maps.SupportMapFragment
import com.google.ar.core.Earth
import com.google.ar.core.GeospatialPose
import com.ssafy.androidstudio.hellogeospatial.HelloGeoActivity
import com.ssafy.androidstudio.R
import com.ssafy.androidstudio.common.helpers.SnackbarHelper

/** Contains UI elements for Hello Geo. */
class HelloGeoView(val activity: HelloGeoActivity) : DefaultLifecycleObserver {
    // context(activity), resource(xml), root

    // context: 뷰를 생성하는 데 사용되는 컨텍스트
    // resource: 인플레이트할 XML 레이아웃 파일의 리소스 ID
    // root: 인플레이트한 뷰 계층 구조의 최상위 뷰로 사용될 ViewGroup (null 이면 뷰 계층 구조의 최상위 뷰가 반환됨)

    // XML 레이아웃 파일을 기반으로하여 새로운 뷰 계층 구조를 만듭니다
  val root = View.inflate(activity, R.layout.activity_game_back, null)
  val surfaceView = root.findViewById<GLSurfaceView>(R.id.surfaceview)

  val session
    get() = activity.arCoreSessionHelper.session

  val snackbarHelper = SnackbarHelper()

  var mapView: MapView? = null

  val mapFragment =
    (activity.supportFragmentManager.findFragmentById(R.id.map)!! as SupportMapFragment).also {
      it.getMapAsync { googleMap -> mapView = MapView(activity, googleMap) }
    }

    val statusText = root.findViewById<TextView>(R.id.statusText)
    fun updateStatusText(earth: Earth, cameraGeospatialPose: GeospatialPose?, distances: ArrayList<Float>) {
        activity.runOnUiThread {
            val poseText = if (cameraGeospatialPose == null) "" else
                activity.getString(
                    R.string.geospatial_pose,
                    cameraGeospatialPose.latitude,
                    cameraGeospatialPose.longitude,
                    cameraGeospatialPose.horizontalAccuracy,
                    cameraGeospatialPose.altitude,
                    cameraGeospatialPose.verticalAccuracy,
                    cameraGeospatialPose.heading,
                    cameraGeospatialPose.headingAccuracy)
            var distanceText = ""
            distances.forEachIndexed{index, dist ->
                distanceText = "$distanceText\nDistance to Star ${index+1}: $dist"
            }
            statusText.text = activity.resources.getString(
                R.string.earth_state,
                earth.earthState.toString(),
                earth.trackingState.toString(),
                poseText,
                distanceText,
            )
        }
    }

  override fun onResume(owner: LifecycleOwner) {
    surfaceView.onResume()
  }

  override fun onPause(owner: LifecycleOwner) {
    surfaceView.onPause()
  }
}
