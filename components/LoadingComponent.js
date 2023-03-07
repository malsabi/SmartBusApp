import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Theme } from '../Theme';

const LoadingComponent = () => {
    return (
        <ActivityIndicator size="large" color={Theme.colors.primary} />
    );
};

export default LoadingComponent;