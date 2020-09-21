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

const API_key = "pk.eyJ1Ijoia2hva2hhcjYiLCJhIjoiY2tmYW1vaWxrMHhmMTJ5cnF0aWJyYTI0eSJ9.5fdx9v5zTcM92HSZrh7_bg";

/*display prayer timings for the current day for any city*/
search.addEventListener("submit", e => {
    e.preventDefault();
    const inputValue = input.value;

    let api = `http://api.aladhan.com/v1/timingsByCity?city=${inputValue}&country=?&method=2`;
    let long;
    let lat;
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

            long = meta.longitude;
            lat = meta.latitude;
            getCity(long, lat);
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

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {timings, date} = data.data;

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
        });
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
