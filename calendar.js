let calendarMonth = document.querySelector('#calendar-month');
let tableMonth = document.querySelector('#month');
let lastDate = document.querySelector('.last-date');
let calendarDate = document.querySelector('.calendar-date');

async function getPrayerTimesCalendar(long, lat, inputValue, city) {
    let api;
    if (city === true) {
        console.log("true");
        let getMethod = await getData(`https://api.aladhan.com/v1/calendarByCity?city=${inputValue}&country=?&method=2`);
        let methodCity = getPrayerMethod(getMethod.data[0].meta);
        api = await getData(`https://api.aladhan.com/v1/calendarByCity?city=${inputValue}&country=?&method=${methodCity}`);
    } else {
        let getMethod = await getData(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=2`);
        let method = getPrayerMethod(getMethod.data[0].meta);
        api = await getData(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=${method}`);
    }

    let localTimezone = api.data[0].meta.timezone;
    let localDate = luxon.DateTime.local().setZone(localTimezone);

    const {date} = api.data[0];

    calendarMonth.textContent = date.gregorian.month.en + " " + date.gregorian.year;
    tableMonth.textContent = date.gregorian.month.en;

    let dates = [];
    let fajrTime = [];
    let dhuhrTime = [];
    let asrTime = [];
    let maghribTime = [];
    let ishaTime = [];
    let sunriseTime = [];

    for (let i = 0; i < api.data.length; i++) {
        // add dates of current month to array
        dates.push(api.data[i].date.gregorian.day);

        // add timings of each prayer to array
        fajrTime.push(api.data[i].timings.Fajr);
        dhuhrTime.push(api.data[i].timings.Dhuhr);
        asrTime.push(api.data[i].timings.Asr);
        maghribTime.push(api.data[i].timings.Maghrib);
        ishaTime.push(api.data[i].timings.Isha);

        // sunrise
        sunriseTime.push(api.data[i].timings.Sunrise);
    }

    // fill table with prayer timings
    let table = document.getElementById('calendar-body');
    for (let i = 0, row; row = table.rows[i]; i++) {
        let calDate = row.getElementsByTagName('th');
        let dateFajr = row.getElementsByClassName('fajr-prayer');
        let dateDhuhr = row.getElementsByClassName('dhuhr-prayer');
        let dateAsr = row.getElementsByClassName('asr-prayer');
        let dateMaghrib = row.getElementsByClassName('maghrib-prayer');
        let dateIsha = row.getElementsByClassName('isha-prayer');
        let dateSunrise = row.getElementsByClassName('sunrise');

        calDate[0].innerHTML = dates[i];
        dateFajr[0].innerHTML = fajrTime[i];
        dateDhuhr[0].innerHTML = dhuhrTime[i];
        dateAsr[0].innerHTML = asrTime[i];
        dateMaghrib[0].innerHTML = maghribTime[i];
        dateIsha[0].innerHTML = ishaTime[i];
        dateSunrise[0].innerHTML = sunriseTime[i];

        // flag to check if the user is searching for a city, if true we remove the css selector
        if (city) {
            row.classList.remove('current-day');
            calDate[0].classList.remove('current-day');
            dateFajr[0].classList.remove('current-day');
            dateDhuhr[0].classList.remove('current-day');
            dateAsr[0].classList.remove('current-day');
            dateMaghrib[0].classList.remove('current-day');
            dateIsha[0].classList.remove('current-day');
            dateSunrise[0].classList.remove('current-day');
        }
        // check to see if the day in the local timezone matches the day in the calendar
        // apply css selector to that particular day (highlights the elements)
        if (localDate.day === parseInt(calDate[0].innerHTML)) {
            row.classList.add('current-day');
            calDate[0].classList.add('current-day');
            dateFajr[0].classList.add('current-day');
            dateDhuhr[0].classList.add('current-day');
            dateAsr[0].classList.add('current-day');
            dateMaghrib[0].classList.add('current-day');
            dateIsha[0].classList.add('current-day');
            dateSunrise[0].classList.add('current-day');
        }

        for (let j = 0, col; col = row.cells[j]; j++) {

        }
    }

    // remove last row in table if month only has 30 dates
    if (dates.length === 30) {
        lastDate.classList.add('hidden-date')
    }
}

