import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from '../components/Submit';

const Dangkylich = props => {
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
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 90 }}> Week</Text>
            <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20, marginTop: 10, marginLeft: 70 }}> 23/5-29/5</Text>
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
            <Text style={{fontFamily: 'Arial', marginTop: 20, marginLeft: 20, fontSize: 20}}> Thứ 2: </Text>
          </View>
          <View style={{ width: '70%', height: '100%' }}>
            <Text style={{fontFamily: 'Arial', marginTop: 20, marginLeft: 100, fontSize: 20, color: "#00FF00"}}> Ca 2</Text>
          </View>


        </View>
        <View style={[styles.viewlich]}>

        </View>
        <View style={[styles.viewlich]}>

        </View>
        <View style={[styles.viewlich]}>

        </View>
        <View style={[styles.viewlich]}>

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

export default Dangkylich;