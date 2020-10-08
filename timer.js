var dates = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
};

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

var startTime;
async function displayTimer(lat, long, flag) {
    let dataTemp = await getData(`https://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=2`);
    const {meta} = dataTemp.data;
    let method = getPrayerMethod(meta);
    let dataToday = await getData(`https://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=${method}`);
    let tZ = dataToday.data.meta.timezone;
    let options = {
        timeZone: dataToday.data.meta.timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    let formatter = new Intl.DateTimeFormat([], options);
    let prayerDate = formatter.format(new Date());
    let currD = new Date();

    currD.setDate(currD.getDate() + 1);

    let dateIsha = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Isha);
    let dateFajr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Fajr);
    let dateDhuhr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Dhuhr);
    let dateAsr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Asr);
    let dateMaghrib = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Maghrib);
    let currMonth = dataToday.data.date.gregorian.month.number;
    let currYear = dataToday.data.date.gregorian.year;
    let currDay = dataToday.data.date.gregorian.day;

    let dataTom = await getData(`https://api.aladhan.com/v1/timings/${currD.getUTCDate()}-${currMonth}-2020?latitude=${lat}&longitude=${long}&method=${method}`);
    console.log(dataTom);
    let prayerTime;
    // get tomorrows time for Fajr prayer
    let tomFajr = new Date(dataTom.data.date.readable + " " + dataTom.data.timings.Fajr);

    let inRangeFajr = dates.inRange(prayerDate, prayerDate, tomFajr);
    let inRangeDhuhr = dates.inRange(prayerDate, dateFajr, dateDhuhr);
    let inRangeAsr = dates.inRange(prayerDate, dateDhuhr, dateAsr);
    let inRangeMaghrib = dates.inRange(prayerDate, dateAsr, dateMaghrib);
    let inRangeIsha = dates.inRange(prayerDate, dateMaghrib, dateIsha);

    if (inRangeFajr && !inRangeDhuhr && !inRangeAsr && !inRangeMaghrib && !inRangeIsha) {
        clearInterval(startTime);
        console.log("Fajr");
        prayerTime = new Date(tomFajr).getTime();
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Fajr in";
    }
    if (inRangeDhuhr) {
        clearInterval(startTime);
        console.log("Dhuhr");
        prayerTime = new Date(dateDhuhr).getTime();
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Dhuhr in";
    }
    if (inRangeAsr) {
        console.log("Asr");
        clearInterval(startTime);
        prayerTime = new Date(dateAsr).getTime();
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Asr in";
    }
    if (inRangeMaghrib) {
        clearInterval(startTime);
        console.log("Maghrib");
        prayerTime = new Date(dateMaghrib).getTime();
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Maghrib in";
    }
    if (inRangeIsha) {
        clearInterval(startTime);
        console.log("Isha'a");
        prayerTime = new Date(dateIsha).getTime();
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Isha'a in";
    }
    startTime = setInterval(function() {
        let cD = luxon.DateTime.local().setZone(tZ);
        let local = luxon.DateTime.local(parseInt(currYear), parseInt(currMonth), parseInt(currDay),
            cD.hour, cD.minute, cD.second);
        let distance = prayerTime - local;

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('next-prayer').innerHTML = hours + "h "
            + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(startTime);
            document.getElementById('next-prayer').innerHTML = "0h " + "00m " + "00s ";
        }
    }, 500);
}

