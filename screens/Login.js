import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Inputs from '../components/Inputs';
import Submit from '../components/Submit';
const Login = props => {

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

                        <Inputs name="UserName" icon="user" />
                        <Inputs name="Password" icon="lock" pass={true} />

                        <View style={{ width: '90%' }}>
                            <Text style={styles.textForgot}
                            > Forgot Password?</Text>
                        </View>
                        <Submit title="LOG IN" color="white"
                            onPress={() => {
                                props.navigation.push('Trangchu');
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