/**
 * Date time utilities to process for date time
 * Create by: ThangLD
 * Create at: 14/05/2022
 */

const moment = require('moment');

const yyyy_MM_DD = 'yyyy-MM-DD'

/**
 * Get now with format yyyy_MM_DD
 * @returns 
 */
exports.getDateWithString = () => {
    return moment(new Date()).format(yyyy_MM_DD);
}

/**
 * Get Date() with param
 * @param {*} date (string with fromat, long)
 * @returns 
 */
exports.getDate = (date) => {
    return new Date(date);
}

exports.calculateDaysFromNow = (date) => {
    const today = moment(new Date()).startOf('day');
    const calDate = moment(date, yyyy_MM_DD);
    return today.diff(calDate, 'days');
}

/**
 * get display time with format hh:mm
 * 
 * @param {int} date 
 */
exports.getDisplayTime = (date) => {
    const tempDate = new Date(date);
    return ("0" + tempDate.getHours()).slice(-2) + ':' + ("0" + tempDate.getMinutes()).slice(-2);
}

/**
 * Get display time with format hh:mm
 * @param {int} hour 
 * @param {int} min 
 */
exports.getDisplayTimeByHourMin = (hour, min) => {
    return ("0" + hour).slice(-2) + ':' + ("0" + min).slice(-2);
}

/**
 * Get previous date 
 * @param {"yyyy_MM_DD"} date 
 * @returns "yyyy_MM_DD"
 */
exports.getPreviousDate = (date) => {
    return moment(date, yyyy_MM_DD).subtract(1, 'days').format(yyyy_MM_DD);
}

/**
 * Get next date 
 * @param {"yyyy_MM_DD"} date 
 * @returns "yyyy_MM_DD"
 */
exports.getNextDate = (date) => {
    return moment(date, yyyy_MM_DD).add(1, 'days').format(yyyy_MM_DD);
}

/**
 * Get duration with second, minus if date in past
 * @param {Date()} date 
 * @returns 
 */
exports.getDurationFromNow = (date) => {
    const today = moment(new Date());
    const calDate = moment(date)
    return moment.duration(calDate.diff(today)).seconds();
}