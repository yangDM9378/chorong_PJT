import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import ArGame from '../screens/ArGame';
import ArGPS from '../screens/ArGPS';
import WebviewContainer from '../screens/WebviewContainer';
import Test from '../screens/Test'

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen 
                name="Home" 
                component={Home}
            />
            <Stack.Screen 
                name="ArGame" 
                component={ArGame}
            />
            <Stack.Screen 
                name="ArGPS" 
                component={ArGPS}
            />
            <Stack.Screen 
                name="WebviewContainer" 
                component={WebviewContainer}
            />
            <Stack.Screen 
                name="Test" 
                component={Test}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation;