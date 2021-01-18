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

// MapBox API key
const API_key = "pk.eyJ1Ijoia2hva2hhcjYiLCJhIjoiY2tmYW1vaWxrMHhmMTJ5cnF0aWJyYTI0eSJ9.5fdx9v5zTcM92HSZrh7_bg";

/*display prayer timings for the current day for any city*/
search.addEventListener("submit", e => {
    e.preventDefault();
    const inputValue = input.value;

    let api = `https://api.aladhan.com/v1/timingsByCity?city=${inputValue}&country=?&method=2`;
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
            let api = `https://api.aladhan.com/v1/timingsByCity?city=${inputValue}&country=?&method=${method}`;
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
                    displayTimer(lat, long, true);
                    console.log("method", method);
                    console.log("input", inputValue);
                    getPrayerTimesCalendar(long, lat, inputValue, true);
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
            getPrayerTimesCalendar(long, lat, null, false);
        });
    }
});

/*get the prayer timings of the current day based on location using latitude and longitude*/
async function getPrayerTime(long, lat) {
    let api = `https://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=2`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {meta} = data.data;

            // make another request to get prayer calculation method
            let method = getPrayerMethod(meta);
            let calculationMethod = getData(`https://api.aladhan.com/v1/timings/:date_or_timestamp?latitude=${lat}&longitude=${long}&method=${method}`)
            calculationMethod.then(data => {
                console.log(data);
                const {timings, date, meta} = data.data;
                prayerMethod.textContent = meta.method.name;

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

                // display results (timer and long/lat)
                getLatLong(meta);
                displayTimer(lat, long);
            });
        });
}

function getCity(long, lat) {
    let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&access_token=${API_key}`;
    fetch(api)
        .then(response => {
            // console.log(response.body);
            // if (!response.ok) {
            //     throw new Error('network response not ok.');
            // }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // if (data.features && data.features.length === 0) {
            //
            // }
            cityName.textContent = data.features[0].place_name;
        });
        // .catch(error => {
        //     console.error('problem with fetch request.', error);
        // });
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