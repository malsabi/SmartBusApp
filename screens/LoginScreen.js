import { Theme } from '../Theme';
import { React, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { registerIndieID } from 'native-notify';
import { APP_ID, APP_TOKEN } from '../consts/AppConsts';
import { Image, Input, Button, CheckBox, Text, ThemeProvider } from 'react-native-elements';
import AuthService from '../services/AuthService';
import LoginParentResponseDto from '../DTOs/Auth/LoginParentResponseDto';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen()
{
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [staySignedIn, setStaySignedIn] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => 
    {
        setLoginLoading(true);
        const result = await AuthService.login(email, password);

        if (result == null)
        {
            //Show a network error that it failed to make the request.
            setLoginError('Network error. Failed to make request.');
        }
        else if (result.isSuccess)
        {
            if (staySignedIn)
            {
                //Create an object of LoginParentResponseDto that contains two fields: 1. ParentDto of type object 2. AuthToken of type string
                const loginResponse = new LoginParentResponseDto(result.response.ParentDto, result.response.AuthToken);
                //Save the ParentDto and AuthToken using AsyncStorage
                login(JSON.stringify(loginResponse));
                //Register this device.
                await registerIndieID(loginResponse.parentDto.ID.toString(), APP_ID, APP_TOKEN);
            }
        }
        else
        {
            //Show the reason why it is invalid by accessing the result.problemDetails.detail
            setLoginError(result.problemDetails.detail);
        }

        //Stop login button loading
        setLoginLoading(false);

        //Remove the LoginError after 5 seconds.
        setTimeout(() =>
        {
            setLoginError('');
        }, 5000);
    };

    return (
        <ThemeProvider theme={ Theme }>
            <View style={ styles.container }>
                <Text style={ Theme.LoginHeader.textStyle }>Smart Bus Parent Portal</Text>
                <Image style={ Theme.Image.imageStyle } source={ require('../assets/Bus.png') } />
                <Text h3 style={ styles.title }>LOGIN</Text>
                <Input
                    placeholder='Email'
                    value={ email }
                    onChangeText={ setEmail }
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    value={ password }
                    onChangeText={ setPassword }
                />
                <CheckBox
                    title='Stay Signed In'
                    checked={ staySignedIn }
                    onPress={ () => setStaySignedIn(!staySignedIn) }
                />
                <Button
                    title='LOGIN'
                    onPress={ handleLogin }
                    loading={ loginLoading }
                    containerStyle={ Theme.Button.containerViewStyle }
                />
                { loginError ? (<Text style={ Theme.Text.errorStyle }>{ loginError }</Text>) : null }
            </View>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        height: '100%',
        width: '100%'
    },
    title: {
        marginBottom: 20,
        alignSelf: 'center'
    },
});