import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRegistrationScheduleForNextWeek } from "../utils/Employee";
import { getUserInfo, getUserSchedule } from "../utils/AsyncStorage";
import { useState } from 'react';
import Submit from '../components/Submit';
import { nextDate } from "../utils/Utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const Xemlich = props => {
  let [registrationSchedule, setRegistrationSchedule] = useState(['-', '-', '-', '-', '-', '-', '-',]);

//   const [userInfo, setUserInfo] = useState({
//     "address": "Sky 9 Lien Phuong",
//     "dayOfBirth": "03/07/1999",
//     "email": "toan@fpt.edu.vn",
//     "fullName": "Toan",
//     "password": "123",
//     "phoneNumber": "1234123123",
//     "role": {
//         "id": "3",
//         "name": "EMPLOYEE_FULLTIME"
//     },
//     "sex": "Nam",
//     "status": true,
//     "store": {
//         "address": "51 Do Xuan Hop",
//         "storeID": "dxh",
//         "storeName": "Do Xuan Hop"
//     },
//     "userID": "toan",
//     "userName": "Song Toan"
// });

//   getUserInfo().then(info => info != null ? setUserInfo(info) : props.navigation.push('Home')).catch(error => console.log(error));

//   const roleName = userInfo.role.name;
//   const userId = userInfo.userID;

  getUserSchedule().then(schedule => setRegistrationSchedule(schedule)).catch(error => console.log(error));
  // getRegistrationScheduleForNextWeek(userId).then(data => updateRegistrationSchedule(data))

  
  


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container, { backgroundColor: '#A1C639', height: 100, flexDirection: 'row' }]}>
          <View style={{ width: '20%', height: '100%' }}>
            <Icon style={{ marginTop: 35, marginLeft: 20 }}
              name={'chevron-left'}
              size={30}
              color={'black'}
              onPress={() => {  props.navigation.push('Trangchu') }}
            />
          </View>
          <View style={{ width: '80%', height: '100%' }}>
            <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>View Schedule </Text>
          </View>

        </View>
        <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
          <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Details work schedule </Text>
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
        
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Monday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[0]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Tuesday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[1]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 1, fontSize: 20 }}> Wednesday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[2]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thursday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[3]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Friday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[4]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Saturday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[5]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Sunday: </Text>
          </View>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 10, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[6]}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkin</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
          <TouchableOpacity style={styles.checkButton}
              onPress={() => { props.navigation.push('Trangchu') }}
              underlayColor='#fff'>
              <Text style={styles.checkText}>Checkout</Text>
            </TouchableOpacity>
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
  viewlich: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 70,
    borderRadius: 20


  },
  checkButton: {
    width: 80,
    height: 25,
    marginTop: 20,
    paddingBottom: 10,
    backgroundColor: 'red',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#fff'
  },
  checkText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  }
});

export default Xemlich;