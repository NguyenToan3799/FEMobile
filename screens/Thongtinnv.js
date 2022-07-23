import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, DropDow } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from "../components/Submit";


const Thongtinnv = props => {
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
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Staff Information </Text>
                    </View>

                </View>
                <View style={[styles.container, {backgroundColor: '#FFF8DC'}]}>
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
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Sex:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>

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
                    
                    <View style={styles.container}>
                        <Submit title="Edit" color="#A1C639"
                            onPress={() => {
                                props.navigation.push('EditInfor');
                            }} />
                        
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
    }

});

export default Thongtinnv;