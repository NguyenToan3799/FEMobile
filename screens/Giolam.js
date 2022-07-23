import React from "react";
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

import Submit from '../components/Submit';

const Giolam = props => {
    return(
       <SafeAreaView>
          <ScrollView>
             <View style={[styles.container, {backgroundColor: '#A1C639', height: 100, flexDirection: 'row'}]}>
                <View style={{ width: '20%', height: '100%' }}>
                <Icon style={{marginTop : 35 , marginLeft: 20}}
                            name={'chevron-left'}
                            size={30}
                            color={'black'}
                            onPress={() =>{props.navigation.push('Trangchu')}}
                        />
                </View>
                <View style={{ width: '80%', height: '100%' }}>
                     <Text style={{color: 'white', alignSelf: 'flex-end' , marginTop: 30 , fontSize: 30, fontFamily: 'Arial'}}>Check Working Hours </Text>
                </View>
       
             </View>
             <View style={[styles.container,{backgroundColor: 'black', height: 70}]}>
                 <Text style={{color: 'white', fontFamily: 'Arial', fontSize: 20}}> Details working hours </Text>
             </View>
             <View style={[styles.container,{backgroundColor: '#C0C0C0', height: 80, flexDirection:'row'}]}>
                <View style={{ width: '20%', height: '100%' }}>
                  <Icon style={{marginTop : 25 , marginLeft: 20}}
                            name={'chevron-left'}
                            size={30}
                            color={'#1E90FF'}
                            
                        />
                </View>
                <View style={{ width: '60%', height: '100%' }}>
                  <Text style={{color:'black', fontFamily:'Arial', fontSize: 20, marginTop: 10, marginLeft: 90}}> Week</Text>
                  <Text style={{color:'black', fontFamily:'Arial', fontSize: 20, marginTop: 10, marginLeft: 70}}> 23/5-29/5</Text>
                </View>
                <View style={{ width: '20%', height: '100%' }}>
                   <Icon style={{marginTop : 25 , marginLeft: 20}}
                            name={'chevron-right'}
                            size={30}
                            color={'#1E90FF'}
                            
                        />
                </View>
             </View>
             <Button title="View Total Time In Month" onPress={() =>{props.navigation.push('TotalTime')}}/>
             <View style ={[styles.viewgio, {marginTop: 10}]}>

             </View>
             <View style ={[styles.viewgio]}>

             </View>
             <View style ={[styles.viewgio]}>

             </View>
             <View style ={[styles.viewgio]}>

             </View>
             <View style ={[styles.viewgio]}>

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
    textThu:{
        fontSize: 15, 
        marginLeft: 8, 
        fontFamily: 'Arial'
    },
    Textngay: {
        fontSize: 15, 
        marginLeft: 14, 
        fontFamily: 'Arial'
    },
    viewgio: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 70
        

    }
});

export default Giolam;