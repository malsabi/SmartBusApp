import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Block, Text } from '../components';
import { AuthContext } from '../context/AuthContext';
import TripService from '../services/TripService';
import MapView, { Marker } from 'react-native-maps';
import { colors, sizes } from '../Theme';

//const longitude = 55.375420;
//const latitude = 25.328357;
const faqs = [
    { question: '1. How do I track my child\'s bus in real-time?', url: 'https://example.com/faqs#bus-tracking' },
    { question: '2. What if my child loses their bus pass?', url: 'https://example.com/faqs#bus-pass' },
    { question: '3. How do I add a new stop to my child\'s bus route?', url: 'https://example.com/faqs#add-stop' },
    { question: '4. What should I do if my child\'s bus is running late?', url: 'https://example.com/faqs#late-bus' },
    { question: '5. How do I change my child\'s bus route?', url: 'https://example.com/faqs#change-route' },
    { question: '6. What if my child has a different pick-up or drop-off location?', url: 'https://example.com/faqs#different-location' },
    { question: '7. How do I pay for my child\'s bus pass?', url: 'https://example.com/faqs#pay-bus-pass' },
    { question: '8. What if my child needs special accommodations on the bus?', url: 'https://example.com/faqs#special-accommodations' },
  ];

export default function LiveMapScreen()
{
    const { getParent } = useContext(AuthContext);
    const { getAuthToken } = useContext(AuthContext);
    const [data, setData] = useState(null); //useState(null) useState({ longitude, latitude })

    const fetchData = async () =>
    {
        const parent = await getParent();
        const authToken = await getAuthToken();
        const response = await TripService.getStudentBusLocation(authToken, parent.ID);

        try
        {
            if (response.isSuccess)
            {
                const parts = response.response.split('|');
                const longitude = parts[0];
                const latitude = parts[1];

                setData({ longitude, latitude });
            }
            else
            {
                //setData({ longitude, latitude });
                setData(null);
            }
        }
        catch
        {
            //setData({ longitude, latitude });
            setData(null);
        }
    };

    useEffect(() =>
    {
        const intervalId = setInterval(() =>
        {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Block flex={ 1 }>
            { data == null ?
                (<Block column color={ colors.white } padding={ [sizes.base, sizes.base] }>
                    <Block column flex={-1} color={colors.lightOrange } padding={ sizes.base } style={{ borderRadius: 15}}>
                        <Text h1 bold color={colors.darkGray } style={{textDecorationLine: 'underline'}}>Notice</Text>
                        <Text h1 height={ 35 } color={colors.darkGray }>
                            No children on board the bus. If you have any questions
                            or concerns, please contact our customer service team by
                            visiting our "Contact Us" page. Thank you.
                        </Text>
                    </Block>

                    <Block column flex={1} color={colors.lightGray } padding={ sizes.base } marginTop={20} marginBottom={20} style={{ borderRadius: 15}} >
                        <Text h1 bold color={colors.darkGray } style={{textDecorationLine: 'underline'}}>FAQS</Text>
                        <FlatList
                            data={ faqs }
                            renderItem={ ({ item }) => (
                                <TouchableOpacity onPress={ () => Linking.openURL(item.url) }>
                                    <Block style={styles.mainBlockStyle} paddingLeft={ sizes.base } paddingTop={ sizes.base * 2} paddingBottom={5}>
                                        <Text h2 color={'#0077CC'}>{ item.question }</Text>
                                    </Block>
                                </TouchableOpacity>
                            ) }
                            keyExtractor={ (item, index) => index.toString() }
                            contentContainerStyle={styles.contentContainer}
                        />
                    </Block>
                </Block>)
                :
                (<MapView style={ styles.map }
                    region={ {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    } }>
                    <Marker coordinate={ { latitude: data.latitude, longitude: data.longitude } } title="School Bus" description="Live school bus tracking">
                        <Image source={ require('../assets/Bus.png') } style={ styles.markerImageStyle } resizeMode='contain' />
                    </Marker>
                </MapView>)
            }
        </Block>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
    },
    mainBlockStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.black
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerImageStyle: {
        width: 42,
        height: 42,
    }
});