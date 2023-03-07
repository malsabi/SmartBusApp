import { Theme } from '../Theme';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import React from 'react';

const LoginHeaderComponent = () =>
{
    return (
        <ThemeProvider theme={ Theme }>
            <View style={ Theme.LoginHeader }>
            </View>
        </ThemeProvider>
    );
};

export default LoginHeaderComponent;