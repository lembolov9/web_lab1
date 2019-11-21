import template from './template'
import axios from 'axios'

export const renderTemplate = (context) => {
    let block = $('.result');
    block.removeClass('hidden');

    if (context.then) {
        context.then(res => {
            const result = template.render(res);
            block.html(result);
        })
    }
    else {
        const result = template.render(context);
        block.html(result);
    }
};

export const makeContext = (data) => {
    if (data.weather) {
        const correctPressure = convertPressure(data.main.pressure);
        return {
            "weather": {
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: correctPressure,
                humidity: data.main.humidity,
                speed: data.wind.speed
            }
        }
    }
    else { return { "error": data}}
};

export const convertPressure = (pressure) => {
    return Math.round(pressure / 1.333);
};

export const weatherView = function (coords) {
    let settings = {
        url: 'https://api.openweathermap.org/data/2.5/weather',
        appId: 'a120fd62ed4260a0ba1bdffbd7b09103'
    };
    const apiUrl = `${settings['url']}?lat=${coords['lat']}&lon=${coords['lng']}&APPID=${settings['appId']}&units=metric&lang=ru`;
    console.log(apiUrl)
    return axios
        .get(apiUrl)
        .then(res => makeContext(res.data))
        .catch(error => makeContext(error))
};