function getStringDate(date) {
	return date.toISOString().split('T')[0];
}

async function fetchDayData(base, currency, date) {

	let url = `https://api.coinbase.com/v2/prices/${base}-${currency}/spot`;
	url += `?date=${date}`;

	let data;
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error('request failed');
		}

		data = await response.json();
	} catch(err) {
		throw err;
	}

	return data;
}

async function getDayData(base, currency, date) {
	let stringDate = getStringDate(date);
	let data = await fetchDayData(base, currency, stringDate);

	return data.data.amount;
}

async function getData(base='BTC', currency='USD', monthsSince=6, daysInterval=30) {
	let nowDate = new Date;
	let startDate = new Date;
	startDate.setMonth(startDate.getMonth() - monthsSince);

	let datesArray = [getStringDate(startDate)];
	let dataArray = [];

	dataArray.push(await getDayData(base, currency, startDate));
	
	let flag = true;
	let i = 1;

	while (flag) {
		let newDate = new Date;
		newDate.setTime(startDate.getTime() + 1000 * 3600 * 24 * daysInterval * i);

		if (newDate.getTime() > nowDate.getTime()) {
			newDate = nowDate;
			flag = false;
		}

		let data = await getDayData(base, currency, newDate);

		datesArray.push(getStringDate(newDate));
		dataArray.push(data);
		
		++i;

	}

	return [datesArray, dataArray];

}
