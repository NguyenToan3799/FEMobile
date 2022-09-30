import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO_KEY = 'user_info';
const USER_SCHEDULE_KEY = 'user_schedule';
const CHECK_IN_TIME = 'check_in_time';
const CHECK_OUT_TIME = 'check_out_time';

const saveUserInfo = async (data) => {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
}

const getUserInfo = async () => {
    const user_info_data = await AsyncStorage.getItem(USER_INFO_KEY);
    return JSON.parse(user_info_data);
}

const saveUserSchedule = async (data) => {
    await AsyncStorage.setItem(USER_SCHEDULE_KEY, JSON.stringify(data));
}

const getUserSchedule = async () => {
    const user_info_data = await AsyncStorage.getItem(USER_SCHEDULE_KEY);
    return JSON.parse(user_info_data);
}

const saveCheckInTime = async (data) => {
    await AsyncStorage.setItem(CHECK_IN_TIME, JSON.stringify(data));
}

const getCheckInTime = async () => {
    const user_info_data = await AsyncStorage.getItem(CHECK_IN_TIME);
    return JSON.parse(user_info_data);
}

const saveCheckOutTime = async (data) => {
    await AsyncStorage.setItem(CHECK_OUT_TIME, JSON.stringify(data));
}

const getCheckOutTime = async () => {
    const user_info_data = await AsyncStorage.getItem(CHECK_OUT_TIME);
    return JSON.parse(user_info_data);
}


export{saveUserInfo, getUserInfo, saveUserSchedule, getUserSchedule, saveCheckInTime, getCheckInTime, saveCheckOutTime, getCheckOutTime };