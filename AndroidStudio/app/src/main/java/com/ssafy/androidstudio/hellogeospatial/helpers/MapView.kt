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

import android.graphics.*
import android.location.Location
import android.util.Log
import androidx.annotation.ColorInt
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*
import com.google.ar.core.Anchor
import com.google.ar.core.Earth
import com.ssafy.androidstudio.hellogeospatial.HelloGeoActivity
import com.ssafy.androidstudio.R
import com.ssafy.androidstudio.common.custom.CulturalProperty
import java.util.*
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt


class MapView(val activity: HelloGeoActivity, val googleMap: GoogleMap) {
  private val CAMERA_MARKER_COLOR: Int = Color.argb(255, 0, 255, 0)
  private val STAR_MARKER_COLOR: Int = Color.argb(255, 255, 255, 255)

  var setInitialCameraPosition = false
  val cameraMarker = createMarker(CAMERA_MARKER_COLOR)
  var cameraIdle = true
//  lateinit var currentPolyline: Polyline
  lateinit var currentCircle: Circle

  init {
    googleMap.uiSettings.apply {
      isMapToolbarEnabled = false
      isIndoorLevelPickerEnabled = false
      isZoomControlsEnabled = false
      isTiltGesturesEnabled = false
      isScrollGesturesEnabled = true
    }

    googleMap.setOnMarkerClickListener { unused -> false }

    // Add listeners to keep track of when the GoogleMap camera is moving.
    googleMap.setOnCameraMoveListener { cameraIdle = false }
    googleMap.setOnCameraIdleListener { cameraIdle = true }
  }

  fun drawRoute(locations: List<LatLng>){
    if(this::currentCircle.isInitialized){
      currentCircle.center = locations.first()
    }
    else{
      currentCircle = googleMap.addCircle(createCircle(locations.first(),0.0))
    }
  }

   fun clearRoute(){
     if(this::currentCircle.isInitialized){
       currentCircle.remove()
     }
   }

  private fun createOuterBounds(): List<LatLng?> {
    val delta = 0.01f
    return object : ArrayList<LatLng?>() {
      init {
        add(LatLng((90 - delta).toDouble(), (-180 + delta).toDouble()))
        add(LatLng(0.0, (-180 + delta).toDouble()))
        add(LatLng((-90 + delta).toDouble(), (-180 + delta).toDouble()))
        add(LatLng((-90 + delta).toDouble(), 0.0))
        add(LatLng((-90 + delta).toDouble(), (180 - delta).toDouble()))
        add(LatLng(0.0, (180 - delta).toDouble()))
        add(LatLng((90 - delta).toDouble(), (180 - delta).toDouble()))
        add(LatLng((90 - delta).toDouble(), 0.0))
        add(LatLng((90 - delta).toDouble(), (-180 + delta).toDouble()))
      }
    }
  }

  private val EARTH_RADIUS = 6371

  private fun createHole(center: LatLng, radiusMeter: Double): Iterable<LatLng> {
    val radiusKM = radiusMeter * 0.001
    val points = 50
    val radiusLatitude = Math.toDegrees((radiusKM / EARTH_RADIUS.toFloat()))
    val radiusLongitude = radiusLatitude / cos(Math.toRadians(center.latitude))
    val result: MutableList<LatLng> = ArrayList(points)
    val anglePerCircleRegion = 2 * Math.PI / points
    for (i in 0 until points) {
      val theta = i * anglePerCircleRegion
      val latitude = center.latitude + radiusLatitude * Math.sin(theta)
      val longitude = center.longitude + radiusLongitude * Math.cos(theta)
      result.add(LatLng(latitude, longitude))
    }
    return result
  }

  private fun createPolygonWithCircle(center: LatLng, radiusMeter: Double): PolygonOptions {
    return PolygonOptions()
      .fillColor(0xff789E9E9E.toInt())
      .addAll(createOuterBounds())
      .addHole(createHole(center, radiusMeter))
      .strokeWidth(0f)
  }

  private fun createCircle(center: LatLng, radiusMeter: Double): CircleOptions {
    return CircleOptions()
      .center(center)
      .fillColor(0x500000ff) // 원의 내부 색상 (ARGB 형식)
      .strokeWidth(0f)
      .radius(radiusMeter)
      .strokeColor(Color.BLUE) // 원의 외부 선 색상
      .strokeWidth(2f) // 원의 외부 선 두께 (픽셀 단위)
  }

  fun generateRadius(location: LatLng, radiusMeter: Double){
//    val polygonOptions = createPolygonWithCircle(location,radiusMeter)
    val circleOptions = createCircle(location, radiusMeter)
//    googleMap.addPolygon(polygonOptions)
    googleMap.addCircle(circleOptions)
  }

  fun generateStars(earth: Earth, meterRadius: Int, culturalProperty: String?): Pair<ArrayList<Anchor>, ArrayList<Marker>>{
    val anchors = arrayListOf<Anchor>()
    val markers = arrayListOf<Marker>()
//    val location = earth.cameraGeospatialPose

    val location = Location("some location").apply {
      // 장덕동
//      latitude = 35.1936
//      longitude = 126.8095

      // ssafy logo
//      latitude = 35.205356
//      longitude = 126.811636

      // giseondong
//      latitude = 35.14891073
//      longitude = 126.9330876

      val cpData = activity.resources.getStringArray(R.array.cp)
      var resultCP: String = CulturalProperty.getCP(culturalProperty, cpData)

      val cpString = resultCP.split("|")
      latitude = cpString[0].trim().toDouble()
      longitude = cpString[1].trim().toDouble()

    }

//    35.14891073|126.9330876
    val radiusInDegrees = (meterRadius / 111000f).toDouble()
      for (i in 1..3) {
        var isOutOfBubble = true
        lateinit var ranLatLng: LatLng
        while(isOutOfBubble){
          val random = Random()
          val u: Double = random.nextDouble()
          val v: Double = random.nextDouble()
          val w = radiusInDegrees * sqrt(u)
          val t = 2 * Math.PI * v
          val x = w * cos(t)
          val y = w * sin(t)

          val newX = x / cos(Math.toRadians(location.longitude))
          val foundLatitude: Double = newX + location.latitude
          val foundLongitude: Double = y + location.longitude
          val userLoc = Location("itemLoc")
          val ranLoc = Location("ranLoc")

          userLoc.latitude = location.latitude
          userLoc.longitude = location.longitude
          ranLoc.latitude = foundLatitude
          ranLoc.longitude = foundLongitude

          val dist = userLoc.distanceTo(ranLoc)
          if(dist < meterRadius){
            isOutOfBubble = false
            ranLatLng = LatLng(foundLatitude,foundLongitude)
          }
        }

//        val marker: Marker? = googleMap.addMarker(MarkerOptions().position(ranLatLng).title("Star $i"))
        val marker: Marker? = createMarkers(ranLatLng, STAR_MARKER_COLOR, "Star $i")

        if(marker != null){
          markers.add(marker)
        }
        //anchors away
        // Place the earth anchor at the same altitude as that of the camera to make it easier to view.
        val altitude = earth.cameraGeospatialPose.altitude
        // The rotation quaternion of the anchor in the East-Up-South (EUS) coordinate system.
        val qx = 0f
        val qy = 0f
        val qz = 0f
        val qw = 1f
        val anchor = earth.createAnchor(ranLatLng.latitude, ranLatLng.longitude, altitude, qx, qy, qz, qw)
        anchors.add(anchor)
      }
//    generateRadius(LatLng(cpLatitude,cpLongitude),meterRadius.toDouble())
    generateRadius(LatLng(location.latitude,location.longitude),meterRadius.toDouble())
    return Pair(anchors,markers)
  }

  private fun createMarkers(
    location: LatLng,
    color: Int,
    title: String,
    size: Float = 0.035f // 크기 비율 (1.0f = 원본 크기)
  ): Marker {
    val markersOptions = MarkerOptions()
      .position(location)
      .draggable(false)
      .anchor(0.5f, 0.5f)
      .flat(true)
      .title(title)
      .icon(BitmapDescriptorFactory.fromBitmap(createColoredMarkersBitmap(color, size)))
    return googleMap.addMarker(markersOptions)!!
  }

  private fun createColoredMarkersBitmap(@ColorInt color: Int, size: Float): Bitmap {
    val opt = BitmapFactory.Options()
    opt.inMutable = true
    val navigationIcon =
      BitmapFactory.decodeResource(activity.resources, R.drawable.ic_star, opt)
    val width = (navigationIcon.width * size).toInt()
    val height = (navigationIcon.height * size).toInt()
    val scaledIcon = Bitmap.createScaledBitmap(navigationIcon, width, height, true)
    val p = Paint()
    p.colorFilter = LightingColorFilter(color,  /* add= */1)
    val canvas = Canvas(scaledIcon)
    canvas.drawBitmap(scaledIcon,  /* left= */0f,  /* top= */0f, p)
    return scaledIcon
  }


  fun updateMapPosition(latitude: Double, longitude: Double, heading: Double) {
    val position = LatLng(latitude, longitude)
    activity.runOnUiThread {
      // If the map is already in the process of a camera update, then don't move it.
      if (!cameraIdle) {
        return@runOnUiThread
      }
      cameraMarker.isVisible = true
      cameraMarker.position = position
      cameraMarker.rotation = heading.toFloat()

      val cameraPositionBuilder: CameraPosition.Builder = if (!setInitialCameraPosition) {
        // Set the camera position with an initial default zoom level.
        setInitialCameraPosition = true
        CameraPosition.Builder().zoom(19f).target(position)
      } else {
        // Set the camera position and keep the same zoom level.
        CameraPosition.Builder()
          .zoom(googleMap.cameraPosition.zoom)
          .target(position)
      }
      googleMap.moveCamera(
        CameraUpdateFactory.newCameraPosition(cameraPositionBuilder.build()))
    }
  }

  /** Creates and adds a 2D anchor marker on the 2D map view.  */
  private fun createMarker(
    color: Int,
    size: Float = 0.3f // 크기 비율 (1.0f = 원본 크기)
  ): Marker {
    val markersOptions = MarkerOptions()
      .position(LatLng(0.0,0.0))
      .draggable(false)
      .anchor(0.5f, 0.5f)
      .flat(true)
      .visible(false)
      .icon(BitmapDescriptorFactory.fromBitmap(createColoredMarkerBitmap(color, size)))
    return googleMap.addMarker(markersOptions)!!
  }

  private fun createColoredMarkerBitmap(@ColorInt color: Int, size: Float): Bitmap {
    val opt = BitmapFactory.Options()
    opt.inMutable = true
    val navigationIcon =
      BitmapFactory.decodeResource(activity.resources, R.drawable.ic_arrow_white_48dp, opt)
    val width = (navigationIcon.width * size).toInt()
    val height = (navigationIcon.height * size).toInt()
    val scaledIcon = Bitmap.createScaledBitmap(navigationIcon, width, height, true)
    val p = Paint()
    p.colorFilter = LightingColorFilter(color,  /* add= */1)
    val canvas = Canvas(scaledIcon)
    canvas.drawBitmap(scaledIcon,  /* left= */0f,  /* top= */0f, p)
    return scaledIcon
  }
}
