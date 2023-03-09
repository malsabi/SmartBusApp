import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from '../screens/stacks/AppStack';
import AuthStack from '../screens/stacks/AuthStack';
import LoadingComponent from '../components/LoadingComponent';
import { AuthContext } from '../context/AuthContext';
import registerNNPushToken from 'native-notify';
import { APP_ID, APP_TOKEN } from '../consts/AppConsts';
import { Block } from '../components';

export default function AppNav()
{
    registerNNPushToken(APP_ID, APP_TOKEN);
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading)
    {
        return (
            <View style={ styles.loadingContainer }>
                <LoadingComponent />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Block white>
                { userToken != null ? <AppStack /> : <AuthStack /> }
            </Block>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
});