// instead of import, to get at actual moment object
const moment = require.requireActual('moment');

// mock for moment to return the same time when a test asks for "current time"
export default (timestamp = 0) => {
  return moment(timestamp);
};