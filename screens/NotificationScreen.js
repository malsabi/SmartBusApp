import { FlatList } from 'react-native';
import { React, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { APP_ID, APP_TOKEN } from '../consts/AppConsts';
import { AuthContext } from '../context/AuthContext';
import { getIndieNotificationInbox, deleteIndieNotificationInbox } from 'native-notify';
import { TouchableOpacity } from 'react-native-web';

export default function NotificationScreen()
{
    const { getParent } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => 
    {
        async function fetchData() 
        {
            const parent = await getParent();
            console.log('ParentID: ', parent.ID.toString());
            let notifications = await getIndieNotificationInbox(parent.ID.toString(), APP_ID, APP_TOKEN);
            console.log("notifications: ", notifications);
            setData(notifications);
        }
        fetchData();
    }, []);

    return (
        <View style={ styles.screen }>
            <View style={ styles.body }>
                <FlatList data={ data }
                    keyExtractor={ item => item.notification_id }
                    renderItem={ ({ item }) =>
                    {
                        return (
                            <View style={ styles.noteCont }>
                                <Text style={ styles.title }>{ item.title }</Text>
                                <Text style={ styles.messageText }>{ item.message }</Text>
                                <Text style={ styles.dateText } >{ item.dateSent }</Text>
                            </View>
                        );
                    } } />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4'
    },
    body: {
        flex: 8,
        width: '100%',
    },

    noteCont: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 0.75,
        barderColor: '#d8d8d8'
    },
    title: {
        width: '90%',
        marginBottom: 5,
        fontSize: 14,
    },
    messageText: {
        marginTop: 2,
        fontSize: 14,
        marginTop: 5
    },
    dateText: {
        marginTop: 2,
        fontSize: 14,
        marginTop: 5,
        textAlign: 'right',
    }
});