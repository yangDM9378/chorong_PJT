package com.ssafy.androidstudio

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ssafy.androidstudio.recyclingtrashcans.TrashcanGeoActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webview: WebView
    private var backBtnTime: Long = 0

    inner class WebAppInterface(private val mContext: Context) {
        @JavascriptInterface
        fun showGame(message: String) {
            Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show()
            val intent = Intent(mContext, TrashcanGeoActivity::class.java)
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
            // JavaScript 인터페이스 활성화
            addJavascriptInterface(WebAppInterface(this@MainActivity), "Android")
        }

        webview.loadUrl("https://j8c101.p.ssafy.io/")
//        webview.loadUrl("http://192.168.100.130:3000")

        webview.webViewClient = WebViewClient()
        webview.webChromeClient = WebChromeClient()
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
}