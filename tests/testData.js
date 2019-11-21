const correctWeather =  {
    "raw": {
    "coord": {
        "lon": 30.52,
        "lat": 50.43
    },
    "weather": [
        {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 8.02,
        "pressure": 1011,
        "humidity": 100,
        "temp_min": 7.78,
        "temp_max": 8.33
    },
    "visibility": 6000,
    "wind": {
        "speed": 3,
        "deg": 80
    },
    "rain": {
        "1h": 0.76
    },
    "clouds": {
        "all": 90
    },
    "dt": 1573154160,
    "sys": {
        "type": 1,
        "id": 8903,
        "country": "UA",
        "sunrise": 1573102677,
        "sunset": 1573136713
    },
    "timezone": 7200,
    "id": 703448,
    "name": "Kiev",
    "cod": 200
    }, "context": {
        "weather": {
            description: "light rain",
            temp: 8.02,
            pressure: 758,
            humidity: 100,
            speed: 3
        }
    }
};

const errorData = {
    message: "some problem", expected: {"error": "some problem"}
}


export {correctWeather, errorData}