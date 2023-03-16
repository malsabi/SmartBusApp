import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Block, Text } from '../components';
import { colors, sizes } from '../Theme';

export default function CustomHeader({ navigation, route })
{
    const screenName = route.name;
    return (
        <Block row
               flex={'100%'}
               paddingTop={sizes.base * 3}
               paddingBottom={sizes.base * 3}
               paddingLeft={sizes.base}
               color={colors.black}>

            <TouchableOpacity onPress={ () => navigation.openDrawer() }>
                <Image source={ require('../assets/icons/menuButton.png') }
                       style={ { width: 25, height: 25 } } />
            </TouchableOpacity>
            <Block center>
                <Text white h1>{ screenName }</Text>
            </Block>
        </Block>
    );
};