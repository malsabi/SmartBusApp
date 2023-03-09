import { registerIndieID } from 'native-notify';
import { APP_ID, APP_TOKEN } from '../consts/AppConsts';
import AuthService from '../services/AuthService';
import LoginParentResponseDto from '../DTOs/Auth/LoginParentResponseDto';
import { AuthContext } from '../context/AuthContext';
import React, { Component, useContext, useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import { Button, Block, Input, Text } from "../components";
import { colors, sizes } from "../Theme";

export default function LoginScreen()
{
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    const handleLogin = async () => 
    {
        Keyboard.dismiss();
        setLoginLoading(true);
        const errors = [];
        const result = await AuthService.login(email, password);

        if (result !== null && result.isSuccess)
        {
            //Create an object of LoginParentResponseDto that contains two fields: 1. ParentDto of type object 2. AuthToken of type string
            const loginResponse = new LoginParentResponseDto(result.response.ParentDto, result.response.AuthToken);
            //Save the ParentDto and AuthToken using AsyncStorage
            login(JSON.stringify(loginResponse));
            //Register this device.
            await registerIndieID(loginResponse.parentDto.ID.toString(), APP_ID, APP_TOKEN);
        }
        else
        {
            const errorTitle = result.problemDetails.title;
            console.log("Error Title: " + errorTitle);
            if (errorTitle == "ParentEmailNotFound")
            {
                errors.push("email");
            }
            else
            {
                errors.push("password");
            }
            setErrors(errors);
        }

        //Stop login button loading
        setLoginLoading(false);
    };

    return (
        <KeyboardAvoidingView style={ styles.login } behavior="padding">
            <Block padding={ [sizes.base * 3, sizes.base * 2] }>
                <Text h1 bold>
                    Parent Login
                </Text>
                <Block center middle>
                    <Image source={ require("../assets/icons/login.png") } resizeMode='center' style={ { width: '100%', height: '100%' } } />
                </Block>
                <Block middle color={ colors.accewhitent }>
                    <Input
                        label="Email"
                        error={ hasErrors("email") }
                        style={ [styles.input, hasErrors("email")] }
                        defaultValue={ email }
                        onChangeText={ text => setEmail(text) } />

                    <Input
                        secure
                        label="Password"
                        error={ hasErrors("password") }
                        style={ [styles.input, hasErrors("password")] }
                        defaultValue={ password }
                        onChangeText={ text => setPassword(text) } />

                    <Button gradient onPress={ () => handleLogin() }>
                        { loginLoading ? (<ActivityIndicator size="small" color="white" />) : (<Text bold white center> Login </Text>) }
                    </Button>

                    <Button>
                        <Text gray caption center style={ { textDecorationLine: "underline" } }>
                            Forgot your password?
                        </Text>
                    </Button>
                </Block>
            </Block>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: colors.gray,
        borderBottomWidth: 1.5
    },
    hasErrors: {
        borderBottomColor: colors.accent
    }
});