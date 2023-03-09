import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import { StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { colors, sizes } from '../Theme';
import { Block, Text, Button } from '../components';
import Icon from 'react-native-vector-icons/AntDesign';


const CustomDrawer = (props) =>
{
    const { logout } = useContext(AuthContext);
    const { getParent } = useContext(AuthContext);
    const [parentInfo, setParentInfo] = useState(null);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const result = await getParent();
            setParentInfo(result);
            console.log(result);
        };
        fetchData();
    }, []);
    return (
        <Block flex={ 1 } padding={ [sizes.base * 3, sizes.base] } flex={ 1 }>
            <Block center flex={ -1 } color={ colors.white }>
                <Image source={ require("../assets/icons/userDefault.png") } resizeMode='stretch' style={ { width: 100, height: 100 } } />
                { parentInfo && <Text h1 bold>{ parentInfo.FirstName + ' ' + parentInfo.LastName }</Text> }
            </Block>
            <Block>
                <DrawerContentScrollView { ...props }>
                    <Button color={ colors.secondary } style={ { borderRadius: 15 } } onPress={ () => props.navigation.navigate('Home') }>
                        <Block row center padding={ [0, sizes.base] }>
                            <Image source={ require('../assets/icons/homeScreen.png') } style={ { width: 30, height: 30, marginRight: 10 } } />
                            <Text white title bold>
                                Home
                            </Text>
                        </Block>
                    </Button>
                    <Button color={ colors.secondary } style={ { borderRadius: 15 } } onPress={ () => props.navigation.navigate('Notification') }>
                        <Block row center padding={ [0, sizes.base] }>
                            <Image source={ require('../assets/icons/notificationScreen.png') } style={ { width: 30, height: 30, marginRight: 10 } } />
                            <Text white title bold>
                                Notification
                            </Text>
                        </Block>
                    </Button>
                    <Button color={ colors.secondary } style={ { borderRadius: 15 } } onPress={ () => props.navigation.navigate('LiveMap') }>
                        <Block row center padding={ [0, sizes.base] }>
                            <Image source={ require('../assets/icons/locationScreen.png') } style={ { width: 30, height: 30, marginRight: 10 } } />
                            <Text white title bold>
                                Live Map
                            </Text>
                        </Block>
                    </Button>
                    <Button color={ colors.secondary } style={ { borderRadius: 15 } } onPress={ async () => await logout() }>
                        <Block row center padding={ [0, sizes.base] }>
                            <Image source={ require('../assets/icons/siblingScreen.png') } style={ { width: 30, height: 30, marginRight: 10 } } />
                            <Text white title bold>
                                Sibling Linking
                            </Text>
                        </Block>
                    </Button>
                    <Button color={ colors.secondary } style={ { borderRadius: 15 } } onPress={ async () => await logout() }>
                        <Block row center padding={ [0, sizes.base] }>
                            <Image source={ require('../assets/icons/contactScreen.png') } style={ { width: 30, height: 30, marginRight: 10 } } />
                            <Text white title bold>
                                Contact Us
                            </Text>
                        </Block>
                    </Button>
                </DrawerContentScrollView>
            </Block>

            <Button color={ colors.primary } onPress={ async () => await logout() }>
                <Block row center padding={ [0, sizes.base] }>
                    <Icon name="logout" color={ colors.white } size={ 20 } style={ { marginRight: 10 } } />
                    <Text white title bold>
                        LOGOUT
                    </Text>
                </Block>
            </Button>
        </Block>
    );
};

export default CustomDrawer;