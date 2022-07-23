import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Trangchu from './screens/Trangchu';
import Dangkylich from './screens/Dangkylich';
import Xemlich from './screens/Xemlich';
import Giolam from './screens/Giolam';
import Chungchi from './screens/Chungchi';
import Thongtinnv from './screens/Thongtinnv';
import Thuongphat from './screens/Thuongphat';
import Thuong from './screens/Thuong';
import Phat from './screens/Phat';
import EditInfor from './screens/EditInfor';
import TotalTime from './screens/TotalTime';
import OffDay from './screens/OffDay';
import Nangluc from './screens/Nangluc';

const Stack = createStackNavigator();

const Navigation = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Trangchu" component={Trangchu} options={{ headerShown: false }} />
                <Stack.Screen name="Dangkylich" component={Dangkylich} options={{ headerShown: false}}/>
                <Stack.Screen name="Xemlich" component={Xemlich} options={{ headerShown: false}}/>
                <Stack.Screen name="Giolam" component={Giolam} options={{ headerShown: false}}/>
                <Stack.Screen name="Chungchi" component={Chungchi} options={{ headerShown: false}}/>
                <Stack.Screen name="Thongtinnv" component={Thongtinnv} options={{ headerShown: false}}/>
                <Stack.Screen name="Thuongphat" component={Thuongphat} options={{ headerShown: false}}/>
                <Stack.Screen name="EditInfor" component={EditInfor} options={{ headerShown: false}}/>
                <Stack.Screen name="TotalTime" component={TotalTime} options={{ headerShown: false}}/>
                <Stack.Screen name="OffDay" component={OffDay} options={{ headerShown: false}}/>
                <Stack.Screen name="Nangluc" component={Nangluc} options={{ headerShown: false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
