import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../HomeScreen';
import LiveMapScreen from '../LiveMapScreen';
import DrawerComponent from '../../components/DrawerComponent';
import NotificationScreen from '../NotificationScreen';

const Drawer = createDrawerNavigator();

export default function AppStack()
{
    return (
        <Drawer.Navigator drawerContent={ (props) => <DrawerComponent { ...props } /> } >
            <Drawer.Screen name="Home" component={ HomeScreen } />
            <Drawer.Screen name="Notification" component={ NotificationScreen } />
            <Drawer.Screen name="LiveMap" component={ LiveMapScreen } />
        </Drawer.Navigator>
    );
}