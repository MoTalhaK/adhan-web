let calendarMonth = document.querySelector('#calendar-month');
let calendarDate = document.querySelector('.calendar-date');

async function getPrayerTimesCalendar(long, lat) {
    let getMethod = await getData(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=2`);
    let method = getPrayerMethod(getMethod.data[0].meta);
    let api = await getData(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=${method}`);
    const {date} = api.data[0];
    // get current calendar month and year
    calendarMonth.textContent = date.gregorian.month.en + " " + date.gregorian.year;
    console.log(api.data);
    console.log(api.data.length);
    // calendar date
    let dates = [];
    for (let i = 0; i < api.data.length; i++) {
        // console.log(obj);
        // console.log(api.data[i].date.gregorian.day);
        dates.push(api.data[i].date.gregorian.day);
    }
    console.log(dates);
    let table = document.getElementById('calendar-body');
    for (let i = 0, row; row = table.rows[i]; i++) {
        let calDate = row.getElementsByTagName('th');
        // console.log(calDate[0]);
        calDate[0].innerHTML = dates[i];
        for (let j = 0, col; col = row.cells[j]; j++) {
            // console.log(col);
        }
    }
    // prayer timings

}

