import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO_KEY = 'user_info';

const saveUserInfo = async (data) => {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
}

const getUserInfo = async () => {
    const user_info_data = await AsyncStorage.getItem(USER_INFO_KEY);
    return JSON.parse(user_info_data);
}

export{saveUserInfo, getUserInfo};