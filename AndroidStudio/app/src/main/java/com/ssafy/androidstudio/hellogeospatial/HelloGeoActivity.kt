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
package com.ssafy.androidstudio.hellogeospatial;

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.WebView
import android.widget.Button
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.ar.core.Config
import com.google.ar.core.Session
import com.ssafy.androidstudio.hellogeospatial.helpers.*
import com.ssafy.androidstudio.common.helpers.FullScreenHelper
import com.ssafy.androidstudio.common.samplerender.SampleRender
import com.google.ar.core.exceptions.CameraNotAvailableException
import com.google.ar.core.exceptions.UnavailableApkTooOldException
import com.google.ar.core.exceptions.UnavailableDeviceNotCompatibleException
import com.google.ar.core.exceptions.UnavailableSdkTooOldException
import com.google.ar.core.exceptions.UnavailableUserDeclinedInstallationException
import com.ssafy.androidstudio.R

class HelloGeoActivity : AppCompatActivity() {
//  static 값을 정의하는 object
  companion object {
    private const val TAG = "HelloGeoActivity"
  }

// lateinit은 "late initialization"의 줄임말 변수의 선언 시점에서 초기화하지 않고, 나중에 사용하기 전까지 초기화를 미룰 수 있는 기능
// 변수의 타입이 nullable하지 않아야 합
  lateinit var arCoreSessionHelper: ARCoreSessionLifecycleHelper
  lateinit var view: HelloGeoView
  lateinit var renderer: HelloGeoRenderer
  override fun onCreate(savedInstanceState: Bundle?) {
    // super.onCreate(savedInstanceState)은 부모 클래스의 onCreate 메서드를 호출하는 것
    super.onCreate(savedInstanceState)
    // Setup ARCore session lifecycle helper and configuration.
    arCoreSessionHelper = ARCoreSessionLifecycleHelper(this)
    // If Session creation or Session.resume() fails, display a message and log detailed
    // information.
    arCoreSessionHelper.exceptionCallback =
      { exception ->
        val message =
          when (exception) {
            is UnavailableUserDeclinedInstallationException ->
              "Please install Google Play Services for AR"
            is UnavailableApkTooOldException -> "Please update ARCore"
            is UnavailableSdkTooOldException -> "Please update this app"
            is UnavailableDeviceNotCompatibleException -> "This device does not support AR"
            is CameraNotAvailableException -> "Camera not available. Try restarting the app."
            else -> "Failed to create AR session: $exception"
          }
        Log.e(TAG, "ARCore threw an exception", exception)
        view.snackbarHelper.showError(this, message)
      }

    // Configure session features.
    // Geospatial Enabled 설정
    arCoreSessionHelper.beforeSessionResume = ::configureSession
    // lifecyvcle : 앱의 컴포넌트(Activity, Fragment 등)의 라이프사이클 관리를 돕는 클래스
    // 옵저버는 라이프사이클 이벤트가 발생할 때마다 호출되는 콜백 메소드를 가지고 있는 클래스
    // 라이프사이클 이벤트를 감지하기 위한 옵저버를 추가하는 메소드 이를 통해 라이프사이클 이벤트에 대한 처리를 수행할 수 있습니다.
    lifecycle.addObserver(arCoreSessionHelper)

    // Set up the Hello AR renderer.
    val intent = getIntent()
    val accessToken = intent.getStringExtra("accessToken")
    val culturalProperty = intent.getStringExtra("culturalProperty")

    renderer = HelloGeoRenderer(this, accessToken, culturalProperty)
    lifecycle.addObserver(renderer)

    // Set up Hello AR UI.
    view = HelloGeoView(this)
    lifecycle.addObserver(view)

    // 안드로이드 앱에서 화면에 표시될 레이아웃을 설정하는 메소드
    // activity_main.xml과 같은 레이아웃 파일을 화면에 표시하는 데 사용
    setContentView(view.root)
    // Sets up an example renderer using our HelloGeoRenderer.
    val startButton: Button = findViewById(R.id.start_button)
    val collectButton: Button = findViewById(R.id.collect_button)
    val bagTextView: TextView = findViewById(R.id.bag_textview)
    val consoleButton: Switch = findViewById(R.id.console_switch)

    collectButton.visibility = View.INVISIBLE
    bagTextView.visibility = View.INVISIBLE
    consoleButton.visibility = View.INVISIBLE

    startButton.setOnClickListener{
//      val fragInfo = ChooseBubbleFragment()
//      fragInfo.show(supportFragmentManager, "choose-bubble")
//      renderer.startRundom(10)
      renderer.startRundom(25)
    }
    SampleRender(view.surfaceView, renderer, assets)
  }

  // Configure the session, setting the desired options according to your usecase.
  private fun configureSession(session: Session) {
    session.configure(
      session.config.apply {
        // Enable Geospatial Mode.
        geospatialMode = Config.GeospatialMode.ENABLED
      }
    )
  }

  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String>,
    results: IntArray
  ) {
    super.onRequestPermissionsResult(requestCode, permissions, results)
    if (!GeoPermissionsHelper.hasGeoPermissions(this)) {
      // Use toast instead of snackbar here since the activity will exit.
      Toast.makeText(this, "Camera and location permissions are needed to run this application", Toast.LENGTH_LONG)
        .show()
      if (!GeoPermissionsHelper.shouldShowRequestPermissionRationale(this)) {
        // Permission denied with checking "Do not ask again".
        GeoPermissionsHelper.launchPermissionSettings(this)
      }
      finish()
    }
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    FullScreenHelper.setFullScreenOnWindowFocusChanged(this, hasFocus)
  }
}
