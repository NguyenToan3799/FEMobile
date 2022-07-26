import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import Submit from "../components/Submit";

const EditInfor = props => {
    const [sex, setSex] = useState({
        male: false,
        female: false,
    })

    return (
        <SafeAreaView >
            <ScrollView >
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
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Edit Staff Information </Text>
                    </View>

                </View>
                <View style={[styles.container, { backgroundColor: '#FFF8DC' }]}>
                    <View style={[styles.container]}>
                        <Image source={require('../assets/user1.png')}
                            style={{ marginTop: 20, height: 100, width: 100, borderRadius: 50 }} />
                    </View>

                    <View style={[styles.container, { height: 50, flexDirection: 'row', marginTop: 10 }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>FullName:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Phone: </Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Position:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>CMND:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Address:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 60, flexDirection: 'row' }]}>
                        <View style={{ width: '30%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Sex:</Text>
                        </View>
                        <View style={{ width: '30%', height: '100%' }}>
                            <CheckBox onPress={() => { setSex({ male: true }) }} title={"Nam"} checked={sex.male} />

                        </View>
                        <View style={{ width: '30%', height: '100%' }}>
                            <CheckBox onPress={() => { setSex({ female: true }) }} title={"Nữ"} checked={sex.female} />
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 15, fontFamily: 'Arial', fontSize: 15, width: 250 }}>Birthday:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 15, fontFamily: 'Arial', fontSize: 15, width: 250 }}>Email:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>
                    <View style={[styles.container, { height: 100, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 15, fontFamily: 'Arial', fontSize: 15, width: 250 }}>Descripton:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 100, borderRadius: 10, marginRight: 15, width: 250 }}>

                        </View>
                    </View>

                    <View style={[styles.container, { height: 80, flexDirection: 'row', marginTop: 10 }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <TouchableOpacity style={styles.buttonclick}
                                onPress={() => { props.navigation.push('Thongtinnv') }}
                                underlayColor='#fff'>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '27%', height: '100%' }}>
                            <TouchableOpacity style={styles.buttonclick}
                                onPress={() => { props.navigation.push('Thongtinnv') }}
                                underlayColor='#fff'>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    buttonclick: {
        width: 100,
        height: 50,
        borderRadius: 10,
        marginVertical: 10,

        backgroundColor: '#A1C639',

    },
    buttonText: {
        color: 'green',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 10,
        fontFamily: "Arial"
        
    }

});

export default EditInfor;