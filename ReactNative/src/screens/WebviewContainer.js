import React, { Component } from 'react';
import { SafeAreaView, Text } from "react-native";
import { WebView } from 'react-native-webview';


const WebviewContainer = () =>{
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{padding: 10}}>Hello</Text>
          <WebView 
            source={{ uri: 'http://j8c101.p.ssafy.io/' }} 
            style={{marginTop:20}}
            geolocationEnabled={true}
          />
        </SafeAreaView>
      );
}



export default WebviewContainer;