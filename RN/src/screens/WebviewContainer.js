import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
`

const WebviewContainer = () => {
    return(
        <Container>
            <WebView
                source={{ uri: 'https://j8c101.p.ssafy.io/' }}
                geolocationEnabled={true}
            />
        </Container>
    )
}

export default WebviewContainer;