import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import LoginHeaderComponent from '../../components/LoginHeaderComponent';

const Stack = createStackNavigator();

export default function AuthStack()
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={ LoginScreen } options={ { header: (props) => <LoginHeaderComponent { ...props } /> } } />
        </Stack.Navigator>
    );
}