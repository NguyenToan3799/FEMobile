import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, StatusBar, Alert } from 'react-native';
// import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserInfo } from '../utils/AsyncStorage';

import Inputs from '../components/Inputs';
import Submit from '../components/Submit';
import { color } from "react-native-reanimated";

const createAlert = (title, message) =>
    Alert.alert(
        title,
        message,
        [
            // { text: "OK", onPress: () => props.navigation.push('Trangchu') }
            { text: "OK" }
        ]
    );

const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isEnableButton, setEnableButton] = useState(false);
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

    const getUsername = async (value) => {
        setUsername(value);
        checkEnableButton();
    }

    const getPassword = (value) => {
        setPassword(value);
        checkEnableButton();
    }

    const checkEnableButton = () => {
        if ([null, undefined, ''].includes(username) || [null, undefined, ''].includes(password)) { setEnableButton(false) }
        else { setEnableButton(true); }
    }

    const checkLoginInfo = async () => {


        fetch(`http://api.ngocsonak.xyz:8181/api/user/login?password=${password}&userID=${username}`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
            }
        })
            .then(response => response.json())
            .then(result => {
                setIsErrorMessageVisible(false);
                saveUserInfo(result).then(() => props.navigation.push('Trangchu'));
            })
            .catch(error => setIsErrorMessageVisible(true));

    }

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView behavior="padding" style={styles.safe}>
                <ScrollView style={{ backgroundColor: '#A1C639' }}>


                    <View style={styles.container}>
                        <Image
                            source={require('../assets/passio.png')}
                            style={styles.image} />
                        <Text style={styles.textTitle}>Passio Employee</Text>

                        <Image
                            source={require('../assets/user1.png')}
                            style={styles.image1}
                        />

                        <View style={{ marginTop: 20 }} />

                        <Inputs name="UserName" icon="user" callback={getUsername} />
                        <Inputs name="Password" icon="lock" pass={true} callback={getPassword} />
                        {
                            isErrorMessageVisible ? <Text style={styles.errorMessage}>Wrong username or password</Text> : null
                        }


                        <View style={{ width: '90%' }}>
                            <Text style={styles.textForgot} onPress={() => createAlert("Notification", "Please contact your manager!")}
                            > Forgot Password?</Text>
                        </View>
                        <Submit title="LOG IN" color={isEnableButton == true ? "white" : "#C0C0C0"} enable={isEnableButton}
                            onPress={() => {
                                checkLoginInfo();
                            }} />



                        <Text style={styles.textBody}>Or connect us </Text>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#A1C639',


    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
        borderRadius: 100,
        height: 190,
        marginVertical: 50,
        shadowColor: '#171717',
        shadowOffset: { width: 0, peak: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    image1: {
        width: 150,
        borderRadius: 80,
        height: 150,
        marginVertical: 0
    },
    textTitle: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: 'white',
        marginVertical: 10,
    },
    textBody: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: 'white',
        marginVertical: 10,
    },
    textForgot: {
        fontFamily: 'Arial',
        fontSize: 17,
        color: '#CC3300',
        marginVertical: 10,
        alignSelf: 'flex-end'
    },
    errorMessage: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: 'red',
    }
});

export default Login