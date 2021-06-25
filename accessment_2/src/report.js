const { getTrips, getDriver, getVehicle } = require('api');
const { normalizeAmount, allData, allVehincle } = require('./utils');

/**
 * This function should return the data for drivers in the specified format
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
	const trips = await getTrips();

    const driver = trips.map((item) => item.driverID);
    const uniqueDrivers = driver.filter((v, i, a) => a.indexOf(v) === i);
    let allDriver = await allData(uniqueDrivers);

    let b = allDriver.map((item => item.vehicleID))

    const flatten = function(a, shallow, r) {
		if (!r) {
			r = [];
		}

		if (shallow) {
			return r.concat.apply(r, a);
		}

		for (var i = 0; i < a.length; i++) {
			if (a[i].constructor == Array) {
				flatten(a[i], shallow, r);
			} else {
				r.push(a[i]);
			}
		}
		return r;
	}

    let carList = flatten(b)

    let allCars = await allVehincle(carList)


	// get driver
	const sumall = (id) =>
		trips
			.filter((e) => e.driverID === id)
			.map((item) => normalizeAmount(item.billedAmount))
			.reduce((a, b) => a + b, 0)
			.toFixed(2);
	const sumallcash = (id) =>
		trips
			.filter((e) => e.isCash == true && e.driverID === id)
			.map((item) => normalizeAmount(item.billedAmount))
			.reduce((a, b) => a + b, 0)
			.toFixed(2);
	const sumallnoncash = (id) =>
		trips
			.filter((e) => e.isCash == false && e.driverID === id)
			.map((item) => normalizeAmount(item.billedAmount))
			.reduce((a, b) => a + b, 0)
			.toFixed(2);



	const drivers = allDriver.map((item) => ({
		fullName: item.name,
		id: item.driverID,
        noOfCashTrips: trips.filter((e) => e.isCash == true && e.driverID == item.driverID).length,
        noOfNonCashTrips: trips.filter((e) => e.isCash == false && e.driverID == item.driverID).length,
        noOfTrips: trips.filter((e) => e.driverID === item.driverID).length,
		phone: item.phone,
        totalAmountEarned: normalizeAmount(sumall(item.driverID)),
        totalCashAmount: normalizeAmount(sumallcash(item.driverID)),
        totalNonCashAmount: normalizeAmount(sumallnoncash(item.driverID)),
        trips: trips.filter((e) => e.driverID === item.driverID).map((item) => ({
            user: item.user.name,
            created: item.created,
            pickup: item.pickup.address,
            destination: item.destination.address,
            billed: normalizeAmount(item.billedAmount),
            isCash: item.isCash
        })),
		vehicles: item.vehicleID.map((item) => ({
            plate: allCars.filter(e => e.vehicleID === item)[0].plate,
            manufacturer: allCars.filter(e => e.vehicleID === item)[0].manufacturer
        })),
	}));

	return drivers;
}

module.exports = driverReport;
