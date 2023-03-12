import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../HomeScreen';
import LiveMapScreen from '../LiveMapScreen';
import NotificationScreen from '../NotificationScreen';
import SiblingScreen from '../SiblingScreen';
import ContactScreen from '../ContactScreen';
import CustomDrawer from '../../navigation/CustomDrawer';

const MainDrawer = createDrawerNavigator();

export default function AppStack()
{
    return (
        <MainDrawer.Navigator drawerContent={ (props) => <CustomDrawer { ...props } /> } >
            <MainDrawer.Screen name="Home" component={ HomeScreen } />
            <MainDrawer.Screen name="Notification" component={ NotificationScreen } />
            <MainDrawer.Screen name="LiveMap" component={ LiveMapScreen } />
            <MainDrawer.Screen name="Sibling" component={ SiblingScreen } />
            <MainDrawer.Screen name="Contact" component={ ContactScreen } />
        </MainDrawer.Navigator>
    );
}