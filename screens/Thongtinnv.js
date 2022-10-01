import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
// import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import Submit from "../components/Submit";
import { getUserInfo, saveUserInfo } from "../utils/AsyncStorage";

const createAlert = (title, message) =>
    Alert.alert(
        title,
        message,
        [
            // { text: "OK", onPress: () => props.navigation.push('Trangchu') }
            { text: "OK" }
        ]
    );

const Thongtinnv = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [buttonText, setButtonText] = useState("Edit");
    const [open, setOpen] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [addressErrormessage, setAddressErrorMessage] = useState('');
    const [sexErrorMessage, setSexErrorMessage] = useState('');
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

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

    let [userInfoUpdate, setUserInfoUpdate] = useState(userInfo);

    getUserInfo().then((info) => {
        if (info != null) {
            setUserInfo(info);
        }
        else {
            props.navigation.push('Home')
        }
    }).catch(error => console.log(error));

    const roleName = userInfo.role.name;
    const roleText = roleName === 'EMPLOYEE_FULLTIME' ? 'Nhân viên Fulltime' : 'Nhân viên Partime';
    const userId = userInfo.userID;

    const setPhoneNumber = (value) => {
        userInfoUpdate.phoneNumber = value;
        setUserInfoUpdate(userInfoUpdate);
    }

    const setAddress = (value) => {
        userInfoUpdate.address = value;
        setUserInfoUpdate(userInfoUpdate);
    }

    const setSex = (value) => {
        userInfoUpdate.sex = value;
        setUserInfoUpdate(userInfoUpdate);
    }

    const setBirthday = (value) => {
        userInfoUpdate.dayOfBirth = value;
        setUserInfoUpdate(userInfoUpdate);
    }

    const setEmail = (value) => {
        userInfoUpdate.email = value;
        setUserInfoUpdate(userInfoUpdate);
    }

    const validateUpdateInfo = async () => {
        let check = true;
        if (userInfoUpdate.phoneNumber.length == 0) {
            setPhoneErrorMessage('Please fill in phone number');
            check = false;
        }
        if (userInfoUpdate.address.length == 0) {
            setAddressErrorMessage('Please fill in address');
            check = false;
        }
        if (userInfoUpdate.sex.length == 0) {
            setSexErrorMessage('Please fill in sex');
            check = false;
        }
        if (userInfoUpdate.dayOfBirth.length == 0) {
            setBirthdayErrorMessage('Please fill in birthday');
            check = false;
        }
        if (userInfoUpdate.email.length == 0) {
            setEmailErrorMessage('Please fill in email');
            check = false;
        }
        if (check) {
            let requestBody = {
                "address": userInfoUpdate.address,
                "dayOfBirth": userInfoUpdate.dayOfBirth,
                "email": userInfoUpdate.email,
                "fullName": userInfoUpdate.fullName,
                "password": userInfoUpdate.password,
                "phoneNumber": userInfoUpdate.phoneNumber,
                "roleID": userInfoUpdate.role.id,
                "sex": userInfoUpdate.sex,
                "status": true,
                "storeID": userInfoUpdate.store.storeID,
                "userID": userInfoUpdate.userID,
                "userName": userInfoUpdate.userName
            };

            const response = await fetch("http://api.ngocsonak.xyz:8181/api/user", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
            });
            saveUserInfo(userInfoUpdate);
            await setUserInfo(userInfoUpdate);
            createAlert("Notification", "You have successfully update user information!");
            setIsEditing(false);
            setButtonText("Edit");
        }

    }

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
                            <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.fullName}</Text>
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Phone: </Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>
                            {!isEditing ?
                                <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.phoneNumber}</Text> :
                                <TextInput style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }} onChangeText={setPhoneNumber} defaultValue={userInfoUpdate.phoneNumber} />}
                            {
                                phoneErrorMessage.length > 0 && isEditing ? <Text style={styles.errorMessage}>{phoneErrorMessage}</Text> : null
                            }
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Address:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>
                            {!isEditing ?
                                <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.address}</Text> :
                                <TextInput style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }} onChangeText={setAddress} defaultValue={userInfoUpdate.address} />}
                            {
                                addressErrormessage.length > 0 && isEditing ? <Text style={styles.errorMessage}>{addressErrormessage}</Text> : null
                            }
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 20, fontFamily: 'Arial', fontSize: 15 }}>Sex:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>
                            {!isEditing ?
                                <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.sex}</Text> :
                                <TextInput style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }} onChangeText={setSex} defaultValue={userInfoUpdate.sex} />}
                            {
                                sexErrorMessage.length > 0 && isEditing ? <Text style={styles.errorMessage}>{sexErrorMessage}</Text> : null
                            }
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 15, fontFamily: 'Arial', fontSize: 15, width: 250 }}>Birthday:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>
                            {!isEditing ?
                                <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.dayOfBirth}</Text> :
                                <TextInput style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }} onChangeText={setBirthday} defaultValue={userInfoUpdate.dayOfBirth} />
                                // <TextInput defaultValue={userInfo.dayOfBirth}/>
                                // <DatePicker
                                //     // options={{
                                //     //     backgroundColor: '#090C08',
                                //     //     textHeaderColor: '#FFA25B',
                                //     //     textDefaultColor: '#F6E7C1',
                                //     //     selectedTextColor: '#fff',
                                //     //     mainColor: '#F4722B',
                                //     //     textSecondaryColor: '#D6C7A1',
                                //     //     borderColor: 'rgba(122, 146, 165, 0.1)',
                                //     // }}
                                //     selected={userInfo.dayOfBirth}
                                //     mode="calendar"
                                //     // minuteInterval={30}
                                //     // style={{ borderRadius: 10 }}
                                // />

                                // <DatePicker
                                //     modal
                                //     open={open}
                                //     date={new Date(userInfo.dayOfBirth)}
                                //     onConfirm={(date) => {
                                //         setOpen(false);
                                //         // setDate(date)
                                //     }}
                                //     onCancel={() => {
                                //         setOpen(false)
                                //     }}
                                // />
                                // <DatePicker date={date} onDateChange={date => console.log(date)} />
                            }
                            {
                                birthdayErrorMessage.length > 0 && isEditing ? <Text style={styles.errorMessage}>{birthdayErrorMessage}</Text> : null
                            }
                        </View>
                    </View>
                    <View style={[styles.container, { height: 50, flexDirection: 'row' }]}>
                        <View style={{ width: '27%', height: '100%' }}>
                            <Text style={{ marginTop: 17, marginHorizontal: 15, fontFamily: 'Arial', fontSize: 15, width: 250 }}>Email:</Text>
                        </View>
                        <View style={{ width: '73%', height: '100%', borderColor: 'black', borderWidth: 1, height: 30, borderRadius: 10, marginRight: 15, width: 250 }}>
                            {!isEditing ?
                                <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }}>{userInfo.email}</Text> :
                                <TextInput style={{ marginTop: 5, textAlign: 'center', fontFamily: 'Arial', fontSize: 15 }} onChangeText={setEmail} defaultValue={userInfoUpdate.email} />}
                            {
                                emailErrorMessage.length > 0 && isEditing ? <Text style={styles.errorMessage}>{emailErrorMessage}</Text> : null
                            }
                        </View>
                    </View>

                    <View style={styles.container}>
                        <Button title={buttonText} color="#A1C639"
                            onPress={() => {
                                if (buttonText == "Edit") {
                                    setUserInfoUpdate(userInfo);
                                    setIsEditing(true);
                                    setButtonText("Save");
                                }
                                else {
                                    Alert.alert(
                                        "Warning",
                                        "Do you want to update information?",
                                        [
                                            // The "No" button
                                            // Does nothing but dismiss the dialog when tapped
                                            {
                                                text: "No",
                                            },
                                            // The "Yes" button
                                            {
                                                text: "Yes",
                                                onPress: () => {
                                                    validateUpdateInfo();

                                                },
                                            },

                                        ]
                                    );
                                }
                            }} />
                        {isEditing ?
                            <Button title="Cancel" color="#A1C639"
                                onPress={() => {
                                    Alert.alert(
                                        "Warning",
                                        "Do you want to cancel update information?",
                                        [
                                            // The "No" button
                                            // Does nothing but dismiss the dialog when tapped
                                            {
                                                text: "No",
                                            },
                                            // The "Yes" button
                                            {
                                                text: "Yes",
                                                onPress: () => {
                                                    setIsEditing(false);
                                                    setButtonText("Edit");
                                                    setPhoneErrorMessage('');
                                                    setAddressErrorMessage('');
                                                    setSexErrorMessage('');
                                                    setBirthdayErrorMessage('');
                                                    setEmailErrorMessage('');
                                                },
                                            },

                                        ]
                                    );


                                    // 
                                }} /> : null}

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
    errorMessage: {
        fontFamily: 'Arial',
        fontSize: 14,
        color: 'red',
        marginTop:5,
        textAlign: 'center'
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

export default Thongtinnv;