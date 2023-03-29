package com.ssafy.androidstudio

import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView

class WebviewContainer : AppCompatActivity() {
    private lateinit var webview: WebView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webview_container)

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
        }

        webview.loadUrl("https://j8c101.p.ssafy.io/")
        webview.webViewClient = WebViewClient()
        webview.webChromeClient = WebChromeClient()
    }

    override fun onBackPressed() {
        webview = findViewById(R.id.webview)

        if (webview.canGoBack()) { webview.goBack() }
        else { finish() }
    }
}