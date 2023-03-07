import { Theme } from '../Theme';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Avatar, Icon, Text } from 'react-native-elements';
import { React, useContext, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const DrawerComponent = (props) =>
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
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Avatar
                    rounded
                    icon={ { name: 'user', type: 'font-awesome' } }
                    size={ 60 }
                    containerStyle={ styles.avatarContainer }
                />
                { parentInfo && <Text style={ styles.username }>{ parentInfo.FirstName + ' ' + parentInfo.LastName }</Text> }
            </View>
            <DrawerContentScrollView { ...props }>
                <DrawerItemList { ...props } />
            </DrawerContentScrollView>
            <DrawerItem
                label="Logout"
                title="Logout"
                icon={ ({ color, size }) => <Icon name="logout" type="antdesign" color={ color } size={ size } /> }
                onPress={ async () =>
                {
                    logout();
                } }
                labelStyle={ { color: Theme.Text.errorStyle } }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.grey0,
    },
    header: {
        backgroundColor: Theme.colors.primary,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarContainer: {
        backgroundColor: Theme.colors.grey5,
    },
    username: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default DrawerComponent;