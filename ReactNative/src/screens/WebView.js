import React from "react";
import { Button } from 'react-native';
import styled from "styled-components/native";

const Container = styled.View`
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const WebView = ({ navigation }) =>{
    return (
        <Container>
            <StyledText>WebView</StyledText>
            <Button
            title="go to the ar view"
            onPress={() => navigation.navigate('ArView')}
            />
        </Container>
    )
}

export default WebView;