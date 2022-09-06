import React from "react";
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


const Nangluc = props => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.container, { backgroundColor: '#A1C639', height: 100, flexDirection: 'row' }]}>
                    <View style={{ width: '15%', height: '100%' }}>
                        <Icon style={{ marginTop: 35, marginLeft: 20 }}
                            name={'chevron-left'}
                            size={30}
                            color={'black'}
                            onPress={() => { props.navigation.push('Trangchu') }}
                        />
                    </View>
                    <View style={{ width: '85%', height: '100%' }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Capacity Assessment </Text>
                    </View>

                </View>
                <View style={[styles.container, { backgroundColor: '#D3D3D3', height: 100, borderWidth: 1, borderColor: 'red', borderRadius: 50, width: 200, alignSelf: 'center', marginTop: 10 }]}>
                    <Text style={{ color: 'black', fontFamily: 'Arial', fontSize: 20 }}> Total Score: </Text>
                </View>
                <View style={{ borderWidth: 2, borderColor: 'black', height: 400, marginTop: 10, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Becareful :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Honesty :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Enthusiasm :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Level of work :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Grow at work :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Progessive will :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Repesct :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <Text style={[styles.textdanhgia, { width: '70%' }]}>-Time manager :  </Text>
                        <Text style={[styles.textdanhgia, { width: '30%' }]}>8 </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={{ fontFamily: 'Arial', fontSize: 30 }}>Congratulations 👏🏻</Text>

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
    textdanhgia: {
        fontFamily: 'Arial',
        fontSize: 20,
        marginLeft: 5
    }

});

export default Nangluc;