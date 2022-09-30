import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Modal, Pressable, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import DateRangePicker from "react-native-daterange-picker";
import Submit from '../components/Submit';
import moment from "moment";
import { Button } from "react-native-elements";
import { getUserInfo } from "../utils/AsyncStorage";

const nextDate = (dayIndex) => {
  let today = new Date();
  today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
  return today;
}

const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('-');
};

const OffDay = props => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [selectedDate, setSelectedDate] = useState(undefined);

  const nextMonday = nextDate(1);
  const nextMondayString = `${nextMonday.getDate()}/${nextMonday.getMonth() + 1}`;
  let add = require('date-fns/add');
  const nextSunday = add(nextMonday, { days: 6 })
  nextSunday.setHours(23, 59, 59, 0);

  const nextSundayString = `${nextSunday.getDate()}/${nextSunday.getMonth() + 1}`;

  const setOffDay = (dateDelta) => {
    let offDay = nextDate(dateDelta + 1).yyyymmdd();
    setSelectedDate(offDay);
    console.log(selectedDate)
  }

  const createAlert = (title, message, route) =>
    Alert.alert(
      title,
      message,
      [
        // { text: "OK", onPress: () => props.navigation.push('Trangchu') }
        { text: "OK", onPress: () => props.navigation.push(route) }
      ]
    );

  const generateIdByNum = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const postRegistrationData = async () => {
    let userInfo = await getUserInfo();
    let userId = userInfo["userID"];

    // util
    let shiftId = generateIdByNum(7);
    console.log(shiftId);


    let requestBody = {
      "allday": true,
      "date": selectedDate,
      "registrationScheduleID": shiftId,
      "shift1": false,
      "shift2": false,
      "shift3": false,
      "userID": userId
    };

    console.log(requestBody);

    const response = await fetch("http://api.ngocsonak.xyz:8181/api/registrationschedule/create", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    createAlert("Notification", "You have successfully registered off day for next week!", "Trangchu");
  }

  return (

    <>
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
              <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Regist Day Off </Text>
            </View>

          </View>
          <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
            <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Choosen day off </Text>
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>

            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select day off"
                  data={["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]}
                  onSelect={(selectedItem, index) => {
                    setOffDay(index);
                    console.log(index)


                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {

                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {

                    return item
                  }}
                />
              </View>
            </View>
          </View>


          <View style={styles.container}>
            <Button disabled={selectedDate == undefined} title="Confirm" color="#A1C639"
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "You cannot register another day off after you submit. Do you wish to register day off?",
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
                        postRegistrationData();
                      },
                    },

                  ]
                );

              }} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SelectDropdown
              defaultButtonText="Vui lòng chọn ca"
              data={["Ca 1", "Ca 2", "Ca 3"]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Xác nhận</Text>
            </Pressable>
          </View>

        </View>
      </Modal>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  viewsigup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 20,
    borderColor: "grey"
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});



export default OffDay;