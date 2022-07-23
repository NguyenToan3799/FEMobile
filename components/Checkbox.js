import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

const CheckBox = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.container, {backgroundColor: props.color}]} >
            <Text style={styles.submitText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: 50,
        borderColor: 'blue',
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 0,
    },
    submitText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
        alignSelf: 'center',
        marginVertical: 10
    }
});

export default CheckBox;