let prayerTimeFajr = document.querySelector('#fajr');
let sunrise = document.querySelector('#sunrise');
let prayerTimeDhuhr = document.querySelector('#dhuhr');
let prayerTimeAsr = document.querySelector('#asr');
let prayerTimeMaghrib = document.querySelector('#maghrib');
let prayerTimeIshaa = document.querySelector('#ishaa');
let currDate = document.querySelector('.date');
let cityName = document.querySelector('.city');
let search = document.querySelector('.search-form');
let input = document.querySelector('#search-bar');
let prayerMethod = document.querySelector('#prayer-method');

const API_key = "pk.eyJ1Ijoia2hva2hhcjYiLCJhIjoiY2tmYW1vaWxrMHhmMTJ5cnF0aWJyYTI0eSJ9.5fdx9v5zTcM92HSZrh7_bg";
// Islamic Society of North America
// includes the countries of North America (Canada and US)
const ISNA = ["America/Adak", "America/Anchorage", "America/Boise", "America/Chicago", "America/Denver", "America/Detroit",
    "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg",
    "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac",
    "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Los_Angeles",
    "America/Menominee", "America/Metlakatla", "America/New_York", "America/Nome", "America/North_Dakota/Beulah",
    "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Phoenix", "America/Shiprock",
    "America/Sitka", "America/Yakutat", "Pacific/Honolulu", "America/Atikokan", "America/Blanc-Sablon",
    "America/Cambridge_Bay", "America/Creston", "America/Dawson", "America/Dawson_Creek", "America/Edmonton",
    "America/Fort_Nelson", "America/Glace_Bay", "America/Goose_Bay", "America/Halifax", "America/Inuvik", "America/Iqaluit",
    "America/Moncton", "America/Nipigon", "America/Pangnirtung", "America/Rainy_River", "America/Rankin_Inlet", "America/Regina",
    "America/Resolute", "America/St_Johns", "America/Swift_Current", "America/Thunder_Bay", "America/Toronto", "America/Vancouver",
    "America/Whitehorse", "America/Winnipeg", "America/Yellowknife"];

// Umm al-Qura University, Makkah
// includes the countries of the Arabian Peninsula
const UAQ = ["Asia/Riyadh", "Asia/Kuwait", "Asia/Bahrain", "Asia/Muscat", "Asia/Qatar", "Asia/Dubai", "Asia/Aden"];

// Egyptian General Authority of Survey
// includes the countries of Africa and Syria, Lebanon, and Malaysia
const EGAS = ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Bamako", "Africa/Bangui",
    "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca",
    "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun",
    "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum",
    "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi",
    "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia",
    "Africa/Nairobi", "Africa/Ndjamea", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo",
    "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "Asia/Damascus", "Asia/Beirut", "Asia/Kuala_Lumpur",
    "Asia/Kuching"];

// Spiritual Administration of Muslims of Russia
// includes various areas throughout Russia
const SAMR = ["Asia/Anadyr", "Asia/Barnaul", "Asia/Chita", "Asia/Irkutsk", "Asia/Kamchatka", "Asia/Khandyga", "Asia/Krasnoyarsk",
    "Asia/Magadan", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Sakhalin", "Asia/Srednekolymsk", "Asia/Tomsk",
    "Asia/Ust-Nera", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yekaterinburg", "Europe/Astrakhan", "Europe/Kaliningrad",
    "Europe/Kirov", "Europe/Moscow", "Europe/Samara", "Europe/Saratov", "Europe/Simferopol", "Europe/Ulyanovsk", "Europe/Volgograd"];

/*display prayer timings for the current day for any city*/
search.addEventListener("submit", e => {
    e.preventDefault();
    const inputValue = input.value;

    let api = `http://api.aladhan.com/v1/timingsByCity?city=${inputValue}&country=?&method=2`;
    let long;
    let lat;
    // first request used to determine prayer time calculation method
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {meta} = data.data;
            let method = getPrayerMethod(meta);
            let api = `http://api.aladhan.com/v1/timingsByCity?city=${inputValue}&country=?&method=${method}`;
            // set DOM elements in second request
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {timings, date, meta} = data.data;
                    // set DOM elements from the API
                    // set prayer timings
                    prayerTimeFajr.textContent = timings.Fajr;
                    sunrise.textContent = timings.Sunrise;
                    prayerTimeDhuhr.textContent = timings.Dhuhr;
                    prayerTimeAsr.textContent = timings.Asr;
                    prayerTimeMaghrib.textContent = timings.Maghrib;
                    prayerTimeIshaa.textContent = timings.Isha;

                    // set date
                    currDate.textContent = date.readable;

                    prayerMethod.textContent = meta.method.name;

                    long = meta.longitude;
                    lat = meta.latitude;
                    getCity(long, lat);
                    getLatLong(meta);
                });
        });
});

/*when the browser loads, get location from user and
display prayer times of the current day*/
window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            getPrayerTime(long, lat);
            getCity(long, lat);
        });
    }
});

/*get the prayer timings of the current day based on location using latitude and longitude*/
function getPrayerTime(long, lat) {
    let api = `http://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=2`;
    let longitude;
    let latitude;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {timings, date, meta} = data.data;

            // set DOM elements from the API
            // set prayer timings
            prayerTimeFajr.textContent = timings.Fajr;
            sunrise.textContent = timings.Sunrise;
            prayerTimeDhuhr.textContent = timings.Dhuhr;
            prayerTimeAsr.textContent = timings.Asr;
            prayerTimeMaghrib.textContent = timings.Maghrib;
            prayerTimeIshaa.textContent = timings.Isha;

            // set date
            currDate.textContent = date.readable;

            prayerMethod.textContent = meta.method.name;

            getLatLong(meta);

            let dateIsha = new Date(date.readable + " " + timings.Isha);
            let dateFajr = new Date(date.readable + " " + timings.Fajr);
            let dateDhuhr = new Date(date.readable + " " + timings.Dhuhr);
            let dateAsr = new Date(date.readable + " " + timings.Asr);
            let dateMaghrib = new Date(date.readable + " " + timings.Maghrib);
            let currD = new Date();
            let now = new Date();
            // currently between Isha'a and Fajr
            if (dates.inRange(dateFajr, now, dateFajr)) {
                console.log("True");
                currD.setDate(currD.getDate()+1);
                console.log(currD.getDate());

                let api = `http://api.aladhan.com/v1/timings/${currD.getUTCDate()}-09-2020?latitude=${lat}&longitude=${long}&method=2`;
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        let tomFajr = new Date(data.data.date.readable + " " + data.data.timings.Fajr);
                        console.log(tomFajr);
                        // countDown(tomFajr, now);
                        setInterval(countDown(tomFajr, now), 1);
                    });
            }
            // currently between Fajr and Dhuhr
            if (dateDhuhr.getTime() > currD.getTime() && dateFajr.getTime() < dateDhuhr.getTime()) {
                console.log("True");
            }
            // currently between Dhuhr and Asr
            if (dateDhuhr.getTime() <= currD.getTime() && currD.getTime() < dateAsr.getTime()) {
                console.log("True");
            }

            if (dateMaghrib.getTime() <= currD.getTime() && currD.getTime() < dateIsha.getTime()) {
                console.log("True");
                // let x = setInterval(function () {
                //     let now = currD.getTime();
                //     let distance = dateIsha.getTime() - now;
                //
                //     let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                //     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                //
                //     document.getElementById("next-prayer").innerHTML = days + "d " + hours + "h "
                //         + minutes + "m " + seconds + "s ";
                //
                //     if (distance < 0) {
                //         clearInterval(x);
                //         document.getElementById("next-prayer").innerHTML = "EXPIRED";
                //     }
                // }, 1000);
                // countDown(dateIsha, currD);
            }
        });
}

function countDown(countDownDate, currentDate) {
    let now = currentDate.getTime();
    let distance = countDownDate.getTime() - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("next-prayer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
}

function getCity(long, lat) {
    let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&access_token=${API_key}`;

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            cityName.textContent = data.features[0].place_name;
        });
}

function getLatLong(meta) {
    let lat;
    let long;
    lat = meta.latitude;
    long = meta.longitude;
    document.getElementById('lat').innerHTML = lat.toFixed(5) + ", " + long.toFixed(5);
}

function getPrayerMethod(meta) {
    let method;
    /*a different prayer time calculation method is used depending on the are you live in*/
    // University of Islamic Sciences, Karachi
    if (meta.timezone === "Asia/Karachi" || meta.timezone === "Asia/Dhaka" || meta.timezone === "Asia/Kolkata"
        || meta.timezone === "Asia/Kabul") {
        method = 1;
    } else if (ISNA.includes(meta.timezone)) {
        method = 2; // Islamic Society of North America (ISNA)
    } else if (UAQ.includes(meta.timezone)) {
        method = 4; // Umm al-Qura University, Makkah
    } else if (EGAS.includes(meta.timezone)) {
        method = 5; // Egyptian General Authority of Survey
    } else if (meta.timezone === "Asia/Tehran") {
        method = 7; // Institute of Geophysics, University of Tehran
    } else if (meta.timezone === "Asia/Singapore") {
        method = 11; // Majlis Ugama Islam Singapura, Singapore
    } else if (meta.timezone === "Europe/Paris") {
        method = 12; // Union Organization islamic de France
    } else if (meta.timezone === "Europe/Istanbul") {
        method = 13; // Diyanet İşleri Başkanlığı, Turkey
    } else if (SAMR.includes(meta.timezone)) {
        method = 14; // Spiritual Administration of Muslims of Russia
    } else {
        method = 3; // Muslim World League
    }
    return method;
}

var dates = {
    convert:function(d) {
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
                d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year,d.month,d.date) :
                                NaN
        );
    },
    inRange:function(d,start,end) {
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