import { nextDate } from './Utils';
import { saveUserSchedule } from './AsyncStorage';

const getRegistrationDataForNextWeek = (data) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, { days: 6 })
    nextSunday.setHours(23, 59, 59, 0);
    let check = false;
    data.forEach(record => {
        let recordDate = new Date(record.date);
        if (recordDate >= nextMonday && recordDate <= nextSunday) check = true;
    })
    return check;
}

const getRegistrationData = async (userId) => {
    // let check = false;
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, { days: 6 })
    nextSunday.setHours(23, 59, 59, 0);
    let listData = [null, null, null, null, null, null, null];
    let listDay = getListDayNextWeek();
    await fetch(`http://api.ngocsonak.xyz:8181/api/registrationschedule/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => {
        // if (result.length == 0) check = false;
        // else {
        //     check = await getRegistrationDataForNextWeek(result);
        // }
        for (let item of result) {
            for (let i = 0; i < 7; i++) {
                let itemDate = new Date(item.date);
                if (itemDate >= listDay[i] && itemDate <= listDay[i + 1]) {
                    listData[i] = item;
                    // if (roleName == 'EMPLOYEE_FULLTIME') {
                    //     updatedSchedule[i] = 'OFF';
                    // } else {
                    //     if (item['shift1']) updatedSchedule[i] = 'Ca 1';
                    //     else if (item['shift2']) updatedSchedule[i] = 'Ca 2';
                    //     else if (item['shift3']) updatedSchedule[i] = 'Ca 3';
                    // }
                    break;
                }
            }
        }
    }).catch(error => console.log('error', error));
    return listData;
}

const isRegisteredDayOffForNextWeek = async (userId) => {
    let check = false;
    await fetch(`http://api.ngocsonak.xyz:8181/api/registrationschedule/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => {
        if (result.length == 0) check = false;
        else {
            check = await getRegistrationDataForNextWeek(result);
        }

    }).catch(error => console.log('error', error));
    return check;
}

const getRegistrationScheduleForNextWeek = async (userId) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, { days: 6 })
    nextSunday.setHours(23, 59, 59, 0);

    let data = [];

    await fetch(`http://api.ngocsonak.xyz:8181/api/workschedule/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => {
        if (result.length > 0) {
            result.forEach(record => {
                let recordDate = new Date(record.date);
                if (recordDate >= nextMonday && recordDate <= nextSunday) data.push(record);
            })
        }

    }).catch(error => console.log('error', error));

    return data;
}

const getWorkScheduleForCurrentWeek = async (userId) => {
    let nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let sub = require('date-fns/sub');
    nextMonday = sub(nextMonday, { days: 7 });
    let add = require('date-fns/add');
    let nextSunday = add(nextMonday, { days: 6 });
    nextSunday.setHours(23, 59, 59, 0);

    let data = [];

    await fetch(`http://api.ngocsonak.xyz:8181/api/workschedule/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => {
        if (result.length > 0) {
            result.forEach(record => {
                let recordDate = new Date(record.date); 
                if (recordDate >= nextMonday && recordDate <= nextSunday) data.push(record);
            })
        }

    }).catch(error => console.log('error', error));

    return data;
}

const getListDayNextWeek = () => {
    let listDay = [];
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0);

    let add = require('date-fns/add');

    for (let i = 0; i < 8; i++) {
        let nextDay = add(nextMonday, { days: i });
        listDay.push(nextDay);
    }
    return listDay;
}

const getListDayCurrentWeek = () => {
    let listDay = [];
    let nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let sub = require('date-fns/sub');
    nextMonday = sub(nextMonday, { days: 7 });

    let add = require('date-fns/add');

    for (let i = 0; i < 8; i++) {
        let nextDay = add(nextMonday, { days: i });
        listDay.push(nextDay);
    }
    return listDay;
}

const updateRegistrationSchedule = async (data, roleName) => {
    let listDay = getListDayNextWeek();
    let updatedSchedule = ['-', '-', '-', '-', '-', '-', '-',];
    for (let item of data) {
        for (let i = 0; i < 7; i++) {
            let itemDate = new Date(item.date);
            if (itemDate >= listDay[i] && itemDate <= listDay[i + 1]) {
                if (roleName == 'EMPLOYEE_FULLTIME') {
                    updatedSchedule[i] = 'OFF';
                } else {
                    if (item['shift1']) updatedSchedule[i] = 'Ca 1';
                    else if (item['shift2']) updatedSchedule[i] = 'Ca 2';
                    else if (item['shift3']) updatedSchedule[i] = 'Ca 3';
                }
                break;
            }
        }
    }
    return updatedSchedule;
}

const updateWorkSchedule = async (data, roleName) => {
    let listDay = getListDayCurrentWeek();
    let updatedSchedule = [null, null, null, null, null, null, null,];
    for (let item of data) {
        for (let i = 0; i < 7; i++) {
            let itemDate = new Date(item.date);
            if (itemDate >= listDay[i] && itemDate <= listDay[i + 1]) {
                updatedSchedule[i] = item;
                // if (roleName == 'EMPLOYEE_FULLTIME') {
                //     updatedSchedule[i] = 'OFF';
                // } else {
                //     if (item['shift1']) updatedSchedule[i] = 'Ca 1';
                //     else if (item['shift2']) updatedSchedule[i] = 'Ca 2';
                //     else if (item['shift3']) updatedSchedule[i] = 'Ca 3';
                // }
                break;
            }
        }
    }
    // await saveUserSchedule(updatedSchedule);
    return updatedSchedule;
}

const getEmployeeCertificate = async (userId) => {
    let listCertificate = [];
    await fetch(`http://api.ngocsonak.xyz:8181/api/certificates/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => listCertificate = result).catch(error => console.log('error', error));
    return listCertificate;
}

const getEmployeeRewardandDiscipline = async (userId) => {
    let listRewardAndDiscipline = [];
    await fetch(`http://api.ngocsonak.xyz:8181/api/rewardanddiscipline/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => listRewardAndDiscipline = result).catch(error => console.log('error', error));
    return listRewardAndDiscipline;
}

export { updateWorkSchedule, getWorkScheduleForCurrentWeek, getEmployeeRewardandDiscipline, getEmployeeCertificate, getRegistrationData, isRegisteredDayOffForNextWeek, getRegistrationScheduleForNextWeek, updateRegistrationSchedule };