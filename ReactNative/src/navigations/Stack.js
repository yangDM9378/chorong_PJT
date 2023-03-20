import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WebView from '../screens/WebView';
import ArView from '../screens/ArView';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="WebView" component={WebView}/>
            <Stack.Screen name="ArView" component={ArView}/>
        </Stack.Navigator>
    )
}
export default StackNavigation;