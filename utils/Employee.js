import { nextDate } from './Utils';

const checkRegistrationInfoForNextWeek = (data) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    const nextSunday = new Date();
    nextSunday.setHours(23, 59, 59, 0);
    nextSunday.setDate(nextMonday.getDate() + 6);
    let check = false;
    data.forEach(record => {
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