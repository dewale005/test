const { getVehicle, getDriver } = require('api');

const utils = {
	normalizeAmount: function(string) {
		if (typeof string == 'number') {
			return string;
		} else {
			return Number(string.replace(/[$,]+/g, ''));
		}
	},
	allData: async function(arr) {
		let m = [];
		for (var i = 0; i < 9; i++) {
			let data = await getDriver(arr[i]);
			data.driverID = arr[i];
			m.push(data);
		}
		return m;
	},
	allVehincle : async function(arr) {
		let m = [];
		for (var i = 0; i < arr.length; i++) {
			let data = await getVehicle(arr[i]);
			data.vehicleID = arr[i];
			m.push(data);
		}
		return m;
	}
};

module.exports = utils;
