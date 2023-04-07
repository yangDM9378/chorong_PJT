package com.ssafy.androidstudio.hellogeospatial.helpers

import android.app.AlertDialog
import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.DialogFragment
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okio.IOException


class SuccessfulFragment(val accessToken: String?, val culturalProperty: String?) : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return activity?.let {
            val elapsedTime = this.arguments!!.getString("time")
            val elapsedDist = this.arguments!!.get("distance")
            val builder = AlertDialog.Builder(it)
            Thread {
                successRequest()
            }.start()
            builder.setTitle("축하합니다!")
            builder.setMessage("모든 별⭐을 획득하셨습니다!\n\n이동한 거리: $elapsedDist 미터\n\n걸린 시간: $elapsedTime\n")
                .setPositiveButton("웹으로 돌아가기"
                ) { _, _ ->
                    it.onBackPressed()
                }
                .setNegativeButton("공유하기"
                ) { _, _ ->
                    val share = Intent(Intent.ACTION_SEND)
                    share.type = "text/plain"
                    share.putExtra(Intent.EXTRA_TEXT, "\uD83C\uDFC6초롱따라\uD83C\uDFC6 ( ˃ ⩌˂)\n\n" +
                            "=====나의 기록=====\n" +
                            "이동한 거리: $elapsedDist 미터\n" +
                            "걸린 시간: $elapsedTime\n\n" +
                            "같이 문화재 탐방을 해봐요!\nhttps://j8c101.p.ssafy.io/"
                    )
                    startActivity(Intent.createChooser(share, "share"))
                    it.onBackPressed()
                }
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }

    fun successRequest(){
        val client = OkHttpClient()
        if (culturalProperty != null && accessToken != null) {
            val strBody = "{\"culturalPropertyId\":\"${culturalProperty}\", \"starType\":\"ar\"}"
            val requestBody: RequestBody = RequestBody.create("application/json; charset=utf-8".toMediaTypeOrNull(), strBody)
            val request = Request.Builder()
                .url("https://j8c101.p.ssafy.io/api/v1/cultural-properties/star")
                .post(requestBody)
                .addHeader("Authorization", "Bearer ${accessToken}")
                .addHeader("Content-Type", "application/json") // Content-Type 설정
                .build()

            client.newCall(request).execute().use { response ->
                if (response.body != null) {
                    // success handler
                    print("body is good=================")
                    print(response.body!!.toString())
                } else {
                    // fail handler
                    print("body is null=================")
                }
            }
        }
    }
}