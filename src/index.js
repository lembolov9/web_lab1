import {makeContext, renderTemplate, weatherView} from "./logic";

let places = require('places.js')

const startApp = () => {
    const fixedOptions = {
        appId: 'pl3S20TLNZ8G',
        apiKey: '490d720bb244c822e47d780b706130a7',
        container: document.querySelector('#address-input')
    };
    const reconfigurableOptions = {
        type: 'city',
        language: 'ru',
        aroundLatLngViaIP: false,
        latlng: true
    };

    let placesAutocomplete = places(fixedOptions).configure(reconfigurableOptions);
    placesAutocomplete.on('change', e => renderTemplate(weatherView(e.suggestion.latlng)));
    placesAutocomplete.on('error', e => renderTemplate(makeContext(e.message)));
    placesAutocomplete.on ('suggestions', e => {
        if (e['suggestions'].length === 0) {
            renderTemplate(makeContext("Сорян, не нахожу города"));
        }
        else {
            $('.result').addClass("hidden")
        }
    })
};

window.onload  = () => startApp()