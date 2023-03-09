import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import TripService from '../services/TripService';
import MapView, { Marker } from 'react-native-maps';

export default function LiveMapScreen()
{
    const { getParent } = useContext(AuthContext);
    const { getAuthToken } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const fetchData = async () =>
    {
        const parent = await getParent();
        const authToken = await getAuthToken();

        const response = await TripService.getStudentBusLocation(authToken, parent.ID);
        console.log('Response: ', response);
        try
        {
            if (response.isSuccess)
            {
                const parts = response.response.split('|');
                const longitude = parts[0];
                const latitude = parts[1];

                console.log('longitude: ', longitude);
                console.log('latitude: ', latitude);

                setData({ longitude, latitude });
            }
            else
            {
                setData(null);
            }
        }
        catch
        {
            setData(null);
        }
    };

    useEffect(() =>
    {
        const intervalId = setInterval(() =>
        {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={ styles.container }>
            { data === null ? (
                <Text>No children on the bus at the moment</Text>
            ) : (
                <MapView
                    style={ styles.map }
                    region={ {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    } }>
                    <Marker coordinate={ { latitude: data.latitude, longitude: data.longitude } } />
                </MapView>
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});