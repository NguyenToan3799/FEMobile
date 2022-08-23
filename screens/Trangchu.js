import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Button } from "react-native-elements";
import { color } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { getUserInfo } from '../utils/AsyncStorage';


const Trangchu = (props) => {
    // const userInfo = props.userInfo;
    // const userInfo = await getUserInfo();
    const [userInfo, setUserInfo] = useState({
        "address": "Sky 9 Lien Phuong",
        "dayOfBirth": "03/07/1999",
        "email": "toan@fpt.edu.vn",
        "fullName": "Toan",
        "password": "123",
        "phoneNumber": "1234123123",
        "role": {
            "id": "3",
            "name": "EMPLOYEE_FULLTIME"
        },
        "sex": "Nam",
        "status": true,
        "store": {
            "address": "51 Do Xuan Hop",
            "storeID": "dxh",
            "storeName": "Do Xuan Hop"
        },
        "userID": "toan",
        "userName": "Song Toan"
    });

    getUserInfo().then(info => setUserInfo(info)).catch(error => console.log(error));

    const roleName = userInfo.role.name;
    const roleText = roleName === 'EMPLOYEE_FULLTIME' ? 'Nhân viên Fulltime' : 'Nhân viên Partime';
    return (
        <SafeAreaView >
            <ScrollView>

                <View style={[styles.container, { backgroundColor: '#A1C639', height: 90, flexDirection: 'row' }]}>
                    <View style={{ width: '20%', height: '100%' }}><Image
                        source={require('../assets/user1.png')}
                        style={styles.image1}
                    /></View>
                    <View style={{ width: '60%', height: '100%' }}>
                        <Text style={[styles.textName, { marginVertical: 10, }]}>{userInfo.fullName}</Text>
                        <Text style={[styles.textName, { /*textDecorationLine: 'underline'*/ }]}>{roleText}</Text>
                    </View>
                    <View style={{ width: '20%', height: '100%' }}>
                        <Text style={{ color: '#696969', marginTop: 15, textAlign: 'center', fontSize: 20 }}
                            onPress={() => { props.navigation.push('Home'); console.log(userInfo.fullName) }}  >Logout</Text>
                        <Icon style={{ textAlign: 'center', margin: 10 }}
                            name={'bell-o'}
                            size={30}
                            color={'black'}

                        />
                    </View>



                </View>
                <View style={styles.container} >
                    <Image
                        source={require('../assets/passio.png')}
                        style={styles.image} />
                </View>
                <View style={[styles.container1, { height: 200, flexDirection: 'row' }]}>
                    <View style={{ width: '50%', height: '100%' }}  >
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'calendar'}
                                size={100}
                                color={'#40E0D0'}
                                onPress={() => { props.navigation.push('Xemlich') }}

                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Xemlich') }}>View Schedule</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'clock-o'}
                                size={100}
                                color={'#4169E1'}
                                onPress={() => { props.navigation.push('Giolam') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Giolam') }}>Check Working Hours</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.container1, { height: 200, flexDirection: 'row' }]}>
                    <View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'certificate'}
                                size={100}
                                color={'#00FA9A'}
                                onPress={() => { props.navigation.push('Chungchi') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Chungchi') }}>View Certificate </Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'list'}
                                size={100}
                                color={'#7FFFD4'}
                                onPress={() => { props.navigation.push('Nangluc') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Nangluc') }}>View danh gia</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container1, { height: 200, flexDirection: 'row' }]}>
                    <View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'trophy'}
                                size={100}
                                color={'#FFD700'}
                                onPress={() => { props.navigation.push('Thuongphat') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Thuongphat') }}>Rewards/Penalty</Text>
                        </View>
                    </View>
                    <View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'vcard'}
                                size={100}
                                color={'#FFDEAD'}
                                onPress={() => { props.navigation.push('Thongtinnv') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Thongtinnv') }}>Staff information</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container1, { height: 200, flexDirection: 'row' }]}>
                    {roleName === "EMPLOYEE_PARTIME" ? (<View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'calendar-check-o'}
                                size={100}
                                color={'#FF4500'}
                                onPress={() => { props.navigation.push('Dangkylich') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('Dangkylich') }}>Sign Up </Text>
                        </View>
                    </View>) : null}
                    {roleName == "EMPLOYEE_FULLTIME" ? (<View style={{ width: '50%', height: '100%' }}>
                        <View style={{ backgroundColor: '#F0FFF0', height: 180, width: 170, marginVertical: 10, marginLeft: 20, borderRadius: 30 }}>
                            <Icon style={{ textAlign: 'center', margin: 15 }}
                                name={'calendar-times-o'}
                                size={100}
                                color={'black'}
                                onPress={() => { props.navigation.push('OffDay') }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Arial' }} onPress={() => { props.navigation.push('OffDay') }}>Regist Off Day</Text>
                        </View>
                    </View>) : null}
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
        shadowColor: '#171717',
        shadowOffset: { width: 0, peak: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: 150,
        borderRadius: 300,
        height: 150,
        marginVertical: 20,

    },
    image1: {
        width: 60,
        borderRadius: 80,
        height: 60,
        marginVertical: 10
    },
    textName: {
        color: 'white',
        fontFamily: 'Arial',
        fontSize: 20


    }


});

export default Trangchu;