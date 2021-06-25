const { getTrips, getDriver } = require('api');
const { normalizeAmount, allData } = require('./utils');

/**
 * This function should return the trip data analysis
 *
 * @returns {any} Trip data analysis
 */
async function analysis() {
	let data = await getTrips();

	// get all cash trips
	let numberOfCash = data.filter((e) => e.isCash == true);

	// get all non cash trips
	let numberOfNonCash = data.filter((e) => e.isCash == false);

	// getting total bills
	let array = data.map((item) => normalizeAmount(item.billedAmount));
	let totalAmount = array.reduce((a, b) => a + b, 0).toFixed(2);

	// getting total cash billed
	let cashArray = numberOfCash.map((item) => normalizeAmount(item.billedAmount));
	let totalCashAmount = cashArray.reduce((a, b) => a + b, 0).toFixed(2);

	// getting total non cash billed
	let noCashArray = numberOfNonCash.map((item) => normalizeAmount(item.billedAmount));
	let totalNonCashAmount = noCashArray.reduce((a, b) => a + b, 0).toFixed(2);

	// get drivers with more than one vehicle
	const drivers = data.map((item) => item.driverID);
    const uniqueDrivers = drivers.filter((v, i, a) => a.indexOf(v) === i);
    let allDriver = await allData(uniqueDrivers);
    let driversWithMoreThanOneCar = allDriver.filter(i => i.vehicleID.length > 1)


	// get most Trip By Drivers
	let mostTripsdriver = drivers
		.sort((a, b) => drivers.filter((v) => v === a).length - drivers.filter((v) => v === b).length)
		.pop();
	let driverDetails = await getDriver(mostTripsdriver);
	let tripDetails = data.filter((e) => e.driverID === mostTripsdriver);
	let driverSum = tripDetails.map((item) => normalizeAmount(item.billedAmount)).reduce((a, b) => a + b, 0).toFixed(2);

	// highest Earninf driver
	const sumall = (id) =>
		data
			.filter((e) => e.driverID === id)
			.map((item) => normalizeAmount(item.billedAmount))
			.reduce((a, b) => a + b, 0)
			.toFixed(2);
	const earning = data.map((item) => ({
		id: item.driverID,
		total: normalizeAmount(sumall(item.driverID)),
		trips: data.filter((e) => e.driverID === item.driverID)
	}));
	const max = earning.reduce((a, b) => (a.total > b.total ? a : b));
	let mostEarned = await getDriver(max.id);

	return {
		noOfCashTrips: numberOfCash.length,
		noOfNonCashTrips: numberOfNonCash.length,
		billedTotal: normalizeAmount(totalAmount),
		cashBilledTotal: normalizeAmount(totalCashAmount),
		nonCashBilledTotal: normalizeAmount(totalNonCashAmount),
		noOfDriversWithMoreThanOneVehicle: driversWithMoreThanOneCar.length,
		mostTripsByDriver: {
			name: driverDetails.name,
			email: driverDetails.email,
			phone: driverDetails.phone,
			noOfTrips: tripDetails.length,
			totalAmountEarned: normalizeAmount(driverSum)
		},
		highestEarningDriver: {
			name: mostEarned.name,
			email: mostEarned.email,
			phone: mostEarned.phone,
			noOfTrips: max.trips.length,
			totalAmountEarned: max.total
		}
	};
}

module.exports = analysis;
