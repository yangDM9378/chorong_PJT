package com.ssafy.androidstudio.hellogeospatial.helpers

import android.app.AlertDialog
import android.app.Dialog
import android.os.Bundle
import android.text.InputType
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.fragment.app.DialogFragment
import com.google.android.material.textfield.TextInputLayout
import com.ssafy.androidstudio.hellogeospatial.HelloGeoActivity
import com.ssafy.androidstudio.R

class ChooseBubbleFragment : DialogFragment() {
    // DialogFragment 클래스 내부에서 오버라이드하여 사용
    // Dialog는 안드로이드에서 사용자와 상호작용할 수 있는 팝업 윈도우를 의미
    // 화면 중앙에 작은 창을 띄워 사용자와 상호작용
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        // activity가 null이 아닐 때 코드 블록을 실행하는 코틀린 람다 함수
        return activity?.let {
            // 경고창 다이얼로그를 만드는 데 사용
            // it은 Fragment의 context
            val builder = AlertDialog.Builder(it)
            builder.setTitle("Choose Bubble Size")

            // 고유한 view id를 생성하는 데 사용
            val editTextId = View.generateViewId()

            // EditText 생성자에서는 it 즉, context를 인자로 받아 새로운 EditText 인스턴스를 생성
            val editText = EditText(it)
            // AlertDialog에 해당하는 EditText를 생성하여 id, inputType을 추가
            editText.id = editTextId
            // 숫자값만 지정하도록 설정
            editText.inputType = InputType.TYPE_CLASS_NUMBER
            // 문자열을 입력
            editText.setText("100")

            val textInputLayout = TextInputLayout(it)
            textInputLayout.hint = "Meters"
            textInputLayout.addView(editText)
            textInputLayout.setPadding(20,20,20,20)

            // ositiveButton을 추가하고 그 버튼을 클릭했을 때 실행될 동작을 지정하는 부분
            builder.setPositiveButton("Start"){_,_->
                val startButton: Button = it.findViewById(R.id.start_button)
                val bagTextView: TextView = it.findViewById(R.id.bag_textview)
                val z = editText.text.toString()
                (activity as HelloGeoActivity).view.activity.renderer.startRundom(z.toInt())
//                (activity as HelloGeoActivity).renderer.startRundom(z.toInt())
                startButton.visibility = View.INVISIBLE
                bagTextView.visibility = View.VISIBLE
            }
            builder.setView(textInputLayout)
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}