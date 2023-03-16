import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, View } from 'react-native';
import { Block, Text } from '../components';
import { colors, sizes } from '../Theme';
import { AuthContext } from '../context/AuthContext';
import ParentService from '../services/ParentService';
import { color } from 'react-native-reanimated';

export default function SiblingScreen()
{
    const { getParent } = useContext(AuthContext);
    const { getAuthToken } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchParentStudents()
    {
        setRefreshing(true);
        const authToken = await getAuthToken();
        const parent = await getParent();
        const result = await ParentService.getParentChildren(authToken, parent.ID);
        if (result.isSuccess)
        {
            setData(result.response.Students);
        }
        else
        {
            setData(null);
        }
        setRefreshing(false);
    }

    useEffect(() =>
    {
        fetchParentStudents();
    }, []);


    function renderChildItem({ item })
    {
        const lastSeen = new Date(item.LastSeen).toLocaleString();
        return (
            <Block column flex={ 1 } padding={ sizes.base } style={ styles.itemContainerStyle }>
                <Image source={ { uri: `data:image/png;base64,${item.Image}` } } style={ styles.imageStyle } />
                <Block column flex={ 1 } color={ colors.white }>
                    <View>
                        <Text h1 bold style={ styles.titleStyle }>Information</Text>
                        <View style={ styles.infoContainer }>
                            <Text h2 semibold>{ item.FirstName + ' ' + item.LastName }</Text>
                            <Text h2 semibold>{ item.Gender }</Text>
                        </View>
                    </View>
                    <View>
                        <View style={ styles.activityContainer }>
                            <Text h1 bold style={ styles.titleStyle }>Last Seen</Text>
                            <View style={ styles.activityBubble }>
                                <Text h2 semibold style={ styles.activityText }>{ lastSeen }</Text>
                            </View>
                        </View>
                        <View style={ styles.activityContainer }>
                            <Text h1 bold style={ styles.titleStyle }>Activity</Text>
                            <View style={ styles.activityBubble }>
                                <Text h2 semibold style={ styles.activityText }>{ item.IsOnBus ? 'On Bus' : item.IsAtSchool ? 'At School' : 'At Home' }</Text>
                            </View>
                        </View>
                    </View>
                </Block>
            </Block>
        );
    };

    return (
        <View stlye={ styles.contentContainer }>
            <FlatList
                data={ data }
                renderItem={ renderChildItem }
                refreshing={ refreshing }
                onRefresh={ fetchParentStudents }
                style={ styles.flatListStyle }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: colors.white,
    },
    flatListStyle: {
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
    },
    itemContainerStyle: {
        borderBottomColor: colors.darkGray,
        borderBottomWidth: 1
    },
    imageStyle:
    {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
    },
    titleStyle: {
        marginVertical: 10,
    },
    infoContainer: {
        marginBottom: 10,
    },
    activityContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    activityBubble: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    activityText: {
        color: colors.white,
    },
});