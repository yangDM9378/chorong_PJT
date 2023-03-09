package com.ssafy.chorongddara.common.util;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.chorongddara.common.model.CulturalPropertyInfo;
import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

public class CulturalPropertyInfoSaxHandler extends DefaultHandler {
    //파싱한 Stock객체를 넣을 리스트
    private List<CulturalPropertyInfo> culturalPropertyInfoList;
    //파싱한 Stock 객체
    private CulturalPropertyInfo culturalPropertyInfo;
    //character 메소드에서 저장할 문자열 변수
    private String str;

    public CulturalPropertyInfoSaxHandler() {
        culturalPropertyInfoList = new ArrayList<>();
    }

    public void startElement(String uri, String localName, String name, Attributes att) {
        //시작 태그를 만났을 때 발생하는 이벤트
        if(name.equals("item")) {
            culturalPropertyInfo = new CulturalPropertyInfo();
            culturalPropertyInfoList.add(culturalPropertyInfo);
        }
    }
    public void endElement(String uri, String localName, String name) {
        //끝 태그를 만났을 때,
        if(name.equals("ccbaAsno")) {
            culturalPropertyInfo.setCcbaAsno(str);
        }else if(name.equals("ccbaCtcd")) {
            culturalPropertyInfo.setCcbaCtcd(str);
        }else if(name.equals("ccbaKdcd")) {
            culturalPropertyInfo.setCcbaKdcd(str);
        }
    }
    public void characters(char[] ch, int start, int length) {
        //태그와 태그 사이의 내용을 처리
        str = new String(ch,start,length);
    }
    public List<CulturalPropertyInfo> getCulturalPropertyInfoList(){
        return culturalPropertyInfoList;
    }
    public void setCulturalPropertyInfoList(List<CulturalPropertyInfo> culturalPropertyInfoList) {
        this.culturalPropertyInfoList = culturalPropertyInfoList;
    }
}
        