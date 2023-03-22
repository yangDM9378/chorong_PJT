import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
    margin-top: 10%;
`

const StyleButton = styled.TouchableOpacity`
    margin: 30px 70px;
    background-color: green;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`


const Home = ({ navigation }) => {
    return (
        <Container>
            <StyleButton onPress={() => navigation.navigate('ArGPS')}>
                <ButtonText>ArGPS</ButtonText>
            </StyleButton>
            <StyleButton onPress={() => navigation.navigate('ArGame')}>
                <ButtonText>ArGame</ButtonText>
            </StyleButton>
            <StyleButton onPress={() => navigation.navigate('WebviewContainer')}>
                <ButtonText>WebviewContainer</ButtonText>
            </StyleButton>
            <StyleButton onPress={() => navigation.navigate('Test')}>
                <ButtonText>Test</ButtonText>
            </StyleButton>
        </Container>
    )
}

export default Home;