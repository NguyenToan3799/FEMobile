import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Modal, Pressable, Alert, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from '../components/Submit';
import moment from "moment";
import DatePicker from 'react-native-neat-date-picker';





const Dangkylich = props => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();

  const openDatePicker = () => {
    setShowDatePicker(true)
  }
  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }
  const onConfirm = (output) => {
    const { startDate, startDateString, endDate, endDateString } = output
    console.log(startDate.getTime())
    console.log(startDateString)
    console.log(endDate.getTime())
    console.log(endDateString)
    setDate({
      startDateString,
      endDateString
    });
    setShowDatePicker(false);
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
            {/* <Button title={'open'} onPress={openDatePicker} /> */}
            <DatePicker
              dateStringFormat={'dd/MM'}
              isVisible={showDatePicker}
              mode={'range'}
              onCancel={onCancel}
              onConfirm={onConfirm}
            >

            </DatePicker>
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
              <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }} onPress={openDatePicker}> Week</Text>
              <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, textAlign: 'center' }} onPress={openDatePicker} > {date?.startDateString}-{date?.endDateString}</Text>
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
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 2 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    const a = {selectedItem: selectedItem, d: 'monday'}
                    console.log(a)
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
          </View>
          <View style={[styles.viewsigup, { borderWidth: 2, height: 70, flexDirection: 'row' }]}>
            <View style={{ width: '20%', height: '100%' }}>
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 3 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 4 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 5 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 6 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
              <View style={{ backgroundColor: '#A1C639', height: 50, width: 60, marginVertical: 10, marginLeft: 1, borderRadius: 10 }}>
                <Text style={[styles.textThu, { marginTop: 15 }]}>Thứ 7 </Text>
              </View>
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <View style={{ height: 35, width: 45, marginVertical: 10, marginLeft: 10, borderRadius: 10 }}>
                <SelectDropdown
                  defaultButtonText="Please select shift"
                  data={["Ca 1", "Ca 2", "Ca 3"]}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
          <View>
            <Text style={{ fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 5 }}>1.Please select the days you want to work to apply for work</Text>
            <Text style={{ fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 5 }}>2.You need to register at least 3 working days</Text>
            <Text style={{ fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 5 }}>3.You can choose next week to register working day </Text>
          </View>
          <View style={styles.container}>
            <Submit title="Confirm" color="#A1C639"
              onPress={() => {
                props.navigation.push('Trangchu');
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
                console.log(selectedItem, index)
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



export default Dangkylich;