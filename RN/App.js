// import React, { Component } from 'react';
// import { View, Text } from "react-native";
// import { ViroScene, ViroText } from '@viro-community/react-viro';

// const App = () =>{
//     return (
//         // <ViroScene>
//         //   <ViroText text="Hello World" position={[0, -.1, -1]} />
//         // </ViroScene>
//         <View>
//             <Text>
//                 my name is 유경 왜 안대냐 저거 
//             </Text>
//         </View>
//       );
// }



// export default App;


import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARPlane,
  ViroBox,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroARTrackingReasonConstants,
  foundAnchor
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
        <ViroText title='hi' text='hi' position={[0, 0, -1]}/>

    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});