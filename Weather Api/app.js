const weatherApi= {
    key: "e833643c19723c53ea6046e9ce47eaff",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');
const btn = document.getElementById('btn');

searchInputBox.addEventListener('keypress', (e)=> {
    if(e.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
        searchInputBox.value = "";
    }
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const result = searchInputBox.value;
    console.log(result);
    getWeatherReport(result);
    document.querySelector('.weather-body').style.display = "block";
    searchInputBox.value = "";

});

function getWeatherReport(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e833643c19723c53ea6046e9ce47eaff&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(showWeatherReport);

}

function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(images/clear.jpg)";
    }

    else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url(images/cloudy.jpg)";
    }

    else if(weatherType.textContent == 'Fog') {
        document.body.style.backgroundImage = "url(images/fog.jpg)";
    }

    else if(weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url(images/haze.jpg)";
    }

    else if(weatherType.textContent == 'Mist') {
        document.body.style.backgroundImage = "url(images/fog.jpg)";
    }
    
    else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url(images/rain.jpg)";
    }

    else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url(images/snow.jpg)";
    }

    else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url(images/thunderstorm.jpg)";
    }

}

function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}