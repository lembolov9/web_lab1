const renderTemplate = (data) => {
    let template = Hogan.compile(`<div class="wrapper"><div class="main">{{description}}</div>
        <div>Температура<br>{{temp}} градусов цельсия</div><div>Давление<br>{{pressure}} мм.рт.с.</div> 
        <div>Влажность<br>{{humidity}} %</div><div>Скорость ветра<br>{{speed}} м/c</div></div>`);

    const context = {
        description: data.weather[0].description,
        temp: data.main.temp,
        pressure: Math.round(data.main.pressure / 1.33322387415),
        humidity: data.main.humidity,
        speed: data.wind.speed
    };
    const result = template.render(context);
    let block = $('.result');
    block.html( result);
    block.removeClass('hidden');

}

const showError = (data) => {
    $('.error').html(`<p>${data}</p>`);
}

const weatherView = function (coords) {
    let settings = {
        url: 'https://api.openweathermap.org/data/2.5/weather',
        appId: 'a120fd62ed4260a0ba1bdffbd7b09103'
    };
    const apiUrl = `${settings['url']}?lat=${coords['lat']}&lon=${coords['lng']}&APPID=${settings['appId']}&units=metric&lang=ru`;
    $.getJSON(apiUrl)
        .done ((data) => {
            renderTemplate(data)
        })
        .fail ((data) => {
            showError(data['responseJSON']['message']);
        })

};

const startApp = () => {
    const fixedOptions = {
        appId: 'plS5C0CB7CSP',
        apiKey: '74c3b01dd23b66601057eb88f110608f',
        container: document.querySelector('#address-input')
    };
    const reconfigurableOptions = {
        type: 'city',
        language: 'ru',
        aroundLatLngViaIP: false,
        latlng: true
    };

    let placesAutocomplete = places(fixedOptions).configure(reconfigurableOptions);
    placesAutocomplete.on('change', e => weatherView(e.suggestion.latlng));
    placesAutocomplete.on('error', e => showError(e.message));
    placesAutocomplete.on ('suggestions', e => {
        if (e['suggestions'].length === 0) {
            showError("Сорян, не нахожу города")
        }
        else {
            $('.error').html('')
        }
    })
};

startApp();