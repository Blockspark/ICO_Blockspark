const { dateTimeFormat } = require("../config/constants");
const moment = require("moment");
let date = new Date(new Date() + 1), y = date.getFullYear(), m = date.getMonth();

exports.getFirstDayOfThisMonth = () => {
	return new Date(y, m, 2);
};

exports.getLastDayOfThisMonth = () => {
	return new Date(y, m + 1, 1);
};

exports.getFirstDayOfLastMonth = () => {
	return new Date(y, m - 1, 2);
};

exports.getLastDayOfLastMonth = () => {
	return new Date(y, m, 1);
};

exports.currentUtcTime = () => {
	return moment.utc().format(dateTimeFormat.dateTime);
};

exports.currentUtcTimeOnly = () => {
	return moment.utc().format(dateTimeFormat._time);
};

exports.todayDate = () => {
	return moment.utc().format(dateTimeFormat.date);
};

exports.convertTimeInto12HoursFormat = (time) => {
	return moment(time,dateTimeFormat._time).format(dateTimeFormat.__time);
};

exports.compareTimeBetween = (currentTime, before, after) => {
	var time = moment(currentTime, dateTimeFormat._time),
		beforeTime = moment(before, dateTimeFormat._time),
		afterTime = moment(after, dateTimeFormat._time);
		let v = time.isBetween(beforeTime, afterTime);
	return time.isBetween(beforeTime, afterTime)
};

exports.subtractHoursFromTime = (realTime, hours = "00") => {
	var duration = moment.duration({ hours, minutes: "00" })
	return moment(realTime, dateTimeFormat._time).subtract(duration).format(dateTimeFormat._time);
};

exports.addHoursFromTime = (realTime, hours = "00") => {
	var duration = moment.duration({ hours, minutes: "00" })
	return moment(realTime, dateTimeFormat._time).add(duration).format(dateTimeFormat._time);
};

exports.calculateNextDate = (startdate, day) => {
	return (moment(startdate, dateTimeFormat.date).add(day, 'days')).format(dateTimeFormat.date);
};

exports._calculateNextDate = (startdate, day) => {
	return (moment(startdate, dateTimeFormat.dateTime).add(day, 'days')).format(dateTimeFormat.dateTime);
};

exports.calculateDayDifference = (dateToCheckAgainst) => {
	let eventdate = moment(dateToCheckAgainst);
	let todaysdate = moment();
	return todaysdate.diff(eventdate, "days");
};

exports.calculateHourDifference = (dateTime) => {
	let duration = moment.duration(moment.utc(dateTime).format("HH:mm:ss"));
	return duration.hours();
};