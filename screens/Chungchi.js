import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, FlatList } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';



const Chungchi = props => {

    let userCertificates = props.route.params["certificates"];
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
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Certificate </Text>
                    </View>

                </View>
                <View style={[styles.container, { backgroundColor: 'black', height: 70 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 20 }}> Certificates available </Text>
                </View>


                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20, textDecorationLine: 'underline', fontFamily: 'Arial', color: "red" }}>Passio's certificate</Text>
                </View>
                <View style={[styles.viewgchungchi]}>
                    {userCertificates.map((certificate) => {
                        return (<View style={{ flexDirection: 'row', marginTop: 7 }}>
                            <Text style={[styles.textchungchi, { width: '70%' }]}>- {certificate.certificateName}</Text>
                            <Text style={[styles.textchungchi, { width: '30%' }]}>{certificate.date}</Text>
                        </View>);
                    })}
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
    viewgchungchi: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 500,
        marginTop: 10


    },
    textchungchi: {
        fontFamily: 'Arial',
        fontSize: 20
    }
});

export default Chungchi;