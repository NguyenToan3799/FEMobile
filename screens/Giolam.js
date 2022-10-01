import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from '../components/Submit';

const Giolam = props => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.container, { backgroundColor: '#A1C639', height: 100, flexDirection: 'row' }]}>
                    <View style={{ width: '20%', height: '100%' }}>
                        <Icon style={{ marginTop: 35, marginLeft: 20 }}
                            name={'chevron-left'}
                            size={30}
                            color={'black'}
                            onPress={() => { props.navigation.push('Trangchu') }}
                        />
                    </View>
                    <View style={{ width: '80%', height: '100%' }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 30, fontFamily: 'Arial' }}>Check Working Hours </Text>
                    </View>

                </View>
                <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Details working hours </Text>
                </View>
                <View style={[styles.container, { backgroundColor: '#C0C0C0', height: 80, flexDirection: 'row' }]}>
                    <View style={{ width: '20%', height: '100%' }}>
                        
                    </View>
                    <View style={{ width: '60%', height: '100%' }}>
                        <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }}> Week</Text>
                        <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 70 }}> 23/5-29/5</Text>
                    </View>
                    <View style={{ width: '20%', height: '100%' }}>
                        
                    </View>
                </View>

                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Monday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Tuesday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Wednesday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Thursday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Friday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Saturday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.viewgio, { marginTop: 10, flexDirection: 'row' }]}>
                    <View style={{ width: '30%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Sunday : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%' }}>
                        <Text style={{ fontFamily: 'Arial', marginTop: 22, fontSize: 20, color: "blue", textAlign: "center" }}> 6 tiếng </Text>
                    </View>
                </View>
                <View style={[styles.container, { backgroundColor: '#3366CC', height: 100, borderWidth: 1, borderColor: 'red', borderRadius: 50, width: '100%', alignSelf: 'center', marginTop: 10 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Total Time In Month: 64</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textThu: {
        fontSize: 15,
        marginLeft: 8,
        fontFamily: 'Arial'
    },
    Textngay: {
        fontSize: 15,
        marginLeft: 14,
        fontFamily: 'Arial'
    },
    viewgio: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 70


    }
});

export default Giolam;