import React from 'react';
import { Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import { colors, sizes } from '../../Theme';
const Stack = createStackNavigator();

export default function AuthStack()
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={ LoginScreen } options={{headerShown: false}} />
        </Stack.Navigator>
    );
}