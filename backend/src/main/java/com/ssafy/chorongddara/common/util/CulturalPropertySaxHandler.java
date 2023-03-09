package com.ssafy.chorongddara.common.util;

import com.ssafy.chorongddara.common.model.CulturalPropertyInfo;
import com.ssafy.chorongddara.db.entity.CulturalProperty;
import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import java.util.ArrayList;
import java.util.List;

public class CulturalPropertySaxHandler extends DefaultHandler {
    //파싱한 Stock객체를 넣을 리스트
    private List<CulturalProperty> culturalPropertyList;
    //파싱한 Stock 객체
    private CulturalProperty culturalProperty;
    //character 메소드에서 저장할 문자열 변수
    private String str;

    public CulturalPropertySaxHandler() {
        culturalPropertyList = new ArrayList<>();
    }

    public void startElement(String uri, String localName, String name, Attributes att) {
        //시작 태그를 만났을 때 발생하는 이벤트
        if(name.equals("result")) {
            culturalProperty = new CulturalProperty();
            culturalPropertyList.add(culturalProperty);
        }
    }
    public void endElement(String uri, String localName, String name) {
        //끝 태그를 만났을 때,
        if (name.equals("ccbaMnm1")) {
            culturalProperty.setNameKo(str);
        } else if (name.equals("ccbaMnm2")) {
            culturalProperty.setNameCh(str);
        } else if (name.equals("latitude")) {
            culturalProperty.setLatitude(Double.parseDouble(str));
        } else if (name.equals("longitude")) {
            culturalProperty.setLongitude(Double.parseDouble(str));
        } else if (name.equals("ccbaLcad")) {
            culturalProperty.setAddress(str);
        } else if (name.equals("content")) {
            culturalProperty.setDescription(str);
        } else if (name.equals("imageUrl")) {
            culturalProperty.setImage(str);
        } else if (name.equals("scodeName")) {
            culturalProperty.setNameCh(str);
        }
    }

    public void characters(char[] ch, int start, int length) {
        //태그와 태그 사이의 내용을 처리
        str = new String(ch,start,length);
    }
    public List<CulturalProperty> getCulturalPropertyInfoList(){
        return culturalPropertyList;
    }
    public void setCulturalPropertyInfoList(List<CulturalProperty> culturalPropertyList) {
        this.culturalPropertyList = culturalPropertyList;
    }
}
        