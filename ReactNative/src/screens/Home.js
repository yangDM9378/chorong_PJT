import React from "react";
import { View, Button } from "react-native";


const Home = ({ navigation }) =>{
    return (
        <View>
            <Button
                title="ArGPS"
                onPress={() => navigation.navigate("ArGPS")}
            />
            <Button
                title="ArGame"
                onPress={() => navigation.navigate("ArGame")}
            />
            <Button
                title="Webview"
                onPress={() => navigation.navigate("WebviewContainer")}
            />
        </View>
    )
}

export default Home;