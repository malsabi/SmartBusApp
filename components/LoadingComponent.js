import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../Theme';

const LoadingComponent = () => {
    return (
        <ActivityIndicator size="large" color={colors.primary} />
    );
};

export default LoadingComponent;