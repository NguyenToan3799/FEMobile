import * as React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Thuong from "./Thuong";
import Phat from "./Phat";
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const Thuongphat = props => {
    return (
        
        <Tab.Navigator>
            <Tab.Screen name="Reward" component={Thuong} options={{ headerShown: false , tabBarIcon: () => <Text style={{fontSize: 30}}>🏆</Text>}}/>
            <Tab.Screen name="Penalty" component={Phat} options={{ headerShown: false, tabBarIcon: () => <Text style={{fontSize: 30}}>😭</Text> }}/>
        </Tab.Navigator>
        
    )
};

export default Thuongphat;