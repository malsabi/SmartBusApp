import { React, useContext, useEffect, useState } from 'react';
import { colors, sizes } from '../Theme';
import { StyleSheet, View, Image, } from 'react-native';
import { Block, Text, Button } from '../components';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen()
{
    const { getParent } = useContext(AuthContext);
    const { getAuthToken } = useContext(AuthContext);
    const [parent, setParent] = useState(null);

    async function getDataAsync()
    {
        setParent(await getParent());
    }

    useEffect(() =>
    {
        getDataAsync();
    }, []);

    return (
        <View style={ styles.containerStyle }>
            <View style={ styles.headerContainerStyle }>
                <Text h1 bold>Hello, { [parent?.FirstName, ' ', parent?.LastName] }!</Text>
                <Text h2 black>Have a nice day !</Text>
            </View>
            <View style={ styles.recentContainerStyle }>
                <Text h2 bold>Recent Notifications</Text>
                <View style={ styles.dataContainerStyle }>
                    <Text title>- Your child has boarded the bus</Text>
                    <Text title>- Your child has arrived at school</Text>
                </View>
            </View>
            <View style={ styles.upcomingContainerStyle }>
                <Text h2 bold>Up coming schedule</Text>
                <View style={ styles.dataContainerStyle }>
                    <Text title>- Bus(1) 8:00am - 8:30am</Text>
                    <Text title>- Bus(2) 9:00am - 9:30am</Text>
                </View>
            </View>
            <View style={ styles.statsContainerStyle }>
                <View style={ styles.statsRowStyle }>
                    <View style={ styles.statsBoxStyle }>
                        <View style={ styles.statsHeaderStyle }>
                            <Text black h2 regular>Total Siblings</Text>
                        </View>
                        <View style={ styles.statsBodyStyle }>
                            <Image style={ styles.statsImageStyle } source={ require('../assets/icons/family.png') } />
                            <Text black h1 bold>5</Text>
                        </View>
                        <View style={ styles.statsFooterStyle }>
                            <Text>3/20/2023 11:00 AM</Text>
                        </View>
                    </View>
                    <View style={ styles.statsBoxStyle }>
                        <View style={ styles.statsHeaderStyle }>
                            <Text black h2 regular>Current On Bus</Text>
                        </View>
                        <View style={ styles.statsBodyStyle }>
                            <Image style={ styles.statsImageStyle } source={ require('../assets/Bus.png') } />
                            <Text black h1 bold>2</Text>
                        </View>
                        <View style={ styles.statsFooterStyle }>
                            <Text>3/20/2023 11:00 AM</Text>
                        </View>
                    </View>
                </View>
                <View style={ styles.statsRowStyle }>
                    <View style={ styles.statsBoxStyle }>
                        <View style={ styles.statsHeaderStyle }>
                            <Text black h2 regular>Current At Home</Text>
                        </View>
                        <View style={ styles.statsBodyStyle }>
                            <Image style={ styles.statsImageStyle } source={ require('../assets/icons/home.png') } />
                            <Text black h1 bold>1</Text>
                        </View>
                        <View style={ styles.statsFooterStyle }>
                            <Text>3/20/2023 11:00 AM</Text>
                        </View>
                    </View>
                    <View style={ styles.statsBoxStyle }>
                        <View style={ styles.statsHeaderStyle }>
                            <Text black h2 regular>Current At School</Text>
                        </View>
                        <View style={ styles.statsBodyStyle }>
                            <Image style={ styles.statsImageStyle } source={ require('../assets/icons/school.png') } />
                            <Text black h1 bold>3</Text>
                        </View>
                        <View style={ styles.statsFooterStyle }>
                            <Text>3/20/2023 11:00 AM</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={ styles.actionsContainerStyle }>
                <Button gradient>
                    <Text h2 bold white center>Request Bus Stop Change</Text>
                </Button>
                <Button gradient>
                    <Text h2 bold white center>Contact School Administration</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
        padding: sizes.base * 1,
    },
    headerContainerStyle: {
        flex: -1,
        flexDirection: 'column',
        borderBottomWidth: 1.5,
        borderColor: colors.gray2,
        paddingBottom: 10,
        marginBottom: 20,
    },
    recentContainerStyle: {
        flex: 0,
        flexDirection: 'column',
        flexWrap: 'wrap',
        borderRadius: 30,
        backgroundColor: colors.primary,
        padding: 20,
    },
    upcomingContainerStyle: {
        flex: 0,
        flexDirection: 'column',
        flexWrap: 'wrap',
        borderRadius: 30,
        backgroundColor: colors.secondary,
        padding: 20,
        marginVertical: 10,
    },
    dataContainerStyle: {
        marginVertical: 10,
    },
    statsContainerStyle: {
        flex: -1,
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    statsRowStyle: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        columnGap: 10,
    },
    statsBoxStyle: {
        flexDirection: 'column',
        width: '48%',
        height: 150,
        backgroundColor: colors.lightGray,
        marginBottom: 10,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray2
    },
    statsHeaderStyle: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    statsBodyStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    statsFooterStyle: {
        flexDirection: 'column',
        marginVertical: 10,
    },
    statsImageStyle: {
        width: 35,
        height: 35,
    },
    actionsContainerStyle: {
        flex: 1,
        flexDirection: 'column',
    },
});