import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getworkScheduleForNextWeek } from "../utils/Employee";
// import { getCheckInTime, getUserInfo, getUserSchedule } from "../utils/AsyncStorage";
import { useState } from 'react';
import Submit from '../components/Submit';
import { nextDate } from "../utils/Utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { saveCheckInTime, getCheckInTime, saveCheckOutTime, getCheckOutTime } from "../utils/AsyncStorage";

const createAlert = (title, message) =>
  Alert.alert(
    title,
    message,
    [
      // { text: "OK", onPress: () => props.navigation.push('Trangchu') }
      { text: "OK" }
    ]
  );

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('-');
};

function diff_hours(dt2, dt1) {

  var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);

}

const generateIdByNum = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

const Xemlich = props => {
  // let [workSchedule, setworkSchedule] = useState(['-', '-', '-', '-', '-', '-', '-',]);
  let workSchedule = props.route.params["updatedSchedule"];
  const [isEnableCheckin, setEnableCheckin] = useState(true);
  const [isEnableCheckout, setEnableCheckout] = useState(true);
  // console.log(props.route.params["updatedSchedule"]);
  // console.log('++++++++++++++++++');
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

  // getUserSchedule().then(schedule => setworkSchedule(schedule)).catch(error => console.log(error));
  // getworkScheduleForNextWeek(userId).then(data => updateworkSchedule(data))

  let nextMonday = nextDate(1);
  let sub = require('date-fns/sub');
  nextMonday = sub(nextMonday, { days: 7 });
  const nextMondayString = `${nextMonday.getDate()}/${nextMonday.getMonth() + 1}`;
  let add = require('date-fns/add');
  const nextSunday = add(nextMonday, { days: 6 })
  nextSunday.setHours(23, 59, 59, 0);

  const nextSundayString = `${nextSunday.getDate()}/${nextSunday.getMonth() + 1}`;

  // let checkInTime = '';
  let [checkInTime, setCheckInTime] = useState('');

  let currentDateTime = new Date();
  let startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  let endDate = new Date();
  endDate.setHours(23, 59, 59, 0);

  let startShift1 = new Date();
  startShift1.setHours(5, 40, 0, 0);
  let startShift2 = new Date();
  startShift2.setHours(9, 40, 0, 0);
  let startShift3 = new Date();
  startShift3.setHours(13, 40, 0, 0);

  let endShift1 = new Date();
  endShift1.setHours(11, 0, 0, 0);
  let endShift2 = new Date();
  endShift2.setHours(15, 0, 0, 0);
  let endShift3 = new Date();
  endShift3.setHours(19, 0, 0, 0);

  let isCheckinShift1 = currentDateTime >= startShift1 && currentDateTime <= startShift2;
  let isCheckinShift2 = currentDateTime >= startShift2 && currentDateTime <= startShift3;
  let isCheckinShift3 = currentDateTime >= startShift3 && currentDateTime <= endShift3;

  let isCheckoutShift1 = currentDateTime >= startShift2 && currentDateTime <= endShift1;
  let isCheckoutShift2 = currentDateTime >= startShift3 && currentDateTime <= endShift2;
  let isCheckoutShift3 = currentDateTime >= startShift3 && currentDateTime <= endShift3;


  getCheckInTime().then(time => time != null ? setCheckInTime(time) : null).catch(error => console.log(error));

  const checkIn = async (index) => {
    let time = new Date();
    // workSchedule[index]["timeIn"] = time.yyyymmdd();
    await saveCheckInTime(time.toString());
    createAlert("Notification", "You have checked in successfully!");
    // setEnableCheckin(false);
    setCheckInTime(time.toString());
  }

  const checkOut = async (index) => {
    // workSchedule[index]["timeOut"] = new Date().yyyymmdd();
    let temp = workSchedule[index];
    checkInTime = await getCheckInTime();
    let checkOutTime = new Date().toString();
    let requestBody = {
      "timeIn": checkInTime,
      "timeOut": checkOutTime,
      "totalWorkingHour": Math.round(diff_hours(checkOutTime, checkInTime) * 100) / 100,
      "userID": temp["user"]["userID"],
      "workScheduleID": temp["workScheduleID"],
      "workingHourID": generateIdByNum(7),
      "workingHourStatus": true
    }

    console.log(requestBody);

    const response = await fetch("http://api.ngocsonak.xyz:8181/api/workinghour/create", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response);

    saveCheckInTime('');

    createAlert("Notification", "You have checked out successfully!");
    setEnableCheckout(false);
  }

  const totalShift = (shiftData) => {
    let count = 0;
    if (shiftData['shift1']) {
      count += 1;
    }
    if (shiftData['shift2']) {
      count += 1;
    }
    if (shiftData['shift3']) {
      count += 1;
    }
    return count;
  }

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

          </View>
          <View style={{ width: '60%', height: '100%' }}>
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }}>Week</Text>
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 70 }}>{nextMondayString} - {nextSundayString}</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>

          </View>
        </View>

        {/* Monday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Monday: </Text>
          </View>
          {
            workSchedule[0] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[0] != null && workSchedule[0]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[0] != null && workSchedule[0]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[0] != null && workSchedule[0]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[0] != null && totalShift(workSchedule[0]) == 2 && new Date(workSchedule[0]['date']) >= startDate && new Date(workSchedule[0]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[0] != null && totalShift(workSchedule[0]) == 1 ?
              <View>
                {workSchedule[0]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[0]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[0] != null && totalShift(workSchedule[0]) == 1 ?
              <View>
                {workSchedule[0]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[0]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[0] != null && totalShift(workSchedule[0]) == 1 ?
              <View>
                {workSchedule[0]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[0]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Tuesday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Tuesday: </Text>
          </View>
          {
            workSchedule[1] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[1] != null && workSchedule[1]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[1] != null && workSchedule[1]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[1] != null && workSchedule[1]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[1] != null && totalShift(workSchedule[1]) == 2 && new Date(workSchedule[1]['date']) >= startDate && new Date(workSchedule[1]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[1] != null && totalShift(workSchedule[1]) == 1 ?
              <View>
                {workSchedule[1]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[1]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[1] != null && totalShift(workSchedule[1]) == 1 ?
              <View>
                {workSchedule[1]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[1]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[1] != null && totalShift(workSchedule[1]) == 1 ?
              <View>
                {workSchedule[1]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[1]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Wednesday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Wednesday: </Text>
          </View>
          {
            workSchedule[2] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[2] != null && workSchedule[2]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[2] != null && workSchedule[2]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[2] != null && workSchedule[2]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[2] != null && totalShift(workSchedule[2]) == 2 && new Date(workSchedule[2]['date']) >= startDate && new Date(workSchedule[2]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[2] != null && totalShift(workSchedule[2]) == 1 ?
              <View>
                {workSchedule[2]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[2]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[2] != null && totalShift(workSchedule[2]) == 1 ?
              <View>
                {workSchedule[2]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[2]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[2] != null && totalShift(workSchedule[2]) == 1 ?
              <View>
                {workSchedule[2]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[2]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Thursday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Thursday: </Text>
          </View>
          {
            workSchedule[3] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[3] != null && workSchedule[3]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[3] != null && workSchedule[3]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[3] != null && workSchedule[3]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[3] != null && totalShift(workSchedule[3]) == 2 && new Date(workSchedule[3]['date']) >= startDate && new Date(workSchedule[3]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[3] != null && totalShift(workSchedule[3]) == 1 ?
              <View>
                {workSchedule[3]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[3]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[3] != null && totalShift(workSchedule[3]) == 1 ?
              <View>
                {workSchedule[3]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[3]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[3] != null && totalShift(workSchedule[3]) == 1 ?
              <View>
                {workSchedule[3]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[3]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Friday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Friday: </Text>
          </View>
          {
            workSchedule[4] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[4] != null && workSchedule[4]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[4] != null && workSchedule[4]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[4] != null && workSchedule[4]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[4] != null && totalShift(workSchedule[4]) == 2 && new Date(workSchedule[4]['date']) >= startDate && new Date(workSchedule[4]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[4] != null && totalShift(workSchedule[4]) == 1 ?
              <View>
                {workSchedule[4]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[4]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[4] != null && totalShift(workSchedule[4]) == 1 ?
              <View>
                {workSchedule[4]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[4]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[4] != null && totalShift(workSchedule[4]) == 1 ?
              <View>
                {workSchedule[4]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[4]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Saturday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Saturday: </Text>
          </View>
          {
            workSchedule[5] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[5] != null && workSchedule[5]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[5] != null && workSchedule[5]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[5] != null && workSchedule[5]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[5] != null && totalShift(workSchedule[5]) == 2 && new Date(workSchedule[5]['date']) >= startDate && new Date(workSchedule[5]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[5] != null && totalShift(workSchedule[5]) == 1 ?
              <View>
                {workSchedule[5]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[5]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[5] != null && totalShift(workSchedule[5]) == 1 ?
              <View>
                {workSchedule[5]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[5]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[5] != null && totalShift(workSchedule[5]) == 1 ?
              <View>
                {workSchedule[5]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[5]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
          </View>
        </View>

        {/* Sunday */}
        <View style={[styles.viewlich, { marginTop: 10, flexDirection: 'row' }]}>
          <View style={{ width: '30%', height: '100%' }}>
            <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20 }}> Sunday: </Text>
          </View>
          {
            workSchedule[6] == null ? <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>OFF</Text>
            </View> : null
          }
          {workSchedule[6] != null && workSchedule[6]['shift1'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 1</Text>

            </View> : null}
          {workSchedule[6] != null && workSchedule[6]['shift2'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 2</Text>

            </View> : null}
          {workSchedule[6] != null && workSchedule[6]['shift3'] ?
            <View style={{ width: '20%', height: '100%' }}>
              <Text style={{ fontFamily: 'Arial', marginTop: 25, textAlign: 'center', fontSize: 20, color: "#009900" }}>Shift 3</Text>
            </View> : null}
          <View style={{ width: '30%', height: '100%' }}>
            {workSchedule[6] != null && totalShift(workSchedule[6]) == 2 && new Date(workSchedule[6]['date']) >= startDate && new Date(workSchedule[6]['date']) <= endDate ?
              <View>
                <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                  onPress={() => { checkIn(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                  onPress={() => { checkOut(0) }}
                  underlayColor='#fff'>
                  <Text style={styles.checkText}>Checkout</Text>
                </TouchableOpacity>
              </View>

              : null
            }
            {workSchedule[6] != null && totalShift(workSchedule[6]) == 1 ?
              <View>
                {workSchedule[6]['shift1'] && isCheckinShift1 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[6]['shift1'] && isCheckoutShift1 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[6] != null && totalShift(workSchedule[6]) == 1 ?
              <View>
                {workSchedule[6]['shift2'] && isCheckinShift2 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[6]['shift2'] && isCheckoutShift2 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>

              : null
            }
            {workSchedule[6] != null && totalShift(workSchedule[6]) == 1 ?
              <View>
                {workSchedule[6]['shift3'] && isCheckinShift3 ?
                  <TouchableOpacity style={styles.checkButton} disabled={checkInTime.length > 0}
                    onPress={() => { checkIn(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkin</Text>
                  </TouchableOpacity>
                  : null}
                {workSchedule[6]['shift3'] && isCheckoutShift3 ?
                  <TouchableOpacity style={[styles.checkButton, { marginVertical: 10 }]} disabled={!checkInTime > 0}
                    onPress={() => { checkOut(0) }}
                    underlayColor='#fff'>
                    <Text style={styles.checkText}>Checkout</Text>
                  </TouchableOpacity>
                  : null}
              </View>
              : null}
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
    // height: 70,
    borderRadius: 20


  },
  checkButton: {
    width: 80,
    height: 25,
    marginTop: 10,
    paddingBottom: 10,
    backgroundColor: 'red',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 10
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