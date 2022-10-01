import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Modal, Pressable, Alert, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from '../components/Submit';
import moment from "moment";
import DatePicker from 'react-native-neat-date-picker';
import { Button } from "react-native-elements";
import { getUserInfo } from '../utils/AsyncStorage';

import { CheckBox } from 'react-native-elements'
import { getEmployeeCertificate } from "../utils/Employee";

const nextDate = (dayIndex) => {
  let today = new Date();
  today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
  return today;
}

const getListDayNextWeek = () => {
  let listDay = [];
  const nextMonday = nextDate(1);
  nextMonday.setHours(0, 0, 0);

  let add = require('date-fns/add');

  for (let i = 0; i < 8; i++) {
    let nextDay = add(nextMonday, { days: i });
    listDay.push(nextDay);
  }
  return listDay;
}

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('-');
};

const Dangkylich = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();

  const nextMonday = nextDate(1);
  const nextMondayString = `${nextMonday.getDate()}/${nextMonday.getMonth() + 1}`;
  let add = require('date-fns/add');
  const nextSunday = add(nextMonday, { days: 6 })
  nextSunday.setHours(23, 59, 59, 0);

  const shiftData = ["Shift 1", "Shift 2", "Shift 3"];

  const nextSundayString = `${nextSunday.getDate()}/${nextSunday.getMonth() + 1}`;

  let selectedShift = {};

  var temp = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  props.route.params["registrationData"].map((item, index) => {
    if (item != null) {
      if (item['shift1']) {
        temp[index][0] = true;
      }
      if (item['shift2']) {
        temp[index][1] = true;
      }
      if (item['shift3']) {
        temp[index][2] = true;
      }
    }
  });

  const [registrationSchedule, setRegistrationSchedule] = useState(temp);
  let listDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handlePressCheckbox = (item, index) => {
    temp = [...registrationSchedule];
    if (temp[item][index]) {
      temp[item][index] = false;
    } else {
      if (temp[item].filter((value) => value).length < 2) {
        temp[item][index] = true;
      }
    }
    setRegistrationSchedule(temp);
  }







  // setRegistrationSchedule(temp);

  const countNullItem = (subjectNames) => {
    let count = 0
    subjectNames.forEach(subject => {
      if (subject == '' || subject == null) {
        count += 1;
      }
    }
    )
    return count;
  }



  const setSelectedShift = (dateDelta, shift) => {
    // let date = new Date();
    // date.setDate(nextMonday.getDate() + dateDelta);
    let nextMonday = nextDate(1);
    let add = require('date-fns/add');
    let date = add(nextMonday, { days: dateDelta }).yyyymmdd();  // nextDate(dateDelta + 1).yyyymmdd();
    selectedShift[date] = shift;
    console.log(selectedShift);
  }

  // util
  const createAlert = (title, message, route) =>
    Alert.alert(
      title,
      message,
      [
        // { text: "OK", onPress: () => props.navigation.push('Trangchu') }
        { text: "OK", onPress: () => props.navigation.push(route) }
      ]
    );

  // util
  const generateIdByNum = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const submitRegistrationData = async () => {
    let userInfo = await getUserInfo();
    let userId = userInfo.userID;

    let listDay = getListDayNextWeek();
    let oldData = props.route.params["registrationData"];

    for (let i = 0; i < 7; i++) {
      if (oldData[i] == null && registrationSchedule[i].filter((value) => value).length == 0) {

      } else {
        let registrationScheduleID = oldData[i] == null? generateIdByNum(7) : oldData[i]["registrationScheduleID"]
        let requestBody = {
          "allday": false,
          "date": listDay[i].yyyymmdd(),
          "registrationScheduleID": registrationScheduleID,
          "shift1": registrationSchedule[i][0],
          "shift2": registrationSchedule[i][1],
          "shift3": registrationSchedule[i][2],
          "userID": userId
        };
        let method = oldData[i] == null ? "POST" : "PUT";
        console.log(requestBody);
        console.log(method);
        const response = await fetch("http://api.ngocsonak.xyz:8181/api/registrationschedule/create", {
          method: method,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
        });
        console.log(response);
      }

    }

    createAlert("Notification", "Registration schedule is updated!", "Trangchu");

    // for (let date in selectedShift) {
    //   // util
    //   let shiftId = generateIdByNum(7);
    //   console.log(shiftId);


    //   let requestBody = {
    //     "allday": false,
    //     "date": date,
    //     "registrationScheduleID": shiftId,
    //     "shift1": selectedShift[date] == 1,
    //     "shift2": selectedShift[date] == 2,
    //     "shift3": selectedShift[date] == 3,
    //     "userID": userId
    //   };

    //   console.log(requestBody);

    //   const response = await fetch("http://api.ngocsonak.xyz:8181/api/registrationschedule/create", {
    //     method: 'POST',
    //     headers: {
    //       'Accept': '*/*',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(requestBody),
    //   });
    // }

    // createAlert("Notification", "You have successfully registered schedule for next week!", "Trangchu");
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
              <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Sign Up </Text>
            </View>

          </View>
          <View>
          </View>
          <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
            <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Details work schedule </Text>
          </View>
          <View style={[styles.container, { backgroundColor: '#C0C0C0', height: 80, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>

            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }}> Week</Text>
              {/* <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, textAlign: 'center' }} onPress={openDatePicker} > {date?.startDateString}-{date?.endDateString}</Text> */}
              <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, textAlign: 'center' }}>{nextMondayString} - {nextSundayString}</Text>
            </View>
            <View style={{ width: '20%', height: '100%' }}>

            </View>
          </View>

          {registrationSchedule.map((item, index) => (
            <View style={[styles.viewsigup, { borderWidth: 2, height: 120 }]} key={index}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>{listDay[index]}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {/* <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}> */}
                <View ><CheckBox
                  title='Shift 1'
                  checked={item[0]}
                  onPress={() => handlePressCheckbox(index, 0)}
                /></View>

                <CheckBox
                  title='Shift 2'
                  checked={item[1]}
                  onPress={() => handlePressCheckbox(index, 1)}
                />
                <CheckBox
                  title='Shift 3'
                  checked={item[2]}
                  onPress={() => handlePressCheckbox(index, 2)}
                />
                {/* </View> */}
              </View>
            </View>
          ))}


          {/* <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Monday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(0, index + 1);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {

                    return selectedItem
                  }}
                  rowTextForSelection={(item) => {

                    return item
                  }}
                />
              </View>
            </View>
          </View> */}
          {/* <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Tuesday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(1, index + 1);
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Wednesday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(2, index + 1);
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thursday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(3, index + 1);
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row', marginTop: 5 }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Friday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(4, index + 1);
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Saturday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(5, index + 1);
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
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 80, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Sunday </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={shiftData}
                  onSelect={(selectedItem, index) => {
                    setSelectedShift(6, index + 1);
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
          </View> */}

          <View style={[styles.container, { marginTop: 10 }]}>
            <Button title="Confirm" color="#a1C639"
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "Do you confirm to register schedule?",
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
                        submitRegistrationData();
                        console.log(2);
                      },
                    },

                  ]
                );


                // 
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
              data={shiftData}
              onSelect={(selectedItem, index) => {
                setSelectedShift(0, index + 1);
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
    textAlign: 'center',
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
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});



export default Dangkylich;