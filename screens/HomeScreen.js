import { React, useEffect } from 'react';
import { Theme } from '../Theme';
import { Text } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const HomeScreen = () => 
{
    useEffect(() => 
    {
        
    });

    return (
        <View style={ styles.container }>
            <Text style={ styles.welcomeText }>Welcome to Smart Bus Parent Portal!</Text>
            <View style={ styles.notificationContainer }>
                <Text style={ styles.notificationHeader }>Recent Notifications:</Text>
                <Text style={ styles.notification }>Your child has boarded the bus</Text>
                <Text style={ styles.notification }>Your child has arrived at school</Text>
            </View>
            <View style={ styles.scheduleContainer }>
                <Text style={ styles.scheduleHeader }>Upcoming Schedule:</Text>
                <Text style={ styles.schedule }>Bus1: 8:00am - 8:30am</Text>
                <Text style={ styles.schedule }>Bus2: 9:00am - 9:30am</Text>
            </View>
            <View style={ styles.safetyTipsContainer }>
                <Text style={ styles.safetyTipsHeader }>Bus Safety Tips:</Text>
                <Text style={ styles.safetyTips }>- Remind your child to stay seated and not to distract the driver</Text>
                <Text style={ styles.safetyTips }>- Encourage your child to wear a seatbelt if available</Text>
                <Text style={ styles.safetyTips }>- Teach your child how to exit the bus safely in case of an emergency</Text>
            </View>
            <View style={ styles.actionContainer }>
                <TouchableOpacity style={ styles.actionButton }>
                    <Text style={ styles.actionText }>Request Bus Stop Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.actionButton }>
                    <Text style={ styles.actionText }>Contact School Administration</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationContainer: {
        marginBottom: 20,
    },
    notificationHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notification: {
        fontSize: 16,
        marginBottom: 0,
    },
    scheduleContainer: {
        marginBottom: 20,
    },
    scheduleHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    schedule: {
        fontSize: 16,
        marginBottom: 0,
    },
    actionContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    safetyTipsContainer: {
        backgroundColor: Theme.colors.greyOutline,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    safetyTipsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    safetyTips: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default HomeScreen;