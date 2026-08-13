// ======================================================
// BHUTAN REAL-TIME WEATHER APPLICATION
// ======================================================

// Bhutan locations
const locations = {

    thimphu: {
        name: "Thimphu",
        lat: 27.4728,
        lon: 89.6390
    },

    paro: {
        name: "Paro",
        lat: 27.4286,
        lon: 89.4167
    },

    punakha: {
        name: "Punakha",
        lat: 27.5916,
        lon: 89.8771
    },

    trongsa: {
        name: "Trongsa",
        lat: 27.5026,
        lon: 90.5072
    },

    phuentsholing: {
        name: "Phuentsholing",
        lat: 26.8516,
        lon: 89.3884
    },

    gelephu: {
        name: "Gelephu",
        lat: 26.8800,
        lon: 90.4833
    },

    samdrup_jongkhar: {
        name: "Samdrup Jongkhar",
        lat: 26.8000,
        lon: 91.5050
    },

    wangdue: {
        name: "Wangdue Phodrang",
        lat: 27.4861,
        lon: 89.8992
    }

};


// ======================================================
// HTML ELEMENTS
// ======================================================

const citySelect = document.getElementById("citySelect");
const searchButton = document.getElementById("searchButton");
const refreshButton = document.getElementById("refreshButton");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const clouds = document.getElementById("clouds");

const updated = document.getElementById("updated");

const error = document.getElementById("error");
const loading = document.getElementById("loading");

const weatherCard = document.getElementById("weatherCard");


// ======================================================
// WEATHER DESCRIPTION
// ======================================================

function getWeatherDescription(code) {

    const descriptions = {

        0: "Clear sky",

        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Fog",

        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",

        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",

        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",

        66: "Light freezing rain",
        67: "Heavy freezing rain",

        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",

        77: "Snow grains",

        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",

        85: "Slight snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",

        96: "Thunderstorm with hail",
        99: "Thunderstorm with heavy hail"

    };

    return descriptions[code] || "Unknown weather";
}


// ======================================================
// WEATHER ICON
// ======================================================

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code === 1 || code === 2) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if (code === 45 || code === 48) {
        return "🌫️";
    }

    if (code >= 51 && code <= 67) {
        return "🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "❄️";
    }

    if (code >= 80 && code <= 82) {
        return "🌦️";
    }

    if (code >= 85 && code <= 86) {
        return "🌨️";
    }

    if (code >= 95) {
        return "⛈️";
    }

    return "🌤️";
}


// ======================================================
// GET WEATHER
// ======================================================

async function getWeather() {

    const selectedCity = citySelect.value;

    const location = locations[selectedCity];

    if (!location) {

        showError("Location not found.");

        return;
    }


    // Show loading

    loading.style.display = "block";

    error.textContent = "";

    weatherCard.style.opacity = "0.6";


    try {

        // ==================================================
        // OPEN-METEO API
        // NO API KEY REQUIRED
        // ==================================================

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + location.lat +
            "&longitude=" + location.lon +
            "&current=" +
            "temperature_2m," +
            "relative_humidity_2m," +
            "apparent_temperature," +
            "weather_code," +
            "cloud_cover," +
            "wind_speed_10m" +
            "&timezone=auto";


        console.log("Requesting weather:", url);


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Weather service is not available."
            );

        }


        const data = await response.json();

        console.log("Weather data:", data);


        const current = data.current;


        // ==================================================
        // CITY
        // ==================================================

        cityName.textContent =
            location.name;


        // ==================================================
        // TEMPERATURE
        // ==================================================

        temperature.textContent =
            Math.round(current.temperature_2m);


        // ==================================================
        // DESCRIPTION
        // ==================================================

        description.textContent =
            getWeatherDescription(
                current.weather_code
            );


        // ==================================================
        // ICON
        // ==================================================

        weatherIcon.textContent =
            getWeatherIcon(
                current.weather_code
            );


        // ==================================================
        // HUMIDITY
        // ==================================================

        humidity.textContent =
            current.relative_humidity_2m + "%";


        // ==================================================
        // WIND
        // ==================================================

        wind.textContent =
            current.wind_speed_10m + " km/h";


        // ==================================================
        // FEELS LIKE
        // ==================================================

        feelsLike.textContent =
            Math.round(
                current.apparent_temperature
            ) + "°C";


        // ==================================================
        // CLOUDINESS
        // ==================================================

        clouds.textContent =
            current.cloud_cover + "%";


        // ==================================================
        // UPDATED TIME
        // ==================================================

        updated.textContent =
            new Date().toLocaleTimeString();


        error.textContent = "";

    }


    catch (err) {

        console.error(
            "Weather Error:",
            err
        );

        showError(
            "❌ Unable to load weather. Please check your internet connection."
        );

    }


    finally {

        loading.style.display = "none";

        weatherCard.style.opacity = "1";

    }

}


// ======================================================
// SHOW ERROR
// ======================================================

function showError(message) {

    error.textContent = message;

    loading.style.display = "none";

    weatherCard.style.opacity = "1";

}


// ======================================================
// SEARCH BUTTON
// ======================================================

searchButton.addEventListener(
    "click",
    getWeather
);


// ======================================================
// REFRESH BUTTON
// ======================================================

refreshButton.addEventListener(
    "click",
    getWeather
);


// ======================================================
// LOAD WEATHER
// ======================================================

getWeather();


// ======================================================
// AUTOMATIC REFRESH EVERY 10 MINUTES
// ======================================================

setInterval(
    getWeather,
    10 * 60 * 1000
);