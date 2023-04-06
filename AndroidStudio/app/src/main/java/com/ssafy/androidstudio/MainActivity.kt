package com.ssafy.androidstudio

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.webkit.GeolocationPermissions
import android.webkit.JavascriptInterface
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.ssafy.androidstudio.hellogeospatial.HelloGeoActivity
import com.ssafy.androidstudio.recyclingtrashcans.TrashcanGeoActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webview : WebView
    private var backBtnTime: Long = 0
    private var previousePage: Boolean = false
    private val CAMERA_PERMISSION_REQUEST_CODE = 100
    private val LOCATION_PERMISSION_REQUEST_CODE = 0


    inner class WebAppInterface(private val mContext: Context) {
        @JavascriptInterface
        fun showGame(message: String) {
            if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this@MainActivity, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_PERMISSION_REQUEST_CODE)
            }
            var data = message.split("\n")
            Toast.makeText(mContext, "별 3개를 찾아주세요", Toast.LENGTH_SHORT).show()
            val intent = Intent(mContext, HelloGeoActivity::class.java)
            intent.putExtra("accessToken", data[0])
            intent.putExtra("culturalProperty", data[1])
            mContext.startActivity(intent)
        }

        @JavascriptInterface
        fun showGPS(message: String) {
            if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this@MainActivity, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_PERMISSION_REQUEST_CODE)
            }
            val data = message
            Toast.makeText(mContext, "문화재 찾아가기", Toast.LENGTH_SHORT).show()
            val intent = Intent(mContext, TrashcanGeoActivity::class.java)
            intent.putExtra("culturalProperty", data)
            mContext.startActivity(intent)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        webview = findViewById(R.id.webview)

        webview.apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.setSupportMultipleWindows(true)
            settings.javaScriptCanOpenWindowsAutomatically = true
            settings.loadWithOverviewMode = true
            settings.useWideViewPort = true
            settings.setSupportZoom(false)
            settings.builtInZoomControls = false
            settings.databaseEnabled = true
            settings.setGeolocationEnabled(true)
            settings.allowFileAccess = true
            // JavaScript 인터페이스 활성화
            addJavascriptInterface(WebAppInterface(this@MainActivity), "Android")
        }

        webview.loadUrl("https://j8c101.p.ssafy.io/")
//        webview.webViewClient = WebViewClient()
        webview.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this@MainActivity, arrayOf(Manifest.permission.CAMERA), CAMERA_PERMISSION_REQUEST_CODE)
                }
            }

            override fun onLoadResource(view: WebView?, url: String?) {
                super.onLoadResource(view, url)
                if (url != null) {
                    Log.d("WebView", url)
                    val targetUrl = "https:\\/\\/j8c101\\.p\\.ssafy\\.io\\/api\\/v1\\/cultural-properties\\/\\d+".toRegex()
                    if (targetUrl.matches(url)){
                        if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                            ActivityCompat.requestPermissions(this@MainActivity, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_PERMISSION_REQUEST_CODE)
                        }
//                        if (previousePage) {
//                            webview.reload()
//                            previousePage = false
//                        }
                    }
                    if (url.equals("https://j8c101.p.ssafy.io/pose/pose_mansae.png")){
                        previousePage = true
                    }
                }
            }
        }

        webview.webChromeClient = object : WebChromeClient() {
            var geolocationCallback: GeolocationPermissions.Callback? = null
            override fun onGeolocationPermissionsShowPrompt(origin: String, callback: GeolocationPermissions.Callback) {
                super.onGeolocationPermissionsShowPrompt(origin, callback)
                geolocationCallback = callback
                // 권한이 있을 경우 콜백 호출하여 승인
                geolocationCallback?.invoke(origin, true, false)
            }

            // 카메라 권한
            override fun onPermissionRequest(request: PermissionRequest) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    request.grant(request.resources)
                }
            }

        }
    }

    override fun onBackPressed() {
        val curTime = System.currentTimeMillis()
        val gapTime = curTime - backBtnTime

        if (webview.canGoBack()) {
            webview.goBack()
        } else if (0 <= gapTime && 2000 >= gapTime) {
            super.onBackPressed()
        } else {
            backBtnTime = curTime
            Toast.makeText(this, "한번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onPause() {
        super.onPause()
        webview.reload()
        webview.onPause()
    }
    override fun onResume() {
        super.onResume()
        webview.onResume()
    }
}