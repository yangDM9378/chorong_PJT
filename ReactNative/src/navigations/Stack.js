import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WebviewContainer from '../screens/WebviewContainer';
import ArView from '../screens/ArView';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="WebviewContainer" component={WebviewContainer}/>
            <Stack.Screen name="ArView" component={ArView}/>
        </Stack.Navigator>
    )
}
export default StackNavigation;