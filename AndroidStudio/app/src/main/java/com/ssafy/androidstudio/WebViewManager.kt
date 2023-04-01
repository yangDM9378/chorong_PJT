package com.ssafy.androidstudio

import android.content.Context
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient

class WebViewManager(private val context: Context) {
    private var webview: WebView? = null

    fun getWebView(): WebView {
        if (webview == null) {
            webview = WebView(context)
            webview?.webViewClient = WebViewClient()
            webview?.webChromeClient = WebChromeClient()
        }
        return webview as WebView
    }

    fun destroyWebView() {
        webview?.stopLoading()
        webview?.webChromeClient = null
        webview?.destroy()
        webview = null
    }
}