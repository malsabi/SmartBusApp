import { colors } from 'react-native-elements';

export const Theme = {
    colors: {
        primary: '#008080',
        secondary: '#FFA500',
        grey0: '#f5f5f5',
        grey1: '#dcdcdc',
        grey2: '#919191',
        grey3: '#212121',
        grey4: '#424242',
        grey5: '#616161',
        greyOutline: '#bfbfbf',
        success: '#4CAF50',
        error: '#FF5252',
        warning: '#FFC107',
        divider: colors.grey3,
    },
    Button: {
        titleStyle: {
            color: '#ffffff',
        },
        buttonStyle: {
            marginTop: 20,
        },
        containerViewStyle: {
            width: '100%'
        }
    },
    Input: {
        placeholderTextColor: '#bfbfbf',
        inputStyle: {
            color: '#212121',
        },
        inputContainerStyle: {
            borderBottomColor: '#bfbfbf',
        },
    },
    CheckBox: {
        checkedColor: '#008080',
        containerStyle: {
            backgroundColor: '#ffffff',
            borderWidth: 0,
        },
        textStyle: {
            color: '#212121',
        },
    },
    Text: {
        h3Style: {
            color: '#008080',
        },
        errorStyle: {
            backgroundColor: 'red',
            color: 'white',
            padding: 10,
            marginTop: 10,
        },
    },
    Header: {
        backgroundColor: '#fff',
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,
    },
    Icon: {
        color: '#008080',
    },
    ListItem: {
        containerStyle: {
            borderBottomColor: '#dcdcdc',
            borderBottomWidth: 1,
        },
        titleStyle: {
            color: '#212121',
        },
        subtitleStyle: {
            color: '#616161',
        },
        chevronColor: '#dcdcdc',
    },
    Image: {
        imageStyle: {
            width: 200,
            height: 200,
            marginBottom: 20,
            alignSelf: 'center',
        }
    },
    LoginHeader: {
        backgroundColor: '#008080',
        height: 50,
        textStyle: {
            color: '#616161',
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 30,
        }
    }
};