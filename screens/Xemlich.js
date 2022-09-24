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

const Xemlich = props => {
  // let [registrationSchedule, setRegistrationSchedule] = useState(['-', '-', '-', '-', '-', '-', '-',]);
  let registrationSchedule = props.route.params["updatedSchedule"];
  console.log(props.route.params);
  console.log('++++++++++++++++++'); 
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

  // getUserSchedule().then(schedule => setRegistrationSchedule(schedule)).catch(error => console.log(error));
  // getRegistrationScheduleForNextWeek(userId).then(data => updateRegistrationSchedule(data))

  const nextMonday = nextDate(1);
  const nextMondayString = `${nextMonday.getDate()}/${nextMonday.getMonth() + 1}`;
  let add = require('date-fns/add');
  const nextSunday = add(nextMonday, { days: 6 })
  nextSunday.setHours(23, 59, 59, 0);

  const nextSundayString = `${nextSunday.getDate()}/${nextSunday.getMonth() + 1}`;




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
            <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>View Schedule </Text>
          </View>

        </View>
        <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
          <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Details work schedule </Text>
        </View>
        <View style={[styles.container, { backgroundColor: '#C0C0C0', height: 80, flexDirection: 'row' }]}>
          <View style={{ width: '20%', height: '100%' }}>
            <Icon style={{ marginTop: 25, marginLeft: 20 }}
              name={'chevron-left'}
              size={30}
              color={'#1E90FF'}

            />
          </View>
          <View style={{ width: '60%', height: '100%' }}>
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }}>Week</Text>
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 70 }}>{nextMondayString} - {nextSundayString}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <Icon style={{ marginTop: 25, marginLeft: 20 }}
              name={'chevron-right'}
              size={30}
              color={'#1E90FF'}

            />
          </View>
        </View>
        <View style={[styles.container, { borderColor: 'black', borderWidth: 2, height: 70, flexDirection: 'row' }]}>
          <View style={{ width: '17%', height: '100%' }}>
            <View style={{ backgroundColor: '#A1C639', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>

              <Text style={styles.textThu}>Thứ </Text>
              <Text style={styles.Textngay}> 2</Text>
            </View>
          </View>
          <View style={{ width: '17%', height: '100%' }}>
            <View style={{ backgroundColor: '#DCDCDC', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
              <Text style={styles.textThu}>Thứ </Text>
              <Text style={{ fontSize: 15, marginLeft: 14 }}> 3</Text>
            </View>
          </View>
          <View style={{ width: '17%', height: '100%' }}>
            <View style={{ backgroundColor: '#DCDCDC', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
              <Text style={styles.textThu}>Thứ </Text>
              <Text style={styles.Textngay}> 4</Text>
            </View>
          </View>
          <View style={{ width: '17%', height: '100%' }}>
            <View style={{ backgroundColor: '#DCDCDC', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
              <Text style={styles.textThu}>Thứ </Text>
              <Text style={styles.Textngay}> 5</Text>
            </View>
          </View>
          <View style={{ width: '17%', height: '100%' }}>
            <View style={{ backgroundColor: '#DCDCDC', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
              <Text style={styles.textThu}>Thứ </Text>
              <Text style={styles.Textngay}> 6</Text>
            </View>
          </View>
          <View style={{ width: '15%', height: '100%' }}>
            <View style={{ backgroundColor: '#DCDCDC', height: 40, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
              <Text style={styles.textThu}>Thứ </Text>
              <Text style={styles.Textngay}> 7</Text>
            </View>
          </View>

        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 2: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[0]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 3: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[1]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 4: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[2]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 5: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[3]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 6: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[4]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Thứ 7: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[5]}</Text>
          </View>
        </View>
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20 }}> Chủ nhật: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00" }}>{registrationSchedule[6]}</Text>
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


  }
});

export default Xemlich;