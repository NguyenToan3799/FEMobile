import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Inputs from '../components/Inputs';
import Submit from '../components/Submit';
const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const getUsername = (username) => {
        setUsername(username);
    }

    const getPassword = (password) => {
        setPassword(password);
    }

    const checkLoginInfo = async () => {
        let requestBody = {
            "userID": username,
            "password": password
        };
        console.log(1);
        // const response = await fetch(`http://api.ngocsonak.xyz:8181/api/user/login?password=${password}&userID=${username}`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': '*/*',
        //         // 'Content-Type': 'application/json'
        //     },
        // });

        fetch(`http://api.ngocsonak.xyz:8181/api/user/login?password=${password}&userID=${username}`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log('User in DB created');
                console.log(result.data``);
            })
            .catch(error => console.log('error', error));

        // console.log(response);
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

                        <View style={{ width: '90%' }}>
                            <Text style={styles.textForgot}
                            > Forgot Password?</Text>
                        </View>
                        <Submit title="LOG IN" color="white"
                            onPress={() => {
                                checkLoginInfo();
                                // props.navigation.push('Trangchu');
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
        fontSize: 12,
        color: 'grey',
        marginVertical: 10,
        alignSelf: 'flex-end'
    },
});

export default Login