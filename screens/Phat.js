import React from "react";
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


const Phat = props => {
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
                        <Text style={{ color: 'white', alignSelf: 'flex-end', marginTop: 30, fontSize: 35, fontFamily: 'Arial' }}>Penalty </Text>
                    </View>

                </View>
                
                <View style={[styles.container, { borderWidth: 2, borderColor: 'black', height: 400, marginTop: 10, backgroundColor: 'white' }]}>

                </View>
                <View style={styles.container}>
                    <Text style={{ fontFamily: 'Arial', fontSize: 30 }}>Don't be shy! Fighting 💪🏻</Text>

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

    }

});

export default Phat;