import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LiveMapScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
  return (
    <View>
      <Text>Live Map Screen</Text>
    </View>
  );
};

export default LiveMapScreen;