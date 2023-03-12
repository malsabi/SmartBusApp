import { React, useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity, View } from 'react-native';
import { colors, sizes } from '../Theme';
import { Text, Block } from '../components';
import { APP_ID, APP_TOKEN } from '../consts/AppConsts';
import { AuthContext } from '../context/AuthContext';
import { getIndieNotificationInbox, deleteIndieNotificationInbox } from 'native-notify';

export default function NotificationScreen()
{
    const { getParent } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchData() 
    {
        setRefreshing(true);
        const parent = await getParent();
        let notifications = await getIndieNotificationInbox(parent.ID.toString(), APP_ID, APP_TOKEN);
        setData(notifications);
        setRefreshing(false);
    }

    async function handleDeleteNotification(notificationId) 
    {
        setRefreshing(true);
        const parent = await getParent();
        let notifications = await deleteIndieNotificationInbox(parent.ID.toString(), notificationId, APP_ID, APP_TOKEN);
        setData(notifications);
        setRefreshing(false);
    };

    useEffect(() =>
    {
        fetchData();
    }, []);

    const renderNotificationItem = ({ item }) => (
        <Block row flex={ 1 } style={ styles.mainBlockStyle }>
            <Block flex={ -1 } padding={ sizes.base }>
                <Image source={ require('../assets/icons/newMessage.png') } style={ styles.imageStyle } />
            </Block>
            <Block column middle flex={ 1 }>
                <Text title bold>{ item.title }</Text>
                <Text h3>{ item.message }</Text>
            </Block>
            <Block column middle flex={ -1 }>
                <TouchableOpacity onPress={ () => handleDeleteNotification(item.notification_id) }>
                    <Image source={ require('../assets/icons/deleteMessage.png') } style={ styles.deleteIconStyle } />
                </TouchableOpacity>
            </Block>
        </Block>
    );

    return (
        <View stlye={ styles.contentContainer }>
            <FlatList
                data={ data }
                renderItem={ renderNotificationItem }
                keyExtractor={ (item) => item.notification_id }
                refreshing={ refreshing }
                onRefresh={ fetchData }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
    },
    mainBlockStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2
    },
    imageStyle:
    {
        width: 32,
        height: 32
    },
    deleteIconStyle:
    {
        width: 32,
        height: 32
    }
});