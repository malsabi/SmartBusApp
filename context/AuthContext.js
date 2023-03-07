import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_RESPONSE_KEY } from '../consts/AppConsts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>
{
    const [isLoading, setIsLoading] = useState(true); 
    const [userToken, setUserToken] = useState(null);

    useEffect(() =>
    {
        const getUserToken = async () =>
        {
            try
            {
                const token = await AsyncStorage.getItem(LOGIN_RESPONSE_KEY);
                if (token !== userToken)
                {
                    setUserToken(token);
                }
            } catch (error)
            {
                console.log(error);
            } finally
            {
                setIsLoading(false);
            }
        };
        getUserToken();
    }, [userToken]);

    async function login(token)
    {
        setIsLoading(false);
        setUserToken(token);
        await AsyncStorage.setItem(LOGIN_RESPONSE_KEY, token);
    }

    async function logout()
    {
        setIsLoading(false);
        setUserToken(null);
        await AsyncStorage.removeItem(LOGIN_RESPONSE_KEY);
    }

    async function getParent()
    {
        const loginResponse = await AsyncStorage.getItem(LOGIN_RESPONSE_KEY);
        if (loginResponse !== null)
        {
            const loginResponseJson = JSON.parse(loginResponse);
            return loginResponseJson.parentDto;
        }
        return null;
    }

    async function getAuthToken()
    {
        const loginResponse = await AsyncStorage.getItem(LOGIN_RESPONSE_KEY);
        if (loginResponse !== null)
        {
            const loginResponseJson = JSON.parse(loginResponse);
            return loginResponseJson.authToken;
        }
        return null;
    }

    return (
        <AuthContext.Provider value={{login, logout, getParent, getAuthToken, isLoading, userToken}}>
            { children }
        </AuthContext.Provider>
    );
}