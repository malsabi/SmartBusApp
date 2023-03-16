import React, { useContext, useState } from 'react';
import { Alert, Dimensions, View, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button, Input, Text } from '../components';
import ContactDto from '../DTOs/Contact/ContactDto';
import ContactService from '../services/ContactService';
import { AuthContext } from '../context/AuthContext';
import { colors, sizes } from '../Theme';
import InputValidation from '../Utils/InputValidation';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function ContactScreen()
{
    const { getAuthToken } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    const handleFirstNameChange = (text) =>
    {
        setFirstName(text);
    };

    const handleLastNameChange = (text) =>
    {
        setLastName(text);
    };

    const handleEmailChange = (text) =>
    {
        setEmail(text);
    };

    const handleMessageChange = (text) =>
    {
        setMessage(text);
    };

    const handleModalClose = () =>
    {
        setShowModal(false);
    };

    const handleShowModal = () =>
    {
        setShowModal(true);
    };

    const handleSubmit = async () =>
    {
        Keyboard.dismiss();
        setSubmitLoading(true);

        const errors = [];

        if (!firstName)
        {
            errors.push('First Name');
        }
        if (!lastName)
        {
            errors.push('Last Name');
        }
        if (!email || !InputValidation.validateEmail(email))
        {
            errors.push('Email Address');
        }
        if (!message)
        {
            errors.push('Message');
        }
        
        setErrors(errors);
        if (errors.length > 0)
        {
            setSubmitLoading(false);
            Alert.alert('Please fix the following errors:', errors.join(', '));
            return;
        }

        var authToken = await getAuthToken();
        var result = await ContactService.postMessage(
            new ContactDto(firstName, lastName, email, message),
            authToken,
        );

        if (result.isSuccess)
        {
            Alert.alert("Success", "Your message has been sent!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
        } 
        else
        {
            Alert.alert("Error", "There was an error sending your message. Please try again.");
        }
        setSubmitLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss } accessible={ false }>
            <KeyboardAvoidingView style={ styles.containerStyle } behavior="position">
                <Text h1 bold style={ styles.titleStyle }>Talk to our Customer Service</Text>
                <Text h2 left style={ styles.bodyStyle }>
                    Have questions about tracking, registration, fees, issues? Fill
                    out the form and an expert from our team will be in touch shortly.
                </Text>

                <View style={ styles.formStyle }>
                    <View style={ styles.groupStyle }>
                        <Text h2 bold>First Name</Text>
                        <Input placeholder="First Name" error={ hasErrors("First Name") } style={ [styles.inputStyle, hasErrors("First Name")] } onChangeText={ handleFirstNameChange } value={ firstName } />
                    </View>
                    <View style={ styles.groupStyle }>
                        <Text h2 bold>Last Name</Text>
                        <Input placeholder="Last Name" error={ hasErrors("Last Name") } style={ [styles.inputStyle, hasErrors("Last Name")] } onChangeText={ handleLastNameChange } value={ lastName } />
                    </View>
                    <View style={ styles.groupStyle }>
                        <Text h2 bold>Email Address</Text>
                        <Input placeholder="Email Address" error={ hasErrors("Email Address") } style={ [styles.inputStyle, hasErrors("Email Address")] } onChangeText={ handleEmailChange } value={ email } />
                    </View>
                    <View style={ styles.groupStyle }>
                        <Text h2 bold>Message</Text>
                        <Input placeholder="Message" multiline={ true } error={ hasErrors("Message") } style={ [styles.inputStyle, { height: 100, textAlignVertical: 'top' }, hasErrors("Message")] } onChangeText={ handleMessageChange } value={ message } />
                    </View>
                    <Button gradient onPress={ () => handleSubmit() }>
                        { submitLoading ? (<ActivityIndicator size="small" color="white" />) : (<Text bold white center>SEND</Text>) }
                    </Button>
                    <TouchableOpacity onPress={ () => handleShowModal() }>
                        <Text body center style={ styles.tosStyle }>Terms and Services</Text>
                    </TouchableOpacity>

                    <Modal animationType="fade" visible={ showModal } transparent={ true } onRequestClose={ handleModalClose } >
                        <View style={ styles.modalContainerStyle }>
                            <View style={ styles.modalBodyStyle }>
                                <View style={ styles.modalTitleStyle }>
                                    <Text h1 center>Terms and Services</Text>
                                    <TouchableOpacity onPress={ handleModalClose }>
                                        <Text h3 right>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={ styles.modalContentStyle }>
                                    <ScrollView showsVerticalScrollIndicator={ true } indicatorStyle="black" style={ styles.contentScrollViewStyle }>
                                        <Text title style={ styles.tosContentStyle }>
                                            1. By submitting your information through the contact form on this
                                            page, you agree to allow us to use your information to respond to
                                            your inquiry and to keep a record of your inquiry for our internal
                                            records.
                                        </Text>
                                        <Text title style={ styles.tosContentStyle }>
                                            2. We will do our best to respond to your inquiry in a timely and
                                            professional manner, but we cannot guarantee that we will be able
                                            to respond to every inquiry we receive.
                                        </Text>
                                        <Text title style={ styles.tosContentStyle }>
                                            3. We may use third-party services to help us manage and respond to
                                            inquiries, and by submitting your information through this form,
                                            you acknowledge and agree to the use of such third-party services.
                                        </Text>
                                        <Text title style={ styles.tosContentStyle }>
                                            4. We may use your contact information to send you marketing or
                                            promotional materials, but you can opt out of such communications
                                            at any time by following the unsubscribe instructions included in
                                            each communication.
                                        </Text>
                                        <Text title style={ styles.tosContentStyle }>
                                            5. We reserve the right to modify these Terms of Service at any time,
                                            and by continuing to use this contact form after such
                                            modifications, you agree to be bound by the updated Terms of
                                            Service.
                                        </Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: colors.white,
        justifyContent: "stretch"
    },
    titleStyle: {
        color: colors.darkGray,
        marginBottom: 15,
    },
    bodyStyle: {
        marginBottom: 15,
    },
    formStyle: {
        backgroundColor: colors.lightGray,
        flexDirection: 'column',
        alignContent: 'stretch',
        flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: '100%',
        padding: 20,
    },
    inputStyle: {
        paddingHorizontal: 15,
        backgroundColor: colors.lightGray,
        borderColor: colors.gray,
        borderWidth: 2,
        height: 50,
        fontSize: sizes.h2,
        marginVertical: 0,
        paddingVertical: 0,
    },
    groupStyle: {
        marginBottom: 10,
    },
    tosStyle: {
        marginVertical: 10,
        color: colors.darkGray,
        textDecorationLine: 'underline',
        textDecorationColor: colors.black,
    },
    modalContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalBodyStyle: {
        backgroundColor: colors.white,
        height: windowHeight * 0.45,
        width: windowWidth * 0.85,
        padding: 20,
    },
    modalTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalContentStyle: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
    },
    contentScrollViewStyle: {
        backgroundColor: colors.white,
    },
    tosContentStyle: {
        marginBottom: 10,
    },
    hasErrors: {
        borderColor: colors.accent,
        borderWidth: 2,
    }
});