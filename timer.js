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

async function displayTimer(lat, long) {
    let currD = new Date();
    let cD = new Date();
    currD.setDate(currD.getDate() + 1);
    let dataToday = await getData(`https://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=2`);

    let dateIsha = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Isha);
    let dateFajr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Fajr);
    let dateDhuhr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Dhuhr);
    let dateAsr = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Asr);
    let dateMaghrib = new Date(dataToday.data.date.readable + " " + dataToday.data.timings.Maghrib);

    let dataTom = await getData(`https://api.aladhan.com/v1/timings/${currD.getUTCDate()}-09-2020?latitude=${lat}&longitude=${long}&method=2`);
    let prayerTime;
    // get tomorrows time for Fajr prayer
    let tomFajr = new Date(dataTom.data.date.readable + " " + dataTom.data.timings.Fajr);
    if (dates.inRange(tomFajr, cD, tomFajr)) {
        console.log("Fajr");
        prayerTime = tomFajr;
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Fajr in"
    }
    if (dates.inRange(cD, dateFajr, dateDhuhr)) {
        prayerTime = dateDhuhr;
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Dhuhr in"
    }
    if (dates.inRange(cD, dateDhuhr, dateAsr)) {
        prayerTime = dateAsr;
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Asr in"
    }
    if (dates.inRange(cD, dateAsr, dateMaghrib)) {
        prayerTime = dateMaghrib;
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Maghrib in"
    }
    if (dates.inRange(cD, dateMaghrib, dateIsha)) {
        prayerTime = dateIsha;
        document.getElementById('next-prayer-text').innerHTML = "Next Prayer Isha'a in"
    }
    // startTimer = setInterval(calcTime, 100);
    let startTime = setInterval(function() {
        let now = new Date();
        let current = now.getTime();
        let distance = prayerTime.getTime() - current;

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('next-prayer').innerHTML = hours + "h "
            + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(startTime);
            document.getElementById('next-prayer').innerHTML = "0h " + "00m " + "00s ";
        }
    }, 100);
}

