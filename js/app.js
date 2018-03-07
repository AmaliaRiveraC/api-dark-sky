    
const firstAjax = () => {
    const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c4d9a81218adf15a76b4861c56b81baf/37.8267,-122.4233?units=si";
    fetch(url)
        .then( response => response.json()).then( json => drawWeather(json));      
};

const drawWeather = json => {
    console.log(json);
    const weahtherTodayContainer = document.getElementById('weather-today-container');
    const weatherForecastContainer = document.getElementById('weather-forecast-container');

    let template = `
        <div>Temperature: ${json.currently.apparentTemperature}</div>
        <div>Humidity: ${json.currently.humidity}</div>
        <div>UV index: ${json.currently.uvIndex}</div>
        <div>Pressure: ${json.currently.pressure}`;
    weahtherTodayContainer.innerHTML = template;

    let templateForcast = json.daily.data.forEach( day => {
        let currentDay = `<hr>
            <div>${unixDateToCurrentDate(day.time)}</div>
           <div>Icon: ${day.icon}</div>
           <div>Temperature-high: ${day.temperatureHigh} and Temperature-min: ${day.temperatureMin}</>`;
        weatherForecastContainer.insertAdjacentHTML('beforeEnd', currentDay);
    });
};

const unixDateToCurrentDate = (unixNumber) => new Date(unixNumber * 1000).toLocaleString('es-MX', { weekday: 'long' });

firstAjax();