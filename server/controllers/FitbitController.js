const fitbitRequestHelpers = require('../lib/fitbitRequestHelpers');
const utils = require('../lib/utils');

const getFitbitData = (req, res) => {
  // const userid = req.query.user_id
  // const fitbitId = req.query.fitbit_id;
  // const accessToken = req.query.accessToken;
  // const startDate = req.query.startDate;
  // const endDate = req.query.endDate;
  // const auth = 'Bearer', accessToken;

  // date needs to be in yyyy-MM-dd format

  // UDPATE THESE ONCE YOU ACTUALLY GET EXTERNAL REQUESTS
  const userid = 2;
  const fitbitId = '4PM7XM';
  const date = '2016-06-21';
  const startDate = '2016-06-18';
  const endDate = '2016-06-21';
  const auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjY1NzIyMzIsInNjb3BlcyI6InJ3ZWkgcnBybyByaHIgcnNsZSByc2V0IHJhY3QiLCJzdWIiOiI0UE03WE0iLCJhdWQiOiIyMjdWM00iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NjY1Njg2MzJ9.0IQvjCNB7veMeigMk05vRYzCkV8h-X_uIwMWjD1UiXI';
  const distanceReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/distance/date/' + startDate + '/' + endDate + '.json';
  const stepsReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/steps/date/' + startDate + '/' + endDate + '.json';
  const caloriesReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/tracker/calories/date/' + startDate + '/' + endDate + '.json';
  const sleepReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/sleep/minutesAsleep/date/' + startDate + '/' + endDate + '.json';
  const hrReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/activities/heart/date/' + startDate + '/' + endDate + '.json';
  const weightReqUrl = 'https://api.fitbit.com/1/user/' + fitbitId + '/body/log/weight/date/' + startDate + '/' + endDate + '.json';

  const sendDistance = (cb) => utils.sendRequest(distanceReqUrl, auth, res, userid, fitbitRequestHelpers.insertDistance, cb);
  const sendSteps = (cb) => utils.sendRequest(stepsReqUrl, auth, res, userid, fitbitRequestHelpers.insertSteps, cb);
  const sendCalories = (cb) => utils.sendRequest(caloriesReqUrl, auth, res, userid, fitbitRequestHelpers.insertCalories, cb);
  const sendSleep = (cb) => utils.sendRequest(sleepReqUrl, auth, res, userid, fitbitRequestHelpers.insertSleep, cb);
  const sendHR = (cb) => utils.sendRequest(hrReqUrl, auth, res, userid, fitbitRequestHelpers.insertHR, cb);
  const sendWeight = (cb) => utils.sendRequest(weightReqUrl, auth, res, userid, fitbitRequestHelpers.insertWeight, cb);

  const syncTasks = [sendDistance, sendSteps, sendCalories, sendSleep, sendHR, sendWeight];
  const callback = () => console.log('Inserted all items into database');
  syncTasks.push((cb) => {
    setTimeout(() => {
      cb();
    }, 1000);
  });
  utils.syncMap(syncTasks, callback, []);
};

module.exports = getFitbitData;