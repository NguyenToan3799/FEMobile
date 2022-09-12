import { nextDate } from './Utils';
import { saveUserSchedule } from './AsyncStorage';

const checkRegistrationInfoForNextWeek = (data) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, { days: 6 })
    nextSunday.setHours(23, 59, 59, 0);
    console.log(nextMonday, nextSunday);
    let check = false;
    data.forEach(record => {
        console.log(record.date);
        let recordDate = new Date(record.date);
        if (recordDate >= nextMonday && recordDate <= nextSunday) check = true;
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

const getRegistrationScheduleForNextWeek = async (userId) => {
    const nextMonday = nextDate(1);
    nextMonday.setHours(0, 0, 0, 0);
    let add = require('date-fns/add');
    const nextSunday = add(nextMonday, { days: 6 })
    nextSunday.setHours(23, 59, 59, 0);

    let data = [];

    await fetch(`http://api.ngocsonak.xyz:8181/api/registrationschedule/get-by-user-id?id=${userId}`, {
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

  const updateRegistrationSchedule = async (data, roleName) => {
    let listDay = getListDayNextWeek();
    let updatedSchedule = ['-', '-', '-', '-', '-', '-', '-',];
    for (let item of data) {
      console.log(item);
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
    console.log(updatedSchedule);
    await saveUserSchedule(updatedSchedule);
    console.log('**********');
  }

export { isRegisteredShiftForNextWeek, isRegisteredDayOffForNextWeek, getRegistrationScheduleForNextWeek, updateRegistrationSchedule };