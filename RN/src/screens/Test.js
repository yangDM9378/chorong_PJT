import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'

const Container = styled.View`
`

const Test = () => {
    return(
        <Container>
            <Text>
                Test 페이지 입니다.
            </Text>
        </Container>
    )
}

export default Test;