import { nextDate } from './Utils';

const checkRegistrationInfoForNextWeek = (data) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, {days: 6})
    nextSunday.setHours(23, 59, 59, 0);
    console.log(nextMonday, nextSunday);
    let check = false;
    data.forEach(record => {
        console.log(record.date);
        let recordDate = new Date(record.date);
        if (recordDate >= nextMonday && recordDate <= nextSunday) check =  true;
    })
    return check;
}

const isRegisteredShiftForNextWeek = async (userId) => {
    let check = false;
    await fetch(`http://api.ngocsonak.xyz:8181/api/registrationschedule/get-by-user-id?id=${userId}`, {
        method: 'GET',
        heaaders: {
            Accept: '*/*',
        }
    }).then(response => response.json()).then(async (result) => {
        if (result.length == 0) check = false;
        else {
            check = await checkRegistrationInfoForNextWeek(result);
        }
        
    }).catch(error => console.log('error', error));
    return check;
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
            check = await checkRegistrationInfoForNextWeek(result);
        }
        
    }).catch(error => console.log('error', error));
    return check;
}

export { isRegisteredShiftForNextWeek, isRegisteredDayOffForNextWeek };